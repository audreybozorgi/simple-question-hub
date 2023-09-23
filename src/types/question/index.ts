export interface IAnswer {
    username: string;
    like: number; 
    dislike: number;
    date: string;
    time: string;
    description: string; 
    uuid: string;
}

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

export interface IAnswerPayload extends IAnswer {
    id: number;
}

