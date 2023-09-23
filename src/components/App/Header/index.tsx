
import { staticImages } from 'src/assets/staticImages';
import styles from './Header.module.scss'
import { useAppSelector } from 'src/redux/hooks';
import Button from 'src/components/Kit/Button';
import { BUTTON_CLASS_OPTIONS } from 'src/enums/button';
import Plus from 'src/assets/icons/Plus';
import { header } from 'src/constants/staticTexts/header';
import { useState } from 'react';
import AddNewQuestionModal from '../AddNewQuestionModal';


interface IHeaderProps {
    title: string;
}
const Header: React.FC<IHeaderProps> = ({ title }) => {
    const user = useAppSelector(state => state.userSlice)
    const [show, setShow] = useState<boolean>(false)

    return (
        <div className={styles.header_container}>
            <span>{title}</span>
            <div className={styles.actionsWrapper}>
                <Button 
                    type={BUTTON_CLASS_OPTIONS.SUCCESS} 
                    onClick={() => setShow(true)}
                >
                    <Plus />
                    {header.createNewQuestionButton}
                </Button>
                <div className={styles.userWrapper}>
                    <img src={staticImages.avatar} />
                    <div className={styles.username}>
                        <span>{user.username}</span>
                    </div>
                </div>
            </div>
            <AddNewQuestionModal show={show} onHide={() => setShow(false)}/>
        </div>
    );
};

export default Header;
