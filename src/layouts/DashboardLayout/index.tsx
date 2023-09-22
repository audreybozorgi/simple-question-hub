import React from 'react';
import styles from './DashboardLayout.module.scss';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from 'src/redux/hooks';
import ROUTE_CONSTANTS from 'src/constants/router/route-constants';

const DashboardLayoutContent: React.FC = () => {
    const token = useAppSelector(state => state.userSlice.token)
    
    if(!token) return <Navigate to={ROUTE_CONSTANTS.AUTH.LOGIN.ABSOLUTE} />
    
    return (
        <main className={styles.container}>
            <Outlet />
        </main>
    );
};

const DashboardLayout: React.FC = () => {
    return (
        <DashboardLayoutContent />
    );
};

export default DashboardLayout;
