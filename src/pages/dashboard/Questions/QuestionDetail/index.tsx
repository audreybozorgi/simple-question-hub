import React, { useEffect, useState } from 'react'
import styles from './Question.module.scss'
import { useParams } from 'react-router-dom'
import { questionService } from 'src/api/services/questionService'
import ContentCard from 'src/components/app/question/ContentCard'
import Header from 'src/components/app/layout/Header'
import { header_static_text } from 'src/constants/staticTexts/header'
import { IQuestionPayload } from 'src/types/question'
import Answer from 'src/assets/icons/Answer';
import AddNewAnswerForm from 'src/components/app/question/AddNewAnswerForm'
import { useAppSelector } from 'src/redux/hooks'
import { UUIDv4 } from 'src/utils/uuid-generator'
import { question_static_texts } from 'src/constants/staticTexts/questions'
import Happy from 'src/assets/icons/Happy'
import Sad from 'src/assets/icons/Sad'
import AnswerReactions from 'src/components/app/question/AnswerReactions'
import { IAnswer } from 'src/types/answer'

interface IParams {
    [id: string]: string;
}

const QuestionDetail: React.FC = () => {
    const { id } = useParams<IParams>()
    const user = useAppSelector(state => state.userSlice)
    const [question, setQuestion] = useState<IQuestionPayload>()
    const [loading, setLoading] = useState<boolean>(true)

    const getQuestionDetails = async () => {
        try {
            let res = await questionService.getOne(Number(id))
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

        try {
            await questionService.addNewAnswer(Number(id), { answers: tempAnswers })
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
            <Header title={header_static_text.questionDetail} />
            <div className={styles.questionWrapper}>
                <ContentCard
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
                />
                <div className={styles.answersWrapper}>
                    {question.answers.length > 0 &&
                        <>
                            <span className={styles.title}>{question_static_texts.answers}</span>
                            <div className={styles.answerCardsWrapper}>
                                {question.answers.map((answer: IAnswer) =>
                                    <ContentCard
                                        key={answer.uuid}
                                        title={answer.username}
                                        description={answer.description}
                                        date={answer.date}
                                        time={answer.time}
                                        headerSuffix={
                                            <div className={styles.suffixWrapper}>
                                                <div className={styles.reactionWrapper}>
                                                    <Happy />
                                                    <span>{answer.like}</span>
                                                </div>
                                                <div className={styles.reactionWrapper}>
                                                    <Sad />
                                                    <span>{answer.dislike}</span>
                                                </div>
                                            </div>
                                        }
                                        cardAction={
                                            <AnswerReactions
                                                question={question}
                                                answer={answer}
                                                updateQuestion={((question33: IQuestionPayload) => setQuestion(question33))}
                                            />
                                        }
                                    />
                                )}
                            </div>
                        </>
                    }
                    <div className={styles.addNewAnswerWrapper}>
                        <span className={styles.title}>{question_static_texts.submitYourAnswer}</span>
                        <AddNewAnswerForm onSubmit={onSubmit} />
                    </div>
                </div>
            </div>
        </>
    )
}
export default QuestionDetail