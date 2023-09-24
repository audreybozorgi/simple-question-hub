
import styles from './Header.module.scss'
import Button from 'src/components/myKit/Button';
import Plus from 'src/assets/icons/Plus';
import AddNewQuestionModal from './AddNewQuestionModal';
import { BUTTON_CLASS_OPTIONS } from 'src/enums/kit/button';
import { header_static_text } from 'src/constants/staticTexts/header';
import { useState } from 'react';
import ProfileDropdown from './ProfileDropdown';

interface IHeaderProps {
    title: string;
}

const Header: React.FC<IHeaderProps> = ({ title }) => {
    const [show, setShow] = useState<boolean>(false)

    return (
        <div className={styles.headerContainer}>
            <p className={styles.title}>{title}</p>
            <div className={styles.actionsWrapper}>
                <Button
                    type={BUTTON_CLASS_OPTIONS.SUCCESS}
                    onClick={() => setShow(true)}
                >
                    <Plus />
                    <span className={styles.buttonText}>{header_static_text.createNewQuestionButton}</span>
                </Button>
                <ProfileDropdown />
            </div>
            <AddNewQuestionModal show={show} onHide={() => setShow(false)} />
        </div>
    );
};

export default Header;
