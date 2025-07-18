import classNames from "classnames/bind";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./OrderDoctorDetail.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCalendarDays,
  faHouseMedicalCircleCheck,
  faLocationDot,
  faStar,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import Hour from "../../component/Hour/Hour";
import Form from "../../component/Form";
import useFetchData from "../../CustomHook/useFetchData";

const cx = classNames.bind(styles);

function OrderDoctor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/listDoctor");
  };
  const apiUrl = `https://gr2-3t8u.onrender.com/orderDoctor/${id}`;
  const scheduleUrl = `https://gr2-3t8u.onrender.com/schedule/schedulesGetByDoctorID/${id}`;

  const { data: doctor, loading, error } = useFetchData(apiUrl);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [order, setOrder] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [workSchedule, setWorkSchedule] = useState({});
  const [bookedAppointments, setBookedAppointments] = useState({});
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(
          `https://gr2-3t8u.onrender.com/review/getReviews/${id}`
        );
        const data = await res.json();
        setReviews(data);
      } catch (error) {
        console.error("Lỗi khi lấy đánh giá:", error);
      }
    };

    fetchReviews();
  }, [id]);
  const defaultHours = [
    "8:00",
    "9:00",
    "10:00",
    "11:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const res = await fetch(scheduleUrl);
        const data = await res.json();
        setWorkSchedule(data.schedule || {});
        setBookedAppointments(data.bookedAppointments || {});
      } catch (err) {
        console.error("Lỗi khi lấy lịch làm việc:", err);
      }
    };

    fetchSchedule();
  }, [scheduleUrl]);

  const openPopup = () => {
    if (!selectedDate) {
      alert("Vui lòng chọn ngày khám trước khi đặt lịch!");
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

  const getFormattedDate = (date) => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  console.log(bookedAppointments);
  const getAvailableHours = (date) => {
    if (!date) return [];

    const formattedDate = getFormattedDate(date);

    const doctorHours = workSchedule[formattedDate] || defaultHours;
    const bookedHours = bookedAppointments[formattedDate] || [];

    const sortedHours = doctorHours.slice().sort((a, b) => {
      const [aHour, aMin] = a.split(":").map(Number);
      const [bHour, bMin] = b.split(":").map(Number);
      return aHour !== bHour ? aHour - bHour : aMin - bMin;
    });
    return sortedHours.map((hour) => ({
      hour,
      isBooked: bookedHours.includes(hour),
    }));
  };

  if (loading) return <div>Đang tải thông tin bác sĩ...</div>;
  if (error) return <div>Có lỗi xảy ra: {error}</div>;
  if (!doctor) return <div>Bác sĩ không tồn tại!</div>;

  return (
    <div className={cx("wrapper")}>
      <div className={cx("brg")}>
        <div className={cx("tooltip-wrapper")}>
          <button className={cx("back-button")} onClick={handleBack}>
            <FontAwesomeIcon icon={faArrowLeft} className={cx("icon")} />
          </button>
          <span className={cx("tooltip-text")}>Quay lại danh sách bác sĩ</span>
        </div>

        <div className={cx("content")}>
          <div className={cx("grid-container")}>
            <div className={cx("image")}>
              <img src={doctor.image} height={50} width={160} alt="Logo" />
            </div>
            <div className={cx("info")}>
              <h2>{doctor.name}</h2>
              <h3>{doctor.specialty}</h3>
              <p>{doctor.price}</p>
            </div>
            <div className={cx("evaluate")}>
              <span>
                <FontAwesomeIcon icon={faCalendarDays} className={cx("icon")} />{" "}
                Lượt đặt khám: {doctor.appointments}
              </span>
              <span>
                <FontAwesomeIcon icon={faVideo} className={cx("icon")} /> Lượt
                gọi khám: 47
              </span>
              <span>
                <FontAwesomeIcon icon={faStar} className={cx("icon")} /> Đánh
                giá: {doctor.rating}
              </span>
            </div>
          </div>

          <div className={cx("order")}>
            <div className={cx("address")}>
              <span className={cx("main")}>
                <FontAwesomeIcon icon={faLocationDot} className={cx("icon")} />{" "}
                Phòng khám tư nhân ABC
              </span>
              <span className={cx("detail")}>
                435 đường Hoàng Hoa Thám, Ba Đình, Hà Nội
              </span>
            </div>

            <div className={cx("date")}>
              <div className={cx("select")}>
                <h3>Chọn lịch đặt khám :</h3>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => {
                    setSelectedDate(date);
                    setSelectedTime(null);
                    setOrder(false);
                  }}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Chọn ngày"
                  className={cx("datePicker")}
                />
              </div>

              <div className={cx("hour")}>
                {selectedDate ? (
                  getAvailableHours(selectedDate).length > 0 ? (
                    getAvailableHours(selectedDate).map(
                      ({ hour, isBooked }, index) => (
                        <Hour
                          key={index}
                          hourText={hour}
                          onClick={!isBooked ? handleHourSelect : () => {}}
                          isSelected={selectedTime === hour}
                          isDisabled={isBooked}
                        />
                      )
                    )
                  ) : (
                    <div>Không có lịch làm việc cho ngày này</div>
                  )
                ) : (
                  <div style={{ fontSize: "1.6rem" }}>
                    Vui lòng chọn ngày khám
                  </div>
                )}
              </div>
            </div>

            {order && (
              <div className={cx("order-btn")}>
                <div>
                  <FontAwesomeIcon
                    icon={faHouseMedicalCircleCheck}
                    className={cx("icon")}
                  />
                </div>
                <div className={cx("orderText")} onClick={openPopup}>
                  <h3>Đặt khám</h3>
                  <span>Tại cơ sở y tế</span>
                </div>
                {isPopupOpen && (
                  <Form
                    onClose={closePopup}
                    service={doctor}
                    date={selectedDate}
                    time={selectedTime}
                    appointmentType="doctor"
                  />
                )}
              </div>
            )}
          </div>
          <div className={cx("review-section")}>
            <h3>Đánh giá từ bệnh nhân</h3>
            {reviews.length === 0 ? (
              <p>Chưa có đánh giá nào.</p>
            ) : (
              reviews.map((review, index) => (
                <div key={index} className={cx("review-item")}>
                  <div className={cx("review-header")}>
                    <strong>{review.patient_id?.name || "Ẩn danh"}</strong>
                    <span className={cx("stars")}>
                      {[...Array(5)].map((_, i) => (
                        <FontAwesomeIcon
                          key={i}
                          icon={faStar}
                          className={cx({ filled: i < review.rating })}
                        />
                      ))}
                    </span>
                  </div>
                  <p className={cx("review-comment")}>{review.comment}</p>
                  <p className={cx("review-date")}>
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDoctor;
