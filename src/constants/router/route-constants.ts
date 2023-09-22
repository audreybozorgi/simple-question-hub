const ROUTE_CONSTANTS = {
    ROOT: {
        RELATIVE: '/',
        ABSOLUTE: '/',
    },
    ROOT_STAR: {
        RELATIVE: '/*',
        ABSOLUTE: '/*',
    },
    AUTH: {
        ROOT: {
            RELATIVE: 'auth',
            ABSOLUTE: '/auth',
        },
        LOGIN: {
            RELATIVE: 'login',
            ABSOLUTE: '/auth/login',
        },
        REGISTER: {
            RELATIVE: 'register',
            ABSOLUTE: '/auth/register',
        },
    },
    QUESTIONS: {
        ROOT: {
            RELATIVE: 'questions',
            ABSOLUTE: '/questions',
        },
        DETAILS: {
            ROOT: {
                RELATIVE: 'questions/:id',
                ABSOLUTE: '/questions/:id',
            },
            DETAILS_ID: (id: number) => ({
                RELATIVE: `questions/${id}`,
                ABSOLUTE: `/questions/${id}`,
            }),
        },
    },
    NOT_FOUND: {
        RELATIVE: 'not-found',
        ABSOLUTE: '/not-found',
    },
};

export default ROUTE_CONSTANTS;
