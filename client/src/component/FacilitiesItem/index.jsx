import classNames from "classnames/bind";
import PropTypes from 'prop-types';

import styles from "./FacilitiesItem.module.scss";


const cx = classNames.bind(styles);

function FacilitiesItem({ facility }) {
    return (
        <div className={cx('facilities-item')}>
            <div className={cx('imgDoctor')}>
                <img src={facility.image} height={170} width={200} alt="Logo" className={cx('img')} />
            </div>
            <div className={cx('infor')}>
                <h3 className={cx('name')}>{facility.name}</h3>
            </div>
        </div>
    );
}

FacilitiesItem.propTypes = {
    facility: PropTypes.shape({
        image: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    })
};

export default FacilitiesItem;