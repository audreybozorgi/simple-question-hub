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
    DASHBOARD: {
        ROOT: {
            RELATIVE: 'dashboard',
            ABSOLUTE: '/dashboard',
        },
        QUESTIONS: {
            ROOT: {
                RELATIVE: 'questions',
                ABSOLUTE: '/dashboard/questions',
            },
            DETAILS: {
                ROOT: {
                    RELATIVE: 'questions/:id',
                    ABSOLUTE: '/dashboard/questions/:id',
                },
                DETAILS_ID: (id: number) => ({
                    RELATIVE: `questions/${id}`,
                    ABSOLUTE: `/dashboard/questions/${id}`,
                }),
            },
        },
    },
    NOT_FOUND: {
        RELATIVE: 'not-found',
        ABSOLUTE: '/not-found',
    },
};

export default ROUTE_CONSTANTS;
