
import React from 'react';
import styles from './AddNewQuestionModal.module.scss'
import Modal from 'react-modal';
import Close from 'src/assets/icons/Close';
import { header } from 'src/constants/staticTexts/header';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from './validation-schema';
import FormFieldWrapper from '../FormFieldWrapper';
import Input from 'src/components/kit/Input';
import Textarea from 'src/components/kit/Textarea';
import Button from 'src/components/kit/Button';
import { BUTTON_CLASS_OPTIONS } from 'src/enums/kit/button';
import { useAppSelector } from 'src/redux/hooks';
import { questionService } from 'src/api/services/questionService';
import { IQuestionType } from 'src/types/question';
import { createNewModal } from 'src/constants/staticTexts/questions';
import { UUIDv4 } from 'src/utils/uuid-generator';


interface IAddNewQuestionModalProps {
    show: boolean,
    onHide: () => void;
}
interface ICreateNewQuestionForm {
    subject: string;
    description: string;
}

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '0px',
        borderRadius: '8px',
    },
    overlay: {
        background: 'rgba(0, 0, 0, 0.38)'
    }
};
const AddNewQuestionModal: React.FC<IAddNewQuestionModalProps> = ({ show, onHide }) => {
    const user = useAppSelector(state => state.userSlice)

    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm<ICreateNewQuestionForm>({
        defaultValues: {
            subject: '',
            description: '',
        },
        mode: 'all',
        resolver: yupResolver(validationSchema()),
    });

    const onSubmit = async (data: ICreateNewQuestionForm) => {
        const tempQuestion: IQuestionType = {
            subject: data.subject,
            description: data.description,
            date: new Date().toLocaleDateString('fa-IR'),
            time: new Date().toLocaleTimeString('fa-IR'),
            answers: [],
            username: user.username,
            uuid: UUIDv4()
        }

        try{
            await questionService.addNewQuestion(tempQuestion)
            onHide()
        }catch(error) {
            console.error(error)
        }
    }

    return (
        <Modal isOpen={show} style={customStyles}>
            <div className={styles.modalContent}>
                <div className={styles.header}>
                    <span>{createNewModal.createNewQuestion}</span>
                    <div onClick={onHide}>
                        <Close />
                    </div>
                </div>
                <div className={styles.formWrapper}>
                    <form noValidate onSubmit={handleSubmit(onSubmit)}>
                        <FormFieldWrapper>
                            <label className='form-field-label' htmlFor="subject">
                                {createNewModal.subject}
                            </label>
                            <Controller
                                name="subject"
                                control={control}
                                render={({ field }) => (
                                    <>
                                        <Input onChange={field.onChange} />
                                        {errors?.subject?.message && (
                                            <span className='form-error-text'>
                                                {errors?.subject?.message.toString()}
                                            </span>
                                        )}
                                    </>
                                )}
                            />
                        </FormFieldWrapper>
                        <FormFieldWrapper>
                            <label className='form-field-label' htmlFor="description">
                                {createNewModal.description}
                            </label>
                            <Controller
                                name="description"
                                control={control}
                                render={({ field }) => (
                                    <>
                                        <Textarea onChange={field.onChange} style={{height: '164px', resize: 'none'}}/>
                                        {errors?.description?.message && (
                                            <span className='form-error-text'>
                                                {errors?.description?.message.toString()}
                                            </span>
                                        )}
                                    </>
                                )}
                            />
                        </FormFieldWrapper>
                        <div className={styles.actionWrapper}>
                            <Button 
                                type={BUTTON_CLASS_OPTIONS.OUTLINE} 
                                onClick={(e) => {e.preventDefault();onHide()}}
                            >
                                {createNewModal.cancel}
                            </Button>
                            <Button 
                                type={BUTTON_CLASS_OPTIONS.SUCCESS} 
                                onClick={handleSubmit(onSubmit)}
                            >   
                                {createNewModal.create}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    );
};

export default AddNewQuestionModal;
