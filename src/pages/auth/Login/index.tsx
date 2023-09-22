import React from 'react';
import styles from './Login.module.scss'
import AuthenticationForm from 'src/components/App/AuthenticationForm';
import { IAuthForm } from 'src/types/auth/auth-form';
import { SUBMIT_TEXT } from 'src/constants/auth/submit-text';
import { authService } from 'src/api/services/authService';
import { handleSaveUser } from 'src/redux/features/userSlice'
import { useAppDispatch } from 'src/redux/hooks';
import { useNavigate } from 'react-router-dom';
import ROUTE_CONSTANTS from 'src/constants/router/route-constants';
import { AUTH_FORM_TYPES } from 'src/enums/auth/auth-form-types';
import { toast } from 'src/utils/toast';
import { TOAST_STATUS } from 'src/enums/toast';

const Login: React.FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    const onFormSubmit = async (data: IAuthForm) => {    
        try{
            let res = await authService.login(data)
            if(res.data.length > 0) {
                dispatch(handleSaveUser(res.data[0]))
                navigate(ROUTE_CONSTANTS.QUESTIONS.ROOT.ABSOLUTE)
                toast.fire({
                    icon: TOAST_STATUS.SUCCESS,
                    title: "User Logged in successfully!",
                });
            }
        }catch(error) {
            console.error(error)
        }
    }

    return (
        <div className={styles.container}>
            <div>
                <h1>Welcome back to Question Hub</h1>
                <AuthenticationForm 
                    formActionProperties={{
                        onFormSubmit: onFormSubmit,
                        text: SUBMIT_TEXT.LOGIN
                    }}
                    type={AUTH_FORM_TYPES.LOGIN}
                />
            </div>
        </div>
    );
};

export default Login;
