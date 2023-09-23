import React, { useLayoutEffect, useState } from 'react'
import styles from './Questions.module.scss'
import Header from 'src/components/App/Header'
import { header } from 'src/constants/staticTexts/header'
import ContentCard from 'src/components/App/ContentCard'
import { questionService } from 'src/api/services/questionService'
import { IQuestionPayload } from 'src/types/question'
import Answer from 'src/assets/icons/Answer';
import Button from 'src/components/Kit/Button'
import { BUTTON_CLASS_OPTIONS } from 'src/enums/button'
import { questionList } from 'src/constants/staticTexts/questions'
import { useNavigate } from 'react-router-dom'
import ROUTE_CONSTANTS from 'src/constants/router/route-constants'

const Questions: React.FC = () => {
    const navigate = useNavigate();
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
                        headerSuffix={
                            <div className={styles.answersWrapper}>
                                <Answer />
                                <span>{question.answers.length}</span>
                            </div>
                        }
                        cardAction={
                            <Button 
                                style={{padding: '8px'}}
                                type={BUTTON_CLASS_OPTIONS.BORDERED_OUTLINE} 
                                onClick={() => navigate(ROUTE_CONSTANTS.DASHBOARD.QUESTIONS.DETAILS.DETAILS_ID(question.id).ABSOLUTE)}
                            >
                                <span>{questionList.seeDetail}</span>
                            </Button>
                        }
                    />
                )}
            </div>
        </>
    )
}

export default Questions