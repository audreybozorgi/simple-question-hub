import { ReactNode } from 'react';
import styles from './FormFieldWrapper.module.scss';

interface IFormFieldWrapperProps {
    children: ReactNode
}

const FormFieldWrapper: React.FC<IFormFieldWrapperProps> = ({ children }) => {
    return (
        <div className={styles.fieldContainer}>
            {children}
        </div>
    );
};
export default FormFieldWrapper;
