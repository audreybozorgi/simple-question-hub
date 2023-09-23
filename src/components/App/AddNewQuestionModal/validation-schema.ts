import { createNewModal } from 'src/constants/staticTexts/questions';
import { string, object } from 'yup';

export const validationSchema = () =>
    object().shape({
        subject: string().required(createNewModal.subjectIsMandatory),
        description: string().required(createNewModal.descriptionIsMandatory),
    });
