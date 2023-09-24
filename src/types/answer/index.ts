import { IQuestionPayload } from "../question";

export interface IAnswer {
    username: string;
    like: number; 
    dislike: number;
    date: string;
    time: string;
    description: string; 
    uuid: string;
}

export interface IAnswerReactionsTypes {
    question: IQuestionPayload;
    answer: IAnswer;
    updateQuestion: (questions: IQuestionPayload) => void
}

export interface IAnswerPayload extends IAnswer {
    id: number;
}
