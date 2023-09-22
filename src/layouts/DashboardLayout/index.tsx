import React from 'react';
import styles from './DashboardLayout.module.scss';
import { Outlet } from 'react-router-dom';
import Header from '../HeaderLayout'

const DashboardLayoutContent: React.FC = () => {
    return (
        <main className={styles.container}>
            <Header />
            <div>
                <Outlet />
            </div>
        </main>
    );
};

const DashboardLayout: React.FC = () => {
    return (
        <DashboardLayoutContent />
    );
};

export default DashboardLayout;
