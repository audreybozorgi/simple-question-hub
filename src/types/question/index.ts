import { IAnswer } from "../answer";


export interface IQuestionType {
    subject: string;
    description: string; 
    date: string;
    time: string;
    answers: IAnswer[]; 
    username: string;
    uuid: string;
}

export interface IQuestionPayload extends IQuestionType {
    id: number;
}

