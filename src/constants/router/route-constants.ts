const ROUTE_CONSTANTS = {
    ROOT: {
        RELATIVE: '/',
        ABSOLUTE: '/',
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
                DETAILS_BY_ID: (id: number) => ({
                    RELATIVE: `questions/${id}`,
                    ABSOLUTE: `/dashboard/questions/${id}`,
                }),
            },
        },
    },
};

export default ROUTE_CONSTANTS;
