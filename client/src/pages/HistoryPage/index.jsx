import { useState } from "react";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./HistoryPage.module.scss";
import {
  faCalendarXmark,
  faInfoCircle,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import AppoinmentDetail from "../../component/AppoinmentDetail";
import useFetchData from "../../CustomHook/useFetchData";
const cx = classNames.bind(styles);
function HistoryPage() {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;
  const apiUrl = `https://gr2-3t8u.onrender.com/appointment/getAppoinmentByUserId/${userId}`; // URL API khác cho từng trang
  const { data: appointments, loading, error } = useFetchData(apiUrl);
  const [filter, setFilter] = useState("Tất cả");
  const [showPopupCancel, setShowPopupCancel] = useState(false);
  const [showPopupView, setShowPopupView] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const handleReviewClick = (appointment) => {
    setSelectedAppointment(appointment);
    setShowReviewPopup(true);
  };
  const handleCancelClick = (appointment) => {
    setSelectedAppointment(appointment);
    setShowPopupCancel(true);
  };
  const submitReview = async () => {
    try {
      const payload = {
      appointment_id: selectedAppointment._id,
      patient_id: selectedAppointment.patient_id,
      rating,
      comment: reviewText,
    };

    if (selectedAppointment.doctor_id) {
      payload.doctor_id = selectedAppointment.doctor_id;
    } else if (selectedAppointment.pack_id) {
      payload.pack_id = selectedAppointment.pack_id;
    }

    const response = await fetch(
      "https://gr2-3t8u.onrender.com/review/createReviews",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
      const data = await response.json();
      if (response.ok) {
        alert("Đánh giá thành công!");
        setShowReviewPopup(false);
      } else {
        alert(data.message || "Không thể đánh giá");
      }
    } catch (error) {
      alert("Lỗi khi gửi đánh giá: " + error.message);
    }
  };
  const confirmCancel = async () => {
    try {
      const response = await fetch(
        `https://gr2-3t8u.onrender.com/appointment/cancelAppointment/${selectedAppointment._id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        alert("Đã hủy lịch hẹn thành công!");
        setShowPopupCancel(false);
        window.location.reload(); // hoặc cập nhật lại state nếu muốn mượt hơn
      } else {
        const err = await response.json();
        alert("Hủy không thành công: " + err.message);
      }
    } catch (error) {
      console.error("Lỗi khi hủy:", error);
      alert("Đã xảy ra lỗi khi hủy lịch hẹn.");
    }
  };

  const handleViewClick = (appointment) => {
    setSelectedAppointment(appointment);
    setShowPopupView(true);
  };
  const statusLabels = [
    "Tất cả",
    "Đang chờ xác nhận",
    "Đang chờ khám",
    "Đã khám",
    "Đã hủy",
  ];

  const filteredAppointments =
    filter === "Tất cả"
      ? appointments
      : appointments.filter((app) => app.status === filter);
  if (loading)
    return (
      <p style={{ color: "black", fontSize: "1.8rem", fontWeight: "500" }}>
        Đang tải dữ liệu...
      </p>
    );
  if (error)
    return (
      <p style={{ color: "red", fontSize: "1.8rem", fontWeight: "500" }}>
        Lỗi: {error}
      </p>
    );
  if (!appointments || appointments.length === 0)
    return (
      <p style={{ color: "black", fontSize: "1.8rem", fontWeight: "500" }}>
        Không có cuộc hẹn nào.
      </p>
    );
  console.log(selectedAppointment);
  return (
    <div className={cx("wrapper")}>
      <h2>Lịch sử Đặt Khám</h2>
      <div className={cx("container")}>
        <div className={cx("filters")}>
          {statusLabels.map((label) => (
            <button
              key={label}
              className={cx({ active: filter === label })}
              onClick={() => setFilter(label)}
            >
              {label}
            </button>
          ))}
        </div>
        <div className={cx("desktop-table")}>
          <table className={cx("table")}>
            <thead>
              <tr>
                <th>Số Thứ Tự</th>
                <th>Tên Bệnh Nhân</th>
                <th>Ngày Khám</th>
                <th>Giờ Khám</th>
                <th>Bác Sĩ / Gói Khám</th>
                <th>Trạng Thái</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((app, index) => (
                <tr key={app.id}>
                  <td>
                    {index + 1}
                    {app.isForSomeone && (
                      <span className={cx("tag")}>Đặt hộ</span>
                    )}
                  </td>
                  <td>{app.name}</td>
                  <td>{new Date(app.date).toLocaleDateString("vi-VN")}</td>
                  <td>{app.hour}</td>
                  <td>{app.service}</td>
                  <td>{app.status}</td>
                  <td>
                    {app.status === "Đã khám" && (
                      <div className={cx("card-icons")}>
                        <div
                          className={cx("icon", "view-info")}
                          data-tooltip="Xem chi tiết"
                          onClick={() => handleViewClick(app)}
                        >
                          <FontAwesomeIcon icon={faInfoCircle} />
                        </div>
                        <div
                          className={cx("icon", "review-icon")}
                          data-tooltip="Đánh giá"
                          onClick={() => handleReviewClick(app)}
                        >
                          <FontAwesomeIcon icon={faStar} />
                        </div>
                      </div>
                    )}
                    {app.status === "Đang chờ xác nhận" && (
                      <div
                        className={cx("icon", "cancel-icon")}
                        data-tooltip="Hủy lịch hẹn"
                        onClick={() => handleCancelClick(app)}
                      >
                        <FontAwesomeIcon icon={faCalendarXmark} />
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={cx("mobile-list")}>
          {filteredAppointments.map((app, index) => (
            <div key={app.id} className={cx("appointment-card")}>
              <div className={cx("row")}>
                <strong>Số thứ tự:</strong> {index + 1}{" "}
                {app.isForSomeone && <span className={cx("tag")}>Đặt hộ</span>}
              </div>
              <div className={cx("row")}>
                <strong>Bệnh nhân:</strong> {app.name}
              </div>
              <div className={cx("row")}>
                <strong>Ngày khám:</strong>{" "}
                {new Date(app.date).toLocaleDateString("vi-VN")}
              </div>
              <div className={cx("row")}>
                <strong>Giờ khám:</strong> {app.hour}
              </div>
              <div className={cx("row")}>
                <strong>Bác sĩ / Gói:</strong> {app.service}
              </div>
              <div className={cx("row")}>
                <strong>Trạng thái:</strong> {app.status}
              </div>
              <div className={cx("card-actions")}>
                {app.status === "Đã khám" && (
                  <div className={cx("card-icons")}>
                    <div
                      className={cx("icon", "view-info")}
                      data-tooltip="Xem chi tiết"
                      onClick={() => handleViewClick(app)}
                    >
                      <FontAwesomeIcon icon={faInfoCircle} />
                    </div>
                    <div
                      className={cx("icon", "review-icon")}
                      data-tooltip="Đánh giá"
                      onClick={() => handleReviewClick(app)}
                    >
                      <FontAwesomeIcon icon={faStar} />
                    </div>
                  </div>
                )}
                {app.status === "Đang chờ xác nhận" && (
                  <div
                    className={cx("icon", "cancel-icon")}
                    data-tooltip="Hủy lịch hẹn"
                    onClick={() => handleCancelClick(app)}
                  >
                    <FontAwesomeIcon icon={faCalendarXmark} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {showPopupCancel && (
        <div className={cx("popup-overlay")}>
          <div className={cx("popup")}>
            <p>
              Bạn có chắc chắn muốn hủy lịch hẹn với{" "}
              <b>{selectedAppointment.doctor}</b> vào ngày{" "}
              <b>
                {new Date(selectedAppointment.date).toLocaleDateString("vi-VN")}
              </b>{" "}
              không?
            </p>
            <div className={cx("popup-buttons")}>
              <button onClick={confirmCancel} className={cx("confirm-btn")}>
                Xác nhận
              </button>
              <button
                onClick={() => setShowPopupCancel(false)}
                className={cx("cancel-btn")}
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
      {showPopupView && (
        <div className={cx("popup-overlay")}>
          <div className={cx("popup-content")}>
            <button
              className={cx("close-btn")}
              onClick={() => setShowPopupView(false)}
            >
              ×
            </button>
            <AppoinmentDetail historyData={selectedAppointment} />
          </div>
        </div>
      )}
      {showReviewPopup && (
        <div className={cx("popup-overlay")}>
          <div className={cx("popup")}>
            <h3>Đánh giá bác sĩ</h3>
            <label>
              Số sao:
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
              >
                {[5, 4, 3, 2, 1].map((num) => (
                  <option key={num} value={num}>
                    {num} sao
                  </option>
                ))}
              </select>
            </label>
            <label>
              Nhận xét:
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                rows={4}
              />
            </label>
            <div className={cx("popup-buttons")}>
              <button onClick={submitReview} className={cx("confirm-btn")}>
                Gửi
              </button>
              <button
                onClick={() => setShowReviewPopup(false)}
                className={cx("cancel-btn")}
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HistoryPage;
