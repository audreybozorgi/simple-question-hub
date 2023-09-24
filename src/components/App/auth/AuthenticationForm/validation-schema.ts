import { authentication_static_text } from 'src/constants/staticTexts/authentication';
import { string, object } from 'yup';

export const authFormValidator = () =>
    object().shape({
        username: string().required(authentication_static_text.usernameIsMandatory),
        password: string().required(authentication_static_text.passwordIsMandatory),
    });
