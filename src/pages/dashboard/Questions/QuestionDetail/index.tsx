import React, { useEffect, useState } from 'react'
import styles from './Question.module.scss'
import { useParams } from 'react-router-dom'
import { questionService } from 'src/api/services/questionService'
import ContentCard from 'src/components/App/ContentCard'
import Header from 'src/components/App/Header'
import { header } from 'src/constants/staticTexts/header'
import { IAnswer, IQuestionPayload } from 'src/types/question'
import Answer from 'src/assets/icons/Answer';
import AddNewAnswerForm from 'src/components/App/AddNewAnswerForm'
import { useAppSelector } from 'src/redux/hooks'
import { UUIDv4 } from 'src/utils/uuid-generator'

interface IQuestionDetailProps {

}

interface IParams {
    [id: string]: string;
}

interface ICreateNewAnswerForm {
    description: string;
}

const QuestionDetail: React.FC<IQuestionDetailProps> = () => {
    const { id } = useParams<IParams>()
    const user = useAppSelector(state => state.userSlice)
    const [question, setQuestion] = useState<IQuestionPayload>()
    const [loading, setLoading] = useState<boolean>(true)

    const getQuestionDetails = async () => {
        try {
            let res = await questionService.getOne(Number(id))
            console.log('res', res);
            setQuestion(res.data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }
    
    const onSubmit = async (data: { description: string }) => {
        const tempAnswer: IAnswer = {
            username: user.username,
            description: data.description,
            date: new Date().toLocaleDateString('fa-IR'),
            time: new Date().toLocaleTimeString('fa-IR'),
            uuid: UUIDv4(),
            like: 0,
            dislike: 0,
        } 
        const tempAnswers = [...question?.answers!, tempAnswer]
        
        try { // TODO: set loading for all API calls
            await questionService.addNewAnswer(Number(id), {answers: tempAnswers})
            setQuestion({
                ...question!,
                answers: tempAnswers
            })
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getQuestionDetails()
    }, [])

    if (loading || !question) return null

    return (
        <>
            <Header title={header.questionDetail} />
            <div className={styles.questionWrapper}>
                <ContentCard
                    title={question.subject}
                    description={question.description}
                    date={question.date}
                    time={question.time}
                    headerSuffix={
                        <div className={styles.descriptionWrapper}>
                            <Answer />
                            <span>{question.answers.length}</span>
                        </div>
                    }
                />
                <div className={styles.answersWrapper}>
                    <span className={styles.title}>پاسخ ها</span>
                    <div className={styles.answerCardsWrapper}>
                        {question.answers.map((answer: IAnswer) =>
                            <ContentCard
                                title={answer.username}
                                description={answer.description}
                                date={answer.date}
                                time={answer.time}
                                headerSuffix={
                                    <div className={styles.descriptionWrapper}>
                                        <Answer />
                                        <span>{question.answers.length}</span>
                                    </div>
                                }
                            />
                        )}
                    </div>
                    <div className={styles.addNewAnswerWrapper}>
                        <span>پاسخ خود را ثبت کنید</span>
                        <AddNewAnswerForm onSubmit={onSubmit} />
                    </div>
                </div>
            </div>
        </>
    )
}
export default QuestionDetail