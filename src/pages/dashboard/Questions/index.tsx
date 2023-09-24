import React, { useLayoutEffect, useState } from 'react'
import styles from './Questions.module.scss'
import Header from 'src/components/app/layout/Header'
import { header_static_text } from 'src/constants/staticTexts/header'
import ContentCard from 'src/components/app/question/ContentCard'
import { questionService } from 'src/api/services/questionService'
import { IQuestionPayload } from 'src/types/question'
import Answer from 'src/assets/icons/Answer';
import Button from 'src/components/kit/Button'
import { BUTTON_CLASS_OPTIONS } from 'src/enums/kit/button'
import { useNavigate } from 'react-router-dom'
import ROUTE_CONSTANTS from 'src/constants/router/route-constants'
import { question_static_texts } from 'src/constants/staticTexts/questions'

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
            <Header title={header_static_text.questionList} />
            <div className={styles.questionsWrapper}>
                {questions.map((question: IQuestionPayload, index) =>
                    <ContentCard 
                        key={index} 
                        title={question.subject}
                        description={question.description}
                        date={question.date}
                        time={question.time}
                        headerSuffix={
                            <div className={styles.suffixWrapper}>
                                <Answer />
                                <span>{question.answers.length}</span>
                            </div>
                        }
                        cardAction={
                            <Button 
                                style={{padding: '8px'}}
                                type={BUTTON_CLASS_OPTIONS.SUCCESS_BORDERED_OUTLINE} 
                                onClick={() => navigate(ROUTE_CONSTANTS.DASHBOARD.QUESTIONS.DETAILS.DETAILS_BY_ID(question.id).ABSOLUTE)}
                            >
                                <span>{question_static_texts.seeDetail}</span>
                            </Button>
                        }
                    />
                )}
            </div>
        </>
    )
}

export default Questions