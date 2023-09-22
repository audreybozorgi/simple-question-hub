import { string, object } from 'yup';

export const validationSchema = () =>
    object().shape({
        username: string().required('Username is required'),
        password: string().required('Password is required'),
        
    });
