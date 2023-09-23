import { string, object } from 'yup';

export const validationSchema = () =>
    object().shape({
        subject: string().required('authentication.usernameIsMandatory'),
        description: string().required('authentication.passwordIsMandatory'),
    });
