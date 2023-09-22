import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import styles from './AuthLayoutContent.module.scss';
import { useAppSelector } from 'src/redux/hooks';
import ROUTE_CONSTANTS from 'src/constants/router/route-constants';

const AuthLayoutContent: React.FC = () => {
    const token = useAppSelector(state => state.userSlice.token)

    if(token) return <Navigate to={ROUTE_CONSTANTS.DASHBOARD.QUESTIONS.ROOT.ABSOLUTE} />

    return (
        <>
            <section className={styles.container}>
                <Outlet />
            </section>
        </>
    );
};

const AuthLayout: React.FC = () => {
    return (
        <AuthLayoutContent />
    );
};

export default AuthLayout;
