import React from 'react'
import Header from 'src/components/App/Header'
import { header } from 'src/constants/staticTexts/header'

const Questions: React.FC = () => {
    
    return (
        <>
            <Header title={header.questionList} />
            <div>
                Questions there
            </div>
        </>
    )
}

export default Questions