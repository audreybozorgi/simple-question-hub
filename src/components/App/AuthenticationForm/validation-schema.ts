import { authentication } from 'src/constants/staticTexts/authentication';
import { string, object } from 'yup';

export const validationSchema = () =>
    object().shape({
        username: string().required(authentication.usernameIsMandatory),
        password: string().required(authentication.passwordIsMandatory),
    });
