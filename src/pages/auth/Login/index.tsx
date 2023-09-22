import React from 'react';
import styles from './Login.module.scss'
import Input from 'src/components/Kit/Input';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from './validation-schema';
import FormFieldWrapper from 'src/components/App/FormFieldWrapper';
import Button from 'src/components/Kit/Button';
import { UUIDv4 } from 'src/utils/uuid-generator';
import { authService } from 'src/api/services/userService';

interface ILoginForm {
    username: string;
    password: string;
}

const Login: React.FC = () => {
    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm<ILoginForm>({
        defaultValues: {
            username: '',
            password: '',
        },
        mode: 'all',
        resolver: yupResolver(validationSchema()),
    });

    const onFormSubmit = async (data: ILoginForm) => {
        let res = await authService.login(data)
        console.log('res', res.data);
        try{
        }catch(error) {
            console.error(error)
        }
    }



    return (
        <div className={styles.container}>
            <div>
                <h1>Welcome back to Question Hub</h1>
                <form noValidate data-cy="login-form" onSubmit={handleSubmit(onFormSubmit)}>
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
                                    <Input onChange={field.onChange} type='password'/>
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
                        <Button onClick={() => handleSubmit(onFormSubmit)}>Login</Button>
                    </FormFieldWrapper>
                </form>
            </div>
        </div>
    );
};

export default Login;
