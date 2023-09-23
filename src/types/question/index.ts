export interface IQuestionType {
    subject: string;
    description: string; 
    date: string;
    time: string;
    like: number; 
    dislike: number;
    answers: any 
    username: string;
    token: string;
}

export interface IQuestionPayload extends IQuestionType {
    id: number;
}

