import React, { ReactNode } from 'react'
import styles from './index.module.scss'
import { BUTTON_CLASS_OPTIONS } from 'src/enums/kit/button';

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
            case BUTTON_CLASS_OPTIONS.OUTLINE:
                return styles.button_outline
            case BUTTON_CLASS_OPTIONS.BORDERED_OUTLINE:
                return styles.button_bordered_outline
            case BUTTON_CLASS_OPTIONS.SUCCESS_BORDERED_OUTLINE:
                return styles.button_success_bordered_outline
            case BUTTON_CLASS_OPTIONS.DANGER_BORDERED_OUTLINE:
                return styles.button_danger_bordered_outline
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
        <div className={styles.buttonChildren}>
            {children}
        </div>
    </button>
}

export default Button