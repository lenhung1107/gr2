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
                        <div className={cx('doctor-avatar')}>
                            <img 
                                src={doctor.image} 
                                alt={doctor.name}
                                className={cx('avatar-img')} 
                            />
                        </div>
                        <div className={cx('doctor-info')}>
                            <h3 className={cx('doctor-name')}>{doctor.name}</h3>
                            <div className={cx('doctor-details')}>
                                <div className={cx('specialty')}>
                                    <span>{doctor.specialty}</span>
                                </div>
                                <div className={cx('stats')}>
                                    <div className={cx('stat-item')}>
                                        <FontAwesomeIcon icon={faStar} className={cx('icon')} />
                                        <span>Đánh giá: {doctor.rating}</span>
                                    </div>
                                    <div className={cx('stat-item')}>
                                        <FontAwesomeIcon icon={faCalendarCheck} className={cx('icon')} />
                                        <span>Lượt khám: {doctor.appointments}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Link to={`/orderDoctor/${doctor._id}`} className={cx('order-link')}>
                            <div className={cx('order-btn')}>
                                <span className={cx('order-text')}>Đặt khám</span>
                            </div>
                        </Link>
                    </div>
                );
            })}
        </div>
    );

    return (
        <div className={cx('doctor-wrapper')}>
            <Paginations
                data={doctors}
                renderItems={renderDoctors}
                itemsPerPage={6}
            />
        </div>
    )
}

Doctor.propTypes = {
    doctors: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            specialty: PropTypes.string.isRequired,
            rating: PropTypes.number.isRequired,
            appointments: PropTypes.number.isRequired,
            image: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default Doctor;