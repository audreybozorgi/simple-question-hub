import React, { Suspense, lazy } from 'react';
import { Routes as RoutesWrapper, Route, Navigate } from 'react-router-dom';
import InitLoading from 'src/components/app/layout/Loading/InitLoading';
import ROUTE_CONSTANTS from 'src/constants/router/route-constants';
import AuthLayout from 'src/layouts/AuthLayout';
import DashboardLayout from 'src/layouts/DashboardLayout/index';

const Login = Loader(lazy(() => import('src/pages/auth/Login')));
const Register = Loader(lazy(() => import('src/pages/auth/Register')));
const Questions = Loader(lazy(() => import('src/pages/dashboard/Questions')));
const QuestionDetail = Loader(lazy(() => import('src/pages/dashboard/Questions/QuestionDetail')));

function Loader(Component: any) {
    return (props: any) => (
        <Suspense fallback={<InitLoading />}>
            <Component {...props} />
        </Suspense>
    );
}

const Routes: React.FC = () => {
    return (
        <RoutesWrapper>
            <Route path={ROUTE_CONSTANTS.ROOT.RELATIVE} element={<AuthLayout />}>
                <Route path="" element={<Navigate to={ROUTE_CONSTANTS.AUTH.LOGIN.ABSOLUTE} />} />
                <Route path={ROUTE_CONSTANTS.AUTH.LOGIN.RELATIVE} element={<Navigate to={ROUTE_CONSTANTS.AUTH.LOGIN.ABSOLUTE} />} />
            </Route>
            <Route path={ROUTE_CONSTANTS.AUTH.ROOT.RELATIVE} element={<AuthLayout />}>
                <Route path="" element={<Navigate to={ROUTE_CONSTANTS.AUTH.LOGIN.RELATIVE} />} />
                <Route path={ROUTE_CONSTANTS.AUTH.LOGIN.RELATIVE} element={<Login />} />
                <Route path={ROUTE_CONSTANTS.AUTH.REGISTER.RELATIVE} element={<Register />} />
            </Route>
            <Route path={ROUTE_CONSTANTS.DASHBOARD.ROOT.RELATIVE} element={<DashboardLayout />}>
                <Route path="" element={<Navigate to={ROUTE_CONSTANTS.DASHBOARD.QUESTIONS.ROOT.ABSOLUTE} />} />
                <Route path={ROUTE_CONSTANTS.DASHBOARD.QUESTIONS.ROOT.RELATIVE} element={<Questions />} />
                <Route path={ROUTE_CONSTANTS.DASHBOARD.QUESTIONS.DETAILS.ROOT.RELATIVE} element={<QuestionDetail />} />
            </Route>
        </RoutesWrapper>
    );
};

export default Routes;
