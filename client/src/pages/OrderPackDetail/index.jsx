import classNames from "classnames/bind";
import { useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams } from 'react-router-dom';
import styles from "./OrderPackDetail.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faHouseMedicalCircleCheck, faLocationDot, faStar, faVideo } from "@fortawesome/free-solid-svg-icons";
import Hour from "../../component/Hour/Hour";
import Form from "../../component/Form";
import packData from "../../data/packData"
const cx = classNames.bind(styles);
function OrderPackDetail() {
    const hoursData = [
        '8:00', '9:00', '10:00', '11:00', '13:00', '14:00', '13:00', '14:00', '15:00', '16:00', '17:00'
    ];
    const { id } = useParams(); // Lấy `id` từ URL
    const pack = packData.find((doc) => doc.id === parseInt(id));
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [order, setOrder] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const openPopup = () => {
        if (!selectedDate) {
            alert('Vui lòng chọn ngày khám trước khi đặt lịch !');
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
                                {hoursData.map((hour, index) => (
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
                                    <h3>Đặt khám </h3>
                                    <span>Tại cơ sở y tế</span>
                                </div>
                                {isPopupOpen && <Form onClose={closePopup} doctor={pack} date={selectedDate} time={selectedTime} />}

                            </div>
                        )
                        }
                    </div>
                    <div className={cx('descript')}>
                        <h2>Gói Khám Xét Nghiệm Máu - Kiểm Tra Sức Khỏe Toàn Diện</h2>
                        <p>Gói khám xét nghiệm máu giúp đánh giá tổng quát tình trạng sức khỏe, phát hiện sớm các nguy cơ bệnh lý và theo dõi các chỉ số quan trọng trong cơ thể. Thông qua xét nghiệm máu, bác sĩ có thể kiểm tra chức năng gan, thận, mỡ máu, đường huyết, công thức máu và nhiều chỉ số quan trọng khác.</p>

                        <h3>Các hạng mục xét nghiệm bao gồm:</h3>
                        <ul>
                            <li><strong>Công thức máu:</strong> Đánh giá tình trạng thiếu máu, nhiễm trùng, rối loạn đông máu.</li>
                            <li><strong>Đường huyết (Glucose):</strong> Kiểm tra nguy cơ tiểu đường.</li>
                            <li><strong>Chức năng gan (AST, ALT, GGT):</strong> Phát hiện tổn thương gan, viêm gan.</li>
                            <li><strong>Chức năng thận (Creatinine, Ure, eGFR):</strong> Kiểm tra hoạt động của thận.</li>
                            <li><strong>Mỡ máu (Cholesterol, Triglyceride, HDL, LDL):</strong> Đánh giá nguy cơ tim mạch.</li>
                            <li><strong>Acid Uric:</strong> Phát hiện nguy cơ gout.</li>
                            <li><strong>Viêm nhiễm (CRP, RF):</strong> Kiểm tra dấu hiệu viêm nhiễm trong cơ thể.</li>
                        </ul>

                        <h3>Ai nên thực hiện xét nghiệm máu?</h3>
                        <ul>
                            <li>Người có tiền sử bệnh lý tim mạch, tiểu đường.</li>
                            <li>Người thường xuyên mệt mỏi, chóng mặt, chán ăn.</li>
                            <li>Người có nguy cơ cao mắc bệnh gan, thận.</li>
                            <li>Người muốn kiểm tra sức khỏe định kỳ để phòng ngừa bệnh sớm.</li>
                        </ul>

                        <h3>Lưu ý trước khi xét nghiệm:</h3>
                        <ul>
                            <li>Nhịn ăn ít nhất 8 tiếng trước khi lấy máu.</li>
                            <li>Không sử dụng rượu, bia, cà phê trước khi xét nghiệm.</li>
                            <li>Nên thực hiện xét nghiệm vào buổi sáng để có kết quả chính xác nhất.</li>
                        </ul>

                        <p>Gói khám xét nghiệm máu là phương pháp đơn giản nhưng vô cùng quan trọng để bảo vệ sức khỏe. Hãy chủ động kiểm tra định kỳ để phát hiện sớm và phòng tránh bệnh tật hiệu quả!</p>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default OrderPackDetail;