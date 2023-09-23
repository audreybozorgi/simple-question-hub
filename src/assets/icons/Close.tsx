import { SVGProps } from 'react';

const Close: React.FC<SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 1L1 11" stroke="#454545" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M11 11L1 1" stroke="#454545" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};

export default Close;
