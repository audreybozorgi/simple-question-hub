import React, { ReactNode } from 'react'
import styles from './index.module.scss'
import { BUTTON_CLASS_OPTIONS } from 'src/enums/button';

interface IButtonProps {
    style?: Record<string, string>;
    children?: ReactNode;
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    disabled?: boolean;
    type?: keyof typeof BUTTON_CLASS_OPTIONS;
}
const Button: React.FC<IButtonProps> = ({ children, style, onClick, disabled, type}) => {
    const buttonStyleDetector = () => {
        switch (type) {
            case BUTTON_CLASS_OPTIONS.INFO:
                return styles.button_info
            case BUTTON_CLASS_OPTIONS.SUCCESS:
                return styles.button_success
            case BUTTON_CLASS_OPTIONS.DANGER:
                return styles.button_danger
            default:
                return styles.button
        }
    }
    return <button 
        onClick={onClick}
        className={buttonStyleDetector()}
        style={{...style}}
        disabled={disabled}
    >
        {children}
    </button>
}

export default Button