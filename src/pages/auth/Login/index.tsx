import React, { useState } from 'react';
import styles from './Login.module.scss'
import AuthenticationForm from 'src/components/app/auth/AuthenticationForm';
import ROUTE_CONSTANTS from 'src/constants/router/route-constants';
import { IAuthForm } from 'src/types/auth/auth-form';
import { authService } from 'src/api/services/authService';
import { handleSaveUser } from 'src/redux/features/userSlice'
import { useAppDispatch } from 'src/redux/hooks';
import { useNavigate } from 'react-router-dom';
import { AUTH_FORM } from 'src/enums/auth/auth-form';
import { toast } from 'src/utils/toast';
import { TOAST_STATUS } from 'src/enums/kit/toast';
import { authentication_static_text } from 'src/constants/staticTexts/authentication';

const Login: React.FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false)

    const onFormSubmit = async (data: IAuthForm) => {
        setLoading(true)
        try {
            let res = await authService.login(data)

            if (res.data.length > 0) {
                dispatch(handleSaveUser(res.data[0]))
                navigate(ROUTE_CONSTANTS.DASHBOARD.QUESTIONS.ROOT.ABSOLUTE)
                toast.fire({
                    icon: TOAST_STATUS.SUCCESS,
                    title: authentication_static_text.userLoggedInSuccessfully,
                });
            } else {
                toast.fire({
                    icon: TOAST_STATUS.ERROR,
                    title: authentication_static_text.userNotFound,
                });
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={styles.container}>
            <div>
                <h1>{authentication_static_text.welcomeBack}</h1>
                <AuthenticationForm
                    formActionProperties={{
                        onFormSubmit: onFormSubmit,
                        text: authentication_static_text.login,
                        loading: loading
                    }}
                    type={AUTH_FORM.LOGIN}
                />
            </div>
        </div>
    );
};

export default Login;
