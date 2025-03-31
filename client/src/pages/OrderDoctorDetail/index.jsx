import classNames from "classnames/bind";
import { useState } from "react";
import { useParams } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from "./OrderDoctorDetail.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faHouseMedicalCircleCheck, faLocationDot, faStar, faVideo } from "@fortawesome/free-solid-svg-icons";
import Hour from "../../component/Hour/Hour";
import Form from "../../component/Form";
import useFetchData from "../../CustomHook/useFetchData";

const cx = classNames.bind(styles);

function OrderDoctor() {
    const { id } = useParams();
    const apiUrl = `http://localhost:3000/orderDoctor/${id}`;
    console.log(id);
    const { data: doctor, loading, error } = useFetchData(apiUrl);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [order, setOrder] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const hoursData = [
       '8:00','9:00','10:00','11:00','13:00','14:00','13:00','14:00','15:00','16:00','17:00'
    ];
    const openPopup = () => {
        if (!selectedDate) {
            alert("Vui lòng chọn ngày khám trước khi đặt lịch!")
            return;
        }
        setIsPopupOpen(true);
    };
    const closePopup = () => {
        setIsPopupOpen(false);
    };

    const handleHourSelect = (time) => {
        setSelectedTime(time);
        setOrder(true);
    };

    if (!doctor) {
        return <div>Bác sĩ không tồn tại!</div>;
    }
    if(loading)
        return <div>Đang tải thông tin bác si...</div>;
    if(error)
        return <div>Có loi xảy ra: {error}</div>;

    return (
        <div className={cx('wrapper')}>
            <div className={cx('brg')}>
                <div className={cx('content')}>
                    <div className={cx('grid-container')}>
                        <div className={cx('image')}>
                            <img src={doctor.image} height={50} width={160} alt="Logo" />
                        </div>
                        <div className={cx('info')}>
                            <h2>{doctor.name}</h2>
                            <h3>{doctor.specialty}</h3>
                            <p>{doctor.price}</p>
                        </div>
                        <div className={cx('evaluate')}>
                            <span><FontAwesomeIcon icon={faCalendarDays} className={cx('icon')} /> Lượt đặt khám: {doctor.appointments}</span>
                            <span><FontAwesomeIcon icon={faVideo} className={cx('icon')} /> Lượt gọi khám: 47</span>
                            <span><FontAwesomeIcon icon={faStar} className={cx('icon')} /> Đánh giá: {doctor.rating}</span>
                        </div>
                    </div>
                    <div className={cx('order')}>
                        <div className={cx('address')}>
                            <span className={cx('main')}><FontAwesomeIcon icon={faLocationDot} className={cx('icon')} /> Bệnh Viện Phổi Trung Ương</span>
                            <span className={cx('detail')}>435 đường Hoàng Hoa Thám, Ba Đình, Hà Nội</span>
                        </div>
                        <div className={cx('date')}>
                            <div className={cx('select')}>
                                <h3>Lịch khám bệnh tại bệnh viện</h3>
                                <DatePicker
                                    selected={selectedDate}
                                    onChange={(date) => setSelectedDate(date)}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Chọn ngày"
                                    className={cx('datePicker')}
                                />
                            </div>
                            <div className={cx('hour')}>
                                {hoursData.map((hour,index) => (
                                    <Hour
                                        key={index}
                                        hourText={hour}
                                        onClick={handleHourSelect}
                                        isSelected={selectedTime === hour} // Kiểm tra giờ đang chọn
                                         
                                    />))}
                            </div>
                        </div>
                        {order && (
                            <div className={cx('order-btn')}>
                                <div>
                                    <FontAwesomeIcon icon={faHouseMedicalCircleCheck} className={cx('icon')} />
                                </div>
                                <div className={cx('orderText')} onClick={openPopup}>
                                    <h3>Đặt khám</h3>
                                    <span>Tại cơ sở y tế</span>
                                </div>
                                {isPopupOpen && <Form onClose={closePopup} doctor={doctor} date={selectedDate} time={selectedTime} />}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderDoctor;
