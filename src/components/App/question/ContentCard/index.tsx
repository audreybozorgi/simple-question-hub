import styles from './ContentCard.module.scss';
import { staticImages } from 'src/assets/staticImages';
import { ReactNode } from 'react';
import Date from './Date';


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
                    <img src={staticImages.rectangleAvatar} alt='sample user'/>
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
                <p>{description}</p>
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
