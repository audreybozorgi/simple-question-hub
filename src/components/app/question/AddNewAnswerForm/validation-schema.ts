import { question_static_texts } from 'src/constants/staticTexts/questions';
import { string, object } from 'yup';

export const createNewAnswerValidator = () =>
    object().shape({
        description: string().required(question_static_texts.answerIsMandatory),
    });
