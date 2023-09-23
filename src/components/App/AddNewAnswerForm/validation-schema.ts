import { string, object } from 'yup';

export const validationSchema = () =>
    object().shape({
        description: string().required('authentication.passwordIsMandatory'),
    });
