import classNames from "classnames/bind";
import styles from "./DoctorItem.module.scss";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(styles);

function DoctorItem({ doctors }) {
    const scrollLeft = () => {
        const wrapper = document.querySelector(`.${cx("wrapper")}`);
        wrapper.scrollBy({ left: -300, behavior: "smooth" });
    };

    const navigate = useNavigate();
    const scrollRight = () => {
        const wrapper = document.querySelector(`.${cx("wrapper")}`);
        wrapper.scrollBy({ left: 300, behavior: "smooth" });
    };
    return (
        <div className={cx('doctor-section')}>
            <div className={cx('container')}>
                <button 
                    onClick={scrollLeft} 
                    className={cx('arrow', 'left')}
                    aria-label="Scroll left"
                >
                    ❮
                </button>
                
                <div className={cx('wrapper')}>
                    {doctors.map((doctor, index) => (
                        <div className={cx('doctor-card')} key={index}>
                            <div className={cx('card-content')}>
                                <div className={cx('image-container')}>
                                    <img 
                                        src={doctor.image} 
                                        alt={`Bác sĩ ${doctor.name}`}
                                        className={cx('doctor-image')}
                                    />
                                </div>
                                <div className={cx('info')}>
                                    <h3 className={cx('doctor-name')}>
                                        BS. {doctor.name}
                                    </h3>
                                    <p className={cx('doctor-bio')}>{doctor.bio}</p>
                                    <p className={cx('specialty')}>
                                        <span className={cx('label')}>Chuyên khoa:</span> 
                                        {doctor.specialty}
                                    </p>
                                    <div className={cx('rating-appointments')}>
                                        <span className={cx('rating')}>
                                            ⭐ {doctor.rating}
                                        </span>
                                        <span className={cx('appointments')}>
                                            {doctor.appointments} lượt khám
                                        </span>
                                    </div>
                                    <p className={cx('price')}>{doctor.price}</p>
                                    <button className={cx('book-btn')}
                                    onClick={() => navigate(`/orderDoctor/${doctor._id}`)}>
                                        Đặt khám
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                <button 
                    onClick={scrollRight} 
                    className={cx('arrow', 'right')}
                    aria-label="Scroll right"
                >
                    ❯
                </button>
            </div>
        </div>
    );
}

DoctorItem.propTypes = {
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

export default DoctorItem;