import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck, faStar } from "@fortawesome/free-solid-svg-icons";
import styles from "./Doctor.module.scss";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import Paginations from '../Pagination'
const cx = classNames.bind(styles);

function Doctor({ doctors }) {
    const renderDoctors = (currentItems) => (
        <div className={cx('doctor-list')}>
            {currentItems.map((doctor, index) => {
                return (
                    <div className={cx('doctor-item')} key={index}>
                        <div className={cx('imgDoctor')}>
                            <img src={doctor.image} height={170} width={170} alt="Doctor" className={cx('img')} />
                        </div>
                        <div className={cx('infor')}>
                            <h3 className={cx('name')}>{doctor.name}</h3>
                            <div className={cx('detail')}>
                                <span>Chuyên khoa: {doctor.specialty}</span>
                                <span><FontAwesomeIcon icon={faStar} className={cx('icon')} /> Đánh giá: {doctor.rating}</span>
                                <span><FontAwesomeIcon icon={faCalendarCheck} className={cx('icon')} /> Số lượt đặt khám: {doctor.appointments}</span>
                            </div>
                        </div>
                        <Link to={`/orderDoctor/${doctor.id}`}>
                            <div className={cx('order')}>
                                <span>Đặt khám</span>
                            </div>
                        </Link>
                    </div>
                );
            })}
        </div>
    );

    return (
        <Paginations
            data={doctors}
            renderItems={renderDoctors}
            itemsPerPage={6}
        />
    )
}
Doctor.propTypes = {
    doctors: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            specialty: PropTypes.string.isRequired,
            rating: PropTypes.number.isRequired,
            appointments: PropTypes.number.isRequired,
            image: PropTypes.string.isRequired,
            orderLink: PropTypes.string.isRequired,
            price: PropTypes.string.isRequired,
            bio: PropTypes.string.isRequired,
        })
    ).isRequired,
};
export default Doctor;
