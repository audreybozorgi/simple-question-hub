import { SVGProps } from 'react';

const Plus: React.FC<SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M10 5C10.375 5 10.6793 5.30452 10.6793 5.67973V9.31954L14.3207 9.31972C14.6957 9.31972 15 9.62424 15 9.99946C15 10.3747 14.6957 10.6792 14.3207 10.6792L10.6793 10.679V14.3203C10.6793 14.6955 10.375 15 10 15C9.62504 15 9.32073 14.6955 9.32073 14.3203V10.679L5.67927 10.6792C5.30341 10.6792 5 10.3747 5 9.99946C5 9.62424 5.30341 9.31972 5.67927 9.31972L9.32073 9.31954V5.67973C9.32073 5.30452 9.62504 5 10 5Z" fill="white" />
        </svg>
    );
};

export default Plus;
