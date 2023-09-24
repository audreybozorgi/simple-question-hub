import styles from './Date.module.scss';

interface IContentCardProps {
    date: string;
    time: string;
}
const Date: React.FC<IContentCardProps> = ({ date, time }) => {
    return (
        <div className={styles.dateWrapper}>
            <span className={styles.title}>ساعت</span>
            <span className={styles.title}>:</span>
            <span className={styles.date}>{time}</span>
            <span className={styles.divider} />
            <span className={styles.title}>تاریخ : </span>
            <span className={styles.date}>{date}</span>
        </div>
    );
};
export default Date;
