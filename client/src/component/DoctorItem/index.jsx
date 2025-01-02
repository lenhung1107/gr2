import classNames from "classnames/bind";
import styles from "./DoctorItem.module.scss";
import PropTypes from 'prop-types';
const cx = classNames.bind(styles);

function DoctorItem({ doctors }) {
    const scrollLeft = () => {
        const wrapper = document.querySelector(`.${cx("wrapper")}`);
        wrapper.scrollBy({ left: -300, behavior: "smooth" }); // Cuộn sang trái 300px
    };

    const scrollRight = () => {
        const wrapper = document.querySelector(`.${cx("wrapper")}`);
        wrapper.scrollBy({ left: 300, behavior: "smooth" }); // Cuộn sang phải 300px
    };
    return (
        <div >
            {/* <h1>Bác sĩ nổi bật</h1> */}
            <div className={cx('container')}>

                <button onClick={scrollLeft} className={cx('arrow', 'left')}>❮</button>
                <div className={cx('wrapper')}>
                    {doctors.map((doctor, index) => (
                        <div className={cx('pack-list')}key={index}>
                            <div className={cx('grid-container')}>
                                <div className={cx('image')}>
                                    <img src={doctor.image} height={50} width={160} alt="Logo" />
                                </div>
                                <div className={cx('info')}>
                                    <h2>Bác sĩ : {doctor.name} </h2>
                                    <p>{doctor.bio}</p>
                                    <p>Chuyên khoa: {doctor.specialty}</p>
                                    <p style={{ color: 'rgb(75, 192, 140)' }}>{doctor.price}</p>
                                </div>
                            </div>
                        </div>))}
                </div>
                <button onClick={scrollRight} className={cx('arrow', 'right')}>❯</button>
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
            price:PropTypes.string.isRequired,
            bio:PropTypes.string.isRequired,
        })
    ).isRequired,
};
export default DoctorItem;