
import React from 'react';
import styles from './AddNewAnswerForm.module.scss'
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from './validation-schema';
import FormFieldWrapper from '../FormFieldWrapper';
import Textarea from 'src/components/Kit/Textarea';
import Button from 'src/components/Kit/Button';
import { BUTTON_CLASS_OPTIONS } from 'src/enums/button';
import { useAppSelector } from 'src/redux/hooks';
import { question_static_texts } from 'src/constants/staticTexts/questions';

interface IAnswerForm {
    description: string;
}

interface IAddNewAnswerFormProps {
    onSubmit: (newAnswer: IAnswerForm) => void
} 

const AddNewAnswerForm: React.FC<IAddNewAnswerFormProps> = ({ onSubmit }) => {
    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm<IAnswerForm>({
        defaultValues: {
            description: '',
        },
        mode: 'all',
        resolver: yupResolver(validationSchema()),
    });

    return (
        <div className={styles.formWrapper}>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <FormFieldWrapper>
                    <label className='form-field-label' htmlFor="subject">
                        {question_static_texts.writeYourAnswer}
                    </label>
                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                            <>
                                <Textarea onChange={field.onChange} style={{ height: '164px', resize: 'none' }} />
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
                        onClick={handleSubmit(onSubmit)}
                    >
                        {question_static_texts.createNewAnswer}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AddNewAnswerForm;
