import { AUTH_FORM_TYPES } from "src/enums/auth/auth-form-types";
import { authentication } from "../staticTexts/authentication";

export const SUBMIT_TEXT: Record<AUTH_FORM_TYPES, string> = {
    REGISTER: authentication.register,
    LOGIN: authentication.login
}