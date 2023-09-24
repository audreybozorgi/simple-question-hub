import React, { useState } from 'react'
import styles from './ProfileDropdown.module.scss'
import Arrow from 'src/assets/icons/Arrow';
import { staticImages } from 'src/assets/staticImages'
import { useAppDispatch, useAppSelector } from 'src/redux/hooks'
import { handlePurgeUser } from 'src/redux/features/userSlice'
import { header_static_text } from 'src/constants/staticTexts/header';

const ProfileDropdown = () => {
    const user = useAppSelector(state => state.userSlice)
    const dispatch = useAppDispatch()
    const [show, setShow] = useState<boolean>(false)

    return (
        <>
            <div className={styles.userWrapper} onClick={() => setShow(true)}>
                <img src={staticImages.avatar} alt='sample avatar' />
                <div className={styles.username}>
                    <span>{user.username}</span>
                </div>
                <Arrow />
                {show &&
                    <div className={styles.dropdown}>
                        <span onClick={() => dispatch(handlePurgeUser())}>{header_static_text.exit}</span>
                    </div>
                }
            </div>
            {show && <div className={styles.dropdownBackLayout} onClick={() => setShow(false)} />}
        </>
    )
}

export default ProfileDropdown