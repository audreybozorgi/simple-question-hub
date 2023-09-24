import React from 'react'
import styles from './AnswerReactions.module.scss'
import Button from 'src/components/kit/Button'
import { BUTTON_CLASS_OPTIONS } from 'src/enums/kit/button'
import Happy from 'src/assets/icons/Happy'
import Sad from 'src/assets/icons/Sad'
import { REACTIONS } from 'src/enums/questions/answer-reactions'
import { questionService } from 'src/api/services/questionService'
import { question_static_texts } from 'src/constants/staticTexts/questions'
import { useParams } from 'react-router-dom'
import { IAnswer, IAnswerReactionsTypes } from 'src/types/answer'

interface IParams {
    [id: string]: string;
}

const AnswerReactions: React.FC<IAnswerReactionsTypes> = ({ question, answer, updateQuestion }) => {
    const { id } = useParams<IParams>()

    const handleReaction = async (type: REACTIONS, questionId: number, targetAnswer: IAnswer) => {
        let tempAnswers = structuredClone(question?.answers) as IAnswer[]

        tempAnswers = tempAnswers?.map((tempAnswer: IAnswer) => {
            if (tempAnswer.uuid === targetAnswer.uuid) {
                const updatedTempAnswer = { ...tempAnswer } as IAnswer

                if (type === REACTIONS.LIKE) updatedTempAnswer['like'] = tempAnswer.like += 1
                else if (type === REACTIONS.DISLIKE) updatedTempAnswer['dislike'] = tempAnswer.dislike += 1
            }
            return tempAnswer
        })

        try {
            await questionService.updateAnswers(questionId, { answers: tempAnswers })
            updateQuestion({
                ...question!,
                answers: tempAnswers
            })
        } catch (error) {
            console.error(error)
        }
    }
    return (
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
                <Sad fill='#F16063' />
                <span className={styles.sadButtonText}>{question_static_texts.answerWasBad}</span>
            </Button>
        </>
    )
}

export default AnswerReactions