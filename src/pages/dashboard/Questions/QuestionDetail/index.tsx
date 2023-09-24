import React, { useEffect, useState } from 'react'
import styles from './Question.module.scss'
import { useParams } from 'react-router-dom'
import { questionService } from 'src/api/services/questionService'
import ContentCard from 'src/components/app/ContentCard'
import Header from 'src/components/app/Header'
import { header } from 'src/constants/staticTexts/header'
import { IAnswer, IQuestionPayload } from 'src/types/question'
import Answer from 'src/assets/icons/Answer';
import AddNewAnswerForm from 'src/components/app/AddNewAnswerForm'
import { useAppSelector } from 'src/redux/hooks'
import { UUIDv4 } from 'src/utils/uuid-generator'
import { question_static_texts } from 'src/constants/staticTexts/questions'
import Happy from 'src/assets/icons/Happy'
import Sad from 'src/assets/icons/Sad'
import Button from 'src/components/kit/Button'
import { BUTTON_CLASS_OPTIONS } from 'src/enums/kit/button'

interface IQuestionDetailProps {

}

interface IParams {
    [id: string]: string;
}

enum REACTIONS {
    LIKE = 'LIKE',
    DISLIKE = 'DISLIKE'
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
            await questionService.addNewAnswer(Number(id), { answers: tempAnswers })
            setQuestion({
                ...question!,
                answers: tempAnswers
            })
        } catch (error) {
            console.error(error)
        }
    }

    const handleReaction = async (type: REACTIONS, questionId: number, targetAnswer: IAnswer) => {
        let tempAnswers = structuredClone(question?.answers) as IAnswer[]

        tempAnswers = tempAnswers?.map((tempAnswer: IAnswer) => {
            if(tempAnswer.uuid === targetAnswer.uuid) {
                const updatedTempAnswer = {...tempAnswer} as IAnswer
                
                if(type === REACTIONS.LIKE) updatedTempAnswer['like'] = tempAnswer.like +=1
                else if(type === REACTIONS.DISLIKE) updatedTempAnswer['dislike'] = tempAnswer.dislike +=1
            }
            return tempAnswer
        })
        
        try{
            await questionService.updateAnswers(questionId, {answers: tempAnswers})
            setQuestion({
                ...question!,
                answers: tempAnswers
            })
        }catch(error){
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
                        <div className={styles.suffixWrapper}>
                            <Answer />
                            <span>{question.answers.length}</span>
                        </div>
                    }
                />
                <div className={styles.answersWrapper}>
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
                                    <>
                                        <Button
                                            type={BUTTON_CLASS_OPTIONS.BORDERED_OUTLINE}
                                            onClick={() => handleReaction(REACTIONS.LIKE, Number(id), answer)}
                                        >
                                            <Happy />
                                            <span className={styles.happyButtonText}>{question_static_texts.answerWasGood}</span>
                                        </Button>
                                        <Button
                                            type={BUTTON_CLASS_OPTIONS.BORDERED_OUTLINE}
                                            onClick={() => handleReaction(REACTIONS.DISLIKE, Number(id), answer)}
                                            style={{ marginRight: '12px' }}
                                        >
                                            <Sad fill='#F16063'/>
                                            <span className={styles.sadButtonText}>{question_static_texts.answerWasBad}</span>
                                        </Button>
                                    </>
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