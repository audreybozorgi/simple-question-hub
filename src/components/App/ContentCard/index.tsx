import { IQuestionPayload } from 'src/types/question';
import styles from './ContentCard.module.scss';
import { staticImages } from 'src/assets/staticImages';
import Date from '../Date';


interface IContentCardProps {
    data: IQuestionPayload
}
const ContentCard: React.FC<IContentCardProps> = ({ data }) => {
    return (
        <div className={styles.cardWrapper}>
            <div className={styles.cardHeader}>
                <div className={styles.userWrapper}>
                    <img src={staticImages.rectangleAvatar}/>
                    <span>{data.subject}</span>
                </div>
                <div className={styles.detailsWrapper}>
                    <Date date={data.date} time={data.time} />
                </div>
            </div>
        </div>
    );
};
export default ContentCard;
