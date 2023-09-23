import { AxiosInstance } from "src/api";
import { API_ROUTES } from "src/constants/api/routes";
import { IQuestionType } from "src/types/question";

export const questionService = {
    addNewQuestion(data: IQuestionType) {
        return AxiosInstance.post(API_ROUTES.QUESTION.ADD_NEW, data);
    },
};