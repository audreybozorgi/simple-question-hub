import { IAnswer, IQuestionPayload } from 'src/types/question';
import styles from './ContentCard.module.scss';
import { staticImages } from 'src/assets/staticImages';
import Date from '../Date';
import { ReactNode } from 'react';


interface IContentCardProps { 
    title: string;
    description: string;
    date: string;
    time: string;
    headerSuffix: ReactNode;
    cardAction?: ReactNode;
}
const ContentCard: React.FC<IContentCardProps> = ({ title, description, date, time, headerSuffix, cardAction }) => {
    return (
        <div className={styles.cardWrapper}>
            <div className={styles.cardHeader}>
                <div className={styles.userWrapper}>
                    <img src={staticImages.rectangleAvatar}/>
                    <span>{title}</span>
                </div>
                <div className={styles.detailsWrapper}>
                    <Date date={date} time={time} />
                    <div className={styles.detailsSuffix}>
                        {headerSuffix}
                    </div>
                </div>
            </div>
            <div className={styles.cardBody}>
                <span>{description}</span>
            </div>
            {cardAction &&
                <div className={styles.cardAction}>
                    {cardAction}
                </div>
            }
        </div>
    );
};
export default ContentCard;
