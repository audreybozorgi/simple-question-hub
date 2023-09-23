import React, { useLayoutEffect, useState } from 'react'
import styles from './Questions.module.scss'
import Header from 'src/components/App/Header'
import { header } from 'src/constants/staticTexts/header'
import ContentCard from 'src/components/App/ContentCard'
import { questionService } from 'src/api/services/questionService'
import { IQuestionPayload } from 'src/types/question'

const Questions: React.FC = () => {
    const [questions, setQuestions] = useState<IQuestionPayload[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    const getQuestionList = async () => {
        try {
            let res = await questionService.getAll()
            setQuestions(res.data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }
    useLayoutEffect(() => {
        getQuestionList()
    }, [])

    return (
        <>
            <Header title={header.questionList} />
            <div className={styles.questionsWrapper}>
                {questions.map((question: IQuestionPayload, index) =>
                    <ContentCard 
                        key={index} 
                        data={question} 
                    />
                )}
            </div>
        </>
    )
}

export default Questions