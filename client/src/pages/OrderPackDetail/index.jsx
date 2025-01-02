import classNames from "classnames/bind";
import { useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams } from 'react-router-dom';
import styles from "./OrderPackDetail.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faHouseMedicalCircleCheck, faLocationDot, faStar, faVideo } from "@fortawesome/free-solid-svg-icons";
import Hour from "../../component/Hour/Hour";
import DoctorItem from "../../component/DoctorItem"
import Form from "../../component/Form";
import packData from "../../data/packData"
import doctorData from "../../data/doctorData"
const cx = classNames.bind(styles);
function OrderPackDetail() {
    const hoursData = [
        { hour: '9:00 ', status: 'available' },
        { hour: '10:00 ', status: 'booked' },
        { hour: '11:00', status: 'available' },
    ];
    const { id } = useParams(); // Lấy `id` từ URL
    const pack = packData.find((doc) => doc.id === parseInt(id));
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [order, setOrder] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const openPopup = () => {
        setIsPopupOpen(true);
    };
    const closePopup = () => {
        setIsPopupOpen(false);
    };
    const handleHourSelect = (time) => {
        setSelectedTime(time);
        setOrder(true);
    };
    if (!pack) {
        return <div>Bác sĩ không tồn tại!</div>;
    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('brg')}>
                <div className={cx('content')}>
                    <div className={cx('grid-container')}>
                        <div className={cx('image')}>
                            <img src={pack.image} height={170} width={250} alt="Logo" />
                            {
                                console.log(pack.image)
                            }
                        </div>
                        <div className={cx('info')}>
                            <h2>{pack.name}</h2>
                            <h3>{pack.room}</h3>
                            <p >{pack.price}</p>
                        </div>
                        <div className={cx('evaluate')}>
                            <span> <FontAwesomeIcon icon={faCalendarDays} className={cx('icon')} /> Lượt đặt khám: 4567</span>
                            <span> <FontAwesomeIcon icon={faVideo} className={cx('icon')} /> Lượt gọi khám: 47</span>
                            <span> <FontAwesomeIcon icon={faStar} className={cx('icon')} />Đánh giá : 4.5 (21 lượt đánh giá)</span>
                        </div>
                    </div>
                    <div className={cx('list-doctor')}>
                        <span>Các bác sĩ trong gói khám</span>
                        <DoctorItem doctors={doctorData} />
                    </div>
                    <div className={cx('order')}>
                        <div className={cx('address')}>
                            <span className={cx('main')}> <FontAwesomeIcon icon={faLocationDot} className={cx('icon')} />Bệnh Viện Phổi Trung Ương</span>
                            <span className={cx('detail')}>435 đường Hoàng Hoa Thám, Ba Đình, Hà Nội</span>
                        </div>
                        <div className={cx('date')}>
                            <div className={cx('select')}>
                                <h3>Lịch khám bệnh tại bệnh viện </h3>
                                <DatePicker
                                    selected={selectedDate}
                                    onChange={(date) => setSelectedDate(date)}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Chọn ngày"
                                    className={cx('datePicker')}>
                                </DatePicker>
                            </div>
                            <div className={cx('hour')}>
                            {hoursData.map(({ hour, status }) => (
                                    <Hour
                                    key={hour}
                                    hourText={hour}
                                    onClick={handleHourSelect}
                                    isSelected={selectedTime === hour} // Kiểm tra giờ đang chọn
                                    isDisabled={status === 'booked'} // Vô hiệu hóa giờ đã đặt
                                    />))}
                            </div>

                        </div>

                        {order && (
                            <div className={cx('order-btn')}>
                                <div>
                                    <FontAwesomeIcon icon={faHouseMedicalCircleCheck} className={cx('icon')} />
                                </div>
                                <div className={cx('orderText')} onClick={openPopup}>
                                    <h3>Đặt khám </h3>
                                    <span>Tại cơ sở y tế</span>
                                </div>
                                {isPopupOpen && <Form onClose={closePopup} doctor={pack} date={selectedDate} time={selectedTime}/>}

                            </div>
                        )

                        }


                    </div>

                </div>
            </div>
        </div>
    );
}

export default OrderPackDetail;