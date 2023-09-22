import React from 'react';
import styles from './Register.module.scss'
import AuthenticationForm from 'src/components/App/AuthenticationForm';
import { IAuthForm } from 'src/types/auth/auth-form';
import { authService } from 'src/api/services/authService';
import { SUBMIT_TEXT } from 'src/constants/auth/submit-text';
import { UUIDv4 } from 'src/utils/uuid-generator';
import { useAppDispatch } from 'src/redux/hooks';
import { useNavigate } from 'react-router-dom';
import { handleSaveUser } from 'src/redux/features/userSlice'
import ROUTE_CONSTANTS from 'src/constants/router/route-constants';
import { toast } from 'src/utils/toast';
import { TOAST_STATUS } from 'src/enums/toast';
import { AUTH_FORM_TYPES } from 'src/enums/auth/auth-form-types';

const Register: React.FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    
    const onFormSubmit = async (data: IAuthForm) => {
        const tempUser = {
            ...data, 
            token: UUIDv4()
        }
        try{
            await authService.register(tempUser)
            dispatch(handleSaveUser({username: tempUser.username, token: tempUser.token}))
            navigate(ROUTE_CONSTANTS.QUESTIONS.ROOT.ABSOLUTE)
            toast.fire({
                icon: TOAST_STATUS.SUCCESS,
                title: "User Registered successfully!",
            });
        }catch(error) {
            console.error(error)
        }
    }

    return (
        <div className={styles.container}>
            <div>
                <h1>Sign up to continue</h1>
                <AuthenticationForm
                    formActionProperties={{
                        onFormSubmit: onFormSubmit,
                        text: SUBMIT_TEXT.REGISTER
                    }}
                    type={AUTH_FORM_TYPES.REGISTER}
                />
            </div>
        </div>
    );
};

export default Register;
