import { useState } from "react";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./HistoryPage.module.scss";
import { faCalendarXmark, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function HistoryPage() {
    const [filter, setFilter] = useState("all");
    const [showPopup, setShowPopup] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const appointments = [
        { id: 1, date: "2025-03-10", doctor: "BS. Nguyễn Văn A", status: "Đang chờ khám" },
        { id: 2, date: "2025-03-15", doctor: "BS. Trần Thị B", status: "Đã khám" },
        { id: 3, date: "2025-03-20", doctor: "BS. Lê Văn C", status: "Đã hủy" },
    ];
    const handleCancelClick = (appointment) => {
        setSelectedAppointment(appointment);
        setShowPopup(true);
    };
    const confirmCancel = () => {
        alert(`Bạn đã hủy lịch hẹn với ${selectedAppointment.doctor} vào ngày ${selectedAppointment.date}`);
        setShowPopup(false);
    };
    const statusLabels = ["Tất cả", "Đang chờ khám", "Đã khám", "Đã hủy"];

    const filteredAppointments =
        filter === "Tất cả" ? appointments : appointments.filter(app => app.status === filter);

    return (
        <div className={cx("wrapper")}>
            <h2>Lịch sử Đặt Khám</h2>
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
                            <th>Ngày Khám</th>
                            <th>Bác Sĩ / Gói Khám</th>
                            <th>Trạng Thái</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAppointments.map((app, index) => (
                            <tr key={app.id}>
                                <td>{index + 1}</td>
                                <td>{app.date}</td>
                                <td>{app.doctor}</td>
                                <td>{app.status}</td>
                                <td>
                                    {app.status === "Đã khám" && (
                                        <div className={cx('icon', 'view-info')} data-tooltip="Xem chi tiết">
                                            <FontAwesomeIcon icon={faInfoCircle} />
                                        </div>
                                    )}
                                    {app.status === "Đang chờ khám" && (
                                        <div className={cx('icon', 'cancel-icon')} data-tooltip="Hủy lịch hẹn"
                                        onClick={() => handleCancelClick(app)}>
                                            <FontAwesomeIcon icon={faCalendarXmark} />
                                        </div>
                                    )}
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {showPopup && (
                <div className={cx("popup-overlay")}>
                    <div className={cx("popup")}>
                        <p>Bạn có chắc chắn muốn hủy lịch hẹn với <b>{selectedAppointment.doctor}</b> vào ngày <b>{selectedAppointment.date}</b> không?</p>
                        <div className={cx("popup-buttons")}>
                            <button onClick={confirmCancel} className={cx("confirm-btn")}>Xác nhận</button>
                            <button onClick={() => setShowPopup(false)} className={cx("cancel-btn")}>Hủy</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HistoryPage;
