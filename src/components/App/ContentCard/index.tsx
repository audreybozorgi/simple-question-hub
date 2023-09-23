import { IQuestionPayload } from 'src/types/question';
import styles from './ContentCard.module.scss';
import { staticImages } from 'src/assets/staticImages';
import Date from '../Date';
import { ReactNode } from 'react';


interface IContentCardProps {
    data: IQuestionPayload;
    headerSuffix: ReactNode;
    cardAction: ReactNode;
}
const ContentCard: React.FC<IContentCardProps> = ({ data, headerSuffix, cardAction }) => {
    return (
        <div className={styles.cardWrapper}>
            <div className={styles.cardHeader}>
                <div className={styles.userWrapper}>
                    <img src={staticImages.rectangleAvatar}/>
                    <span>{data.subject}</span>
                </div>
                <div className={styles.detailsWrapper}>
                    <Date date={data.date} time={data.time} />
                    <div className={styles.detailsSuffix}>
                        {headerSuffix}
                    </div>
                </div>
            </div>
            <div className={styles.cardBody}>
                <span>{data.description}</span>
            </div>
            <div className={styles.cardAction}>
                {cardAction}
            </div>
        </div>
    );
};
export default ContentCard;
