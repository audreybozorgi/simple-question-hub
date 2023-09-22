import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './AuthLayoutContent.module.scss';

const AuthLayoutContent: React.FC = () => {
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
