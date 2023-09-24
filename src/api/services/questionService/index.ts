import { AxiosInstance } from "src/api";
import { API_ROUTES } from "src/constants/api/routes";
import { IQuestionType, IQuestionPayload, IAnswer } from "src/types/question";

export const questionService = {
    addNewQuestion(data: IQuestionType) {
        return AxiosInstance.post(API_ROUTES.QUESTION.ADD_NEW, data);
    },
    getAll() {
        return AxiosInstance.get<IQuestionPayload[]>(API_ROUTES.QUESTION.GET_ALL);
    },
    getOne(id: number) {
        return AxiosInstance.get<IQuestionPayload>(API_ROUTES.QUESTION.GET_ONE(id));
    },
    addNewAnswer(questionId: number, data: {answers: IAnswer[]}) {
        return AxiosInstance.patch(API_ROUTES.QUESTION.ADD_NEW_ANSWER(questionId), data);
    },
    updateAnswers(questionId: number, data: {answers: IAnswer[]}) {
        return AxiosInstance.patch(API_ROUTES.QUESTION.UPDATE_ANSWERS(questionId), data);
    },
};