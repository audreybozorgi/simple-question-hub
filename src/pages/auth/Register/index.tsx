import React, { useState } from 'react';
import styles from './Register.module.scss'
import AuthenticationForm from 'src/components/application/auth/AuthenticationForm';
import ROUTE_CONSTANTS from 'src/constants/router/route-constants';
import { IAuthForm } from 'src/types/auth/auth-form';
import { authService } from 'src/api/services/authService';
import { UUIDv4 } from 'src/utils/uuid-generator';
import { useAppDispatch } from 'src/redux/hooks';
import { useNavigate } from 'react-router-dom';
import { handleSaveUser } from 'src/redux/features/userSlice'
import { toast } from 'src/utils/toast';
import { TOAST_STATUS } from 'src/enums/kit/toast';
import { AUTH_FORM } from 'src/enums/auth/auth-form';
import { authentication_static_text } from 'src/constants/staticTexts/authentication';

const Register: React.FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false)

    const onFormSubmit = async (data: IAuthForm) => {
        const tempUser = {
            ...data,
            token: UUIDv4()
        }

        setLoading(true) 
        try {
            await authService.register(tempUser)

            dispatch(handleSaveUser({ username: tempUser.username, token: tempUser.token }))
            navigate(ROUTE_CONSTANTS.DASHBOARD.QUESTIONS.ROOT.ABSOLUTE)
            toast.fire({
                icon: TOAST_STATUS.SUCCESS,
                title: authentication_static_text.userCreateSuccessfully,
            });
        } catch (error: any) {
            toast.fire({
                icon: TOAST_STATUS.ERROR,
                title: authentication_static_text.pleaseRunYourServer,
            });
            console.error(error)
        } finally{
            setLoading(false) 
        }
    }

    return (
        <div className={styles.container}>
            <div>
                <h1>{authentication_static_text.createAccount}</h1>
                <AuthenticationForm
                    type={AUTH_FORM.REGISTER}
                    formActionProperties={{
                        onFormSubmit: onFormSubmit,
                        text: authentication_static_text.register,
                        loading: loading
                    }}
                />
            </div>
        </div>
    );
};

export default Register;
