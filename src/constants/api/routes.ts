export const API_ROUTES = {
    BASE_URL:           '/',
    AUTH: {
        LOGIN:          '/users',
        REGISTER:       '/users',
    },
    QUESTION: {
        ADD_NEW:        '/question',
        GET_ALL:        '/question',
        GET_ONE:        (id: number) =>  `/question/${id}`,
        ADD_NEW_ANSWER: (questionId: number) =>  `/question/${questionId}`,
        UPDATE_ANSWERS: (questionId: number) =>  `/question/${questionId}`,
    },
};
