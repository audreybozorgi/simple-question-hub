import React, { ReactNode } from 'react';

interface IGeneralLayoutWrapperProps {
    children: ReactNode
}

const GeneralLayoutWrapper: React.FC<IGeneralLayoutWrapperProps> = ({ children }) => {
    return <div>{children}</div>;
};

export default GeneralLayoutWrapper;
