import React from 'react'
import FormFieldWrapper from '../FormFieldWrapper'
import { Controller, useForm } from 'react-hook-form'
import Input from 'src/components/Kit/Input'
import { yupResolver } from '@hookform/resolvers/yup'
import { validationSchema } from './validation-schema'
import Button from 'src/components/Kit/Button'
import { IAuthForm } from 'src/types/auth/auth-form'
import { AUTH_FORM_TYPES } from 'src/enums/auth/auth-form-types'
import ROUTE_CONSTANTS from 'src/constants/router/route-constants'
import { useNavigate } from 'react-router-dom'
import styles from './AuthenticationForm.module.scss'

interface IAuthenticationFormProps {
    formActionProperties: {
        onFormSubmit: (data: IAuthForm) => void;
        text: string;
    };
    type: AUTH_FORM_TYPES
}
const AuthenticationForm: React.FC<IAuthenticationFormProps> = ({ formActionProperties, type }) => {
    const navigate = useNavigate();

    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm<IAuthForm>({
        defaultValues: {
            username: '',
            password: '',
        },
        mode: 'all',
        resolver: yupResolver(validationSchema()),
    });

    const routerSwitchHandler = () => {
        switch (type) {
            case AUTH_FORM_TYPES.REGISTER:
                return <span
                    className={styles.routerSwitchAction}
                    onClick={() => navigate(ROUTE_CONSTANTS.AUTH.LOGIN.ABSOLUTE)}
                >
                    Already have an account!
                </span>
            case AUTH_FORM_TYPES.LOGIN:
                return <span
                    className={styles.routerSwitchAction}
                    onClick={() => navigate(ROUTE_CONSTANTS.AUTH.REGISTER.ABSOLUTE)}
                >
                    Don't have an account?
                </span>
        }
    }

    return (
        <form noValidate onSubmit={handleSubmit(formActionProperties.onFormSubmit)}>
            <FormFieldWrapper>
                <label htmlFor="username">
                    Username
                </label>
                <Controller
                    name="username"
                    control={control}
                    render={({ field }) => (
                        <>
                            <Input onChange={field.onChange} />
                            {errors?.username?.message && (
                                <span>
                                    {errors?.username?.message.toString()}
                                </span>
                            )}
                        </>
                    )}
                />
            </FormFieldWrapper>
            <FormFieldWrapper>
                <label htmlFor="password">
                    Password
                </label>
                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                        <>
                            <Input onChange={field.onChange} type='password' />
                            {errors?.password?.message && (
                                <span>
                                    {errors?.password?.message.toString()}
                                </span>
                            )}
                        </>
                    )}
                />
            </FormFieldWrapper>
            <FormFieldWrapper>
                {routerSwitchHandler()}
            </FormFieldWrapper>
            <FormFieldWrapper>
                <Button onClick={() => handleSubmit(formActionProperties.onFormSubmit)}>{formActionProperties.text}</Button>
            </FormFieldWrapper>
        </form>
    )
}

export default AuthenticationForm