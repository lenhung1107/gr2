import classNames from "classnames/bind";

import styles from "./FacilitiesItem.module.scss";


const cx = classNames.bind(styles);

function Doctor() {
    return (
        <div className={cx('facilities-item')}>
            <div className={cx('imgDoctor')}>
                <img src={'XQuang.png'} height={170} width={200} alt="Logo" className={cx('img')} />
            </div>
            <div className={cx('infor')}>
                <h3 className={cx('name')}>Chuyên khoa phụ khoa</h3>
                </div>
                
           

        </div>
    );
}

export default Doctor;