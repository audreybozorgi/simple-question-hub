
import React from 'react';
import styles from './AddNewAnswerForm.module.scss'
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createNewAnswerValidator } from './validation-schema';
import FormFieldWrapper from '../../../myKit/FormFieldWrapper';
import Textarea from 'src/components/myKit/Textarea';
import Button from 'src/components/myKit/Button';
import { BUTTON_CLASS_OPTIONS } from 'src/enums/kit/button';
import { question_static_texts } from 'src/constants/staticTexts/questions';
import { IAnswerForm } from 'src/types/answer/answer-form';

interface IAddNewAnswerFormProps {
    onSubmit: (newAnswer: IAnswerForm) => void
} 

const AddNewAnswerForm: React.FC<IAddNewAnswerFormProps> = ({ onSubmit }) => {
    const {control, reset, formState: { errors }, handleSubmit } = useForm<IAnswerForm>({
        defaultValues: {
            description: '',
        },
        mode: 'all',
        resolver: yupResolver(createNewAnswerValidator()),
    });

    const handleFormSubmit = (data: IAnswerForm) => {
        onSubmit(data)
        reset({
            description: ''
        })
    }

    return (
        <div className={styles.formWrapper}>
            <form noValidate onSubmit={handleSubmit(handleFormSubmit)}>
                <FormFieldWrapper>
                    <label className='form-field-label' htmlFor="subject">
                        {question_static_texts.writeYourAnswer}
                    </label>
                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                            <>
                                <Textarea onChange={field.onChange} value={field.value} style={{ height: '164px', resize: 'none' }} />
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
                        type={BUTTON_CLASS_OPTIONS.SUCCESS}
                        onClick={handleSubmit(handleFormSubmit)}
                    >
                        <span>{question_static_texts.createNewAnswer}</span>
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AddNewAnswerForm;
