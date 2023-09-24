import React from 'react'
import styles from './index.module.scss'

interface ITextareaProps {
    style?: Record<string, string | number>;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    value?: string;
}

const Textarea: React.FC<ITextareaProps> = ({ style, onChange, value }) => {
    return <textarea 
        className={styles.textarea_style}
        style={{...style}}
        onChange={onChange}
        value={value}
    />
}

export default Textarea