import React from 'react'
import Input from 'src/components/myKit/Input'
import Button from 'src/components/myKit/Button'
import ROUTE_CONSTANTS from 'src/constants/router/route-constants'
import styles from './AuthenticationForm.module.scss'
import FormFieldWrapper from '../../../myKit/FormFieldWrapper'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { IAuthForm } from 'src/types/auth/auth-form'
import { AUTH_FORM } from 'src/enums/auth/auth-form'
import { useNavigate } from 'react-router-dom'
import { authentication_static_text } from 'src/constants/staticTexts/authentication'
import { authFormValidator } from './validation-schema'

interface IAuthenticationFormProps {
    formActionProperties: {
        onFormSubmit: (data: IAuthForm) => void;
        text: string;
        loading?: boolean;
    };
    type: AUTH_FORM
}

const AuthenticationForm: React.FC<IAuthenticationFormProps> = ({ formActionProperties, type }) => {
    const navigate = useNavigate();
    const { control, formState: { errors }, handleSubmit } = useForm<IAuthForm>({
        defaultValues: {
            username: '',
            password: '',
        },
        mode: 'all',
        resolver: yupResolver(authFormValidator()),
    });

    const routerSwitchHandler = () => {
        switch (type) {
            case AUTH_FORM.REGISTER:
                return <span
                    className={styles.routerSwitchAction}
                    onClick={() => navigate(ROUTE_CONSTANTS.AUTH.LOGIN.ABSOLUTE)}
                >
                    {authentication_static_text.haveAccount}
                </span>
            case AUTH_FORM.LOGIN:
                return <span
                    className={styles.routerSwitchAction}
                    onClick={() => navigate(ROUTE_CONSTANTS.AUTH.REGISTER.ABSOLUTE)}
                >
                    {authentication_static_text.createAccount}
                </span>
        }
    }

    return (
        <form noValidate onSubmit={handleSubmit(formActionProperties.onFormSubmit)}>
            <FormFieldWrapper>
                <label className='form-field-label' htmlFor="username">
                    {authentication_static_text.username}
                </label>
                <Controller
                    name="username"
                    control={control}
                    render={({ field }) => (
                        <>
                            <Input onChange={field.onChange} value={field.value} style={{ direction: 'ltr' }} />
                            {errors?.username?.message && (
                                <span className='form-error-text'>
                                    {errors?.username?.message.toString()}
                                </span>
                            )}
                        </>
                    )}
                />
            </FormFieldWrapper>
            <FormFieldWrapper>
                <label className='form-field-label' htmlFor="password">
                    {authentication_static_text.password}
                </label>
                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                        <>
                            <Input onChange={field.onChange} value={field.value} type='password' style={{ direction: 'ltr' }} />
                            {errors?.password?.message && (
                                <span className='form-error-text'>
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
                <Button
                    style={{ height: '45px' }}
                    onClick={() => handleSubmit(formActionProperties.onFormSubmit)}
                    disabled={formActionProperties.loading}
                >
                    <span>{formActionProperties.text}</span>
                </Button>
            </FormFieldWrapper>
        </form>
    )
}

export default AuthenticationForm