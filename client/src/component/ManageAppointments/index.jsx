import classNames from "classnames/bind";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarXmark, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import styles from "./ManageAppointments.module.scss";
const cx = classNames.bind(styles);
const appointments = [
    {
        name: " Le Thi Han",
        phone: "0938592495",
        age: "35",
        date: "2025-03-10",
        hour: "10:00",
        doctor: "BS. Nguyễn Văn A",
        status: "Đã xác nhận",
        reason: "Khám tổng quát",
    },
    {
        name: " Le Thi Han",
        phone: "0938592495",
        age: "35",
        date: "2025-03-10",
        hour: "10:00",
        doctor: "BS. Nguyễn Văn A",
        status: "Đang chờ xác nhận",
        reason: "Khám tổng quát",
    },
    {
        name: " Le Thi Han",
        phone: "0938592495",
        age: "35",
        date: "2025-03-10",
        hour: "10:00",
        doctor: "BS. Nguyễn Văn A",
        status: "Đang chờ xác nhận",
        reason: "Khám tổng quát",
    },
];
function ManageAppointments() {
    const [filter, setFilter] = useState("Tất cả");
    const [showPopupCancel, setShowPopupCancel] = useState(false);
    const [showPopupAgree, setShowPopupAgree] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    const handleCancelClick = (appointment) => {
        setSelectedAppointment(appointment);
        setShowPopupCancel(true);
    };
    const confirmCancel = () => {
        alert(`Bạn đã hủy lịch hẹn với ${selectedAppointment.doctor} vào ngày ${selectedAppointment.date}`);
        setShowPopupCancel(false);
    };
     const handleAgreeClick = (appointment) => {
        setSelectedAppointment(appointment);
        setShowPopupAgree(true);
    };
    const confirmAgree = () => {
        alert(`Bạn đã hủy lịch hẹn với ${selectedAppointment.doctor} vào ngày ${selectedAppointment.date}`);
        setShowPopupCancel(false);
    };
    const statusLabels = ["Tất cả", "Đang chờ xác nhận", "Đã xác nhận", "Đã hủy"];
    const filteredAppointments =
        filter === "Tất cả" ? appointments : appointments.filter(app => app.status === filter);
    return (
        <div className={cx("wrapper")}>
            <h2>Thông tin các cuộc hẹn đặt khám</h2>
            <div className={cx("container")}>
                <div className={cx("filters")}>
                    {statusLabels.map(label => (
                        <button
                            key={label}
                            className={cx({ active: filter === label })}
                            onClick={() => setFilter(label)}
                        >
                            {label}
                        </button>
                    ))}
                </div>
                <table className={cx("table")}>
                    <thead>
                        <tr>
                            <th>Số Thứ Tự</th>
                            <th>Họ tên bệnh nhân</th>
                            <th>Số điện thoại</th>
                            <th>Tuổi</th>
                            <th>Ngày Khám</th>
                            <th>Giờ Khám</th>
                            <th>Bác Sĩ / Gói Khám</th>
                            <th>Lí do đặt khám</th>
                            <th>Trạng Thái</th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAppointments.map((app, index) => (
                            <tr key={app.id}>
                                <td>{index + 1}</td>
                                <td>{app.name}</td>
                                <td>{app.phone}</td>
                                <td>{app.age}</td>
                                <td>{app.date}</td>
                                <td>{app.hour}</td>
                                <td>{app.doctor}</td>
                                <td>{app.reason}</td>
                                <td>{app.status}</td>
                                <td>
                                    {app.status === "Đã xác nhận" && (
                                        <></>
                                    )}
                                    {app.status === "Đang chờ xác nhận" && (
                                        <div className={cx('icon')}>
                                            <div className={cx('tooltip')} onClick={()=> handleAgreeClick(app)}>
                                                <FontAwesomeIcon icon={faCircleCheck} className={cx('check-icon')} />
                                                <span className={cx('tooltip-text')}>Xác nhận lịch hẹn</span>
                                            </div>
                                            <div className={cx('tooltip')} onClick={() => handleCancelClick(app)}>
                                                <FontAwesomeIcon icon={faCalendarXmark} className={cx('cancel-icon')} />
                                                <span className={cx('tooltip-text')}>Hủy lịch hẹn</span>
                                            </div>
                                        </div>
                                    )}

                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {showPopupCancel && (
                <div className={cx("popup-overlay")}>
                    <div className={cx("popup")}>
                        <p>Bạn có chắc chắn muốn hủy cuộc hẹn khám này không?</p>
                        <div className={cx('reason')}>
                            <label htmlFor="reason">Lý do hủy cuộc hẹn:</label>
                            <input type="text" id="reason" name="reason" required />
                        </div>
                        <div className={cx("popup-buttons")}>
                            <button onClick={confirmCancel} className={cx("confirm-btn")}>Xác nhận</button>
                            <button onClick={() => setShowPopupCancel(false)} className={cx("cancel-btn")}>Hủy</button>
                        </div>
                    </div>
                </div>
            )}
            {showPopupAgree && (
                <div className={cx("popup-overlay")}>
                    <div className={cx("popup")}>
                        <p>Bạn có chắc chắn muốn xác nhận cuộc hẹn này không?</p>
                        <div className={cx("popup-buttons")}>
                            <button onClick={confirmAgree} className={cx("confirm-btn")}>Xác nhận</button>
                            <button onClick={() => setShowPopupAgree(false)} className={cx("cancel-btn")}>Hủy</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ManageAppointments;