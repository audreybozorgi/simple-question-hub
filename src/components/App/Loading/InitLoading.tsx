import style from './InitLoading.module.scss';

const InitLoading = ({ status = true, height = '50vh' }) => {
    return (
        <div className={style['loading-wrapper']} style={{ height }}>
            <div className={style['loading']}></div>
        </div>
    );
};
export default InitLoading;
