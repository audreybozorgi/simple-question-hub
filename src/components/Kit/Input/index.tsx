import React from 'react'
import styles from './index.module.scss'

interface IInputProps {
    style?: Record<string, string | number>;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
    type?: string;
}
const Input: React.FC<IInputProps> = ({ style, onChange, value, type }) => {
    return <input 
        className={styles.input_style}
        style={{...style}}
        onChange={onChange}
        value={value}
        type={type}
    />
}

export default Input