import { question_static_texts } from 'src/constants/staticTexts/questions';
import { string, object } from 'yup';

export const validationSchema = () =>
    object().shape({
        subject: string().required(question_static_texts.subjectIsMandatory),
        description: string().required(question_static_texts.descriptionIsMandatory),
    });
