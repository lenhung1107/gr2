import { useState } from "react";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./HistoryPage.module.scss";
import { faCalendarXmark, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import AppoinmentDetail from "../../component/AppoinmentDetail";

const cx = classNames.bind(styles);
const appointments = [
    { 
        date: "2025-03-10", 
        hour:"10:00",
        doctor: "BS. Nguyễn Văn A", 
        status: "Đang chờ khám",
        reason: "Khám tổng quát",
        medicine: ["Thuốc A", "Thuốc B"],
        notes: "Uống thuốc đúng giờ",
        invoiceViewLink: "#",
        invoiceDownloadLink: "#"
    },
    { 
        date: "2025-03-15", 
        hour:"10:00",
        doctor: "BS. Trần Thị B", 
        status: "Đã khám",
        reason: "Khám tai mũi họng",
        medicine: ["Thuốc X", "Thuốc Y"],
        notes: "Tránh tiếp xúc khói bụi",
        invoiceViewLink: "#",
        invoiceDownloadLink: "#"
    },
    { 
        date: "2025-03-20", 
        hour:"10:00",
        doctor: "BS. Lê Văn C", 
        status: "Đã hủy",
        reason: "Khám nội soi",
        medicine: [],
        notes: "",
        invoiceViewLink: "#",
        invoiceDownloadLink: "#"
    },
    { 
        date: "2025-03-20", 
        hour:"10:00",
        doctor: "BS. Lê Văn C", 
        status: "Đang chờ xác nhận",
        reason: "Khám nội soi",
        medicine: [],
        notes: "",
        invoiceViewLink: "#",
        invoiceDownloadLink: "#"
    },
];

function HistoryPage() {
    const [filter, setFilter] = useState("Tất cả");
    const [showPopupCancel, setShowPopupCancel] = useState(false);
    const [showPopupView, setShowPopupView] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    
    const handleCancelClick = (appointment) => {
        setSelectedAppointment(appointment);
        setShowPopupCancel(true);
    };
    const confirmCancel = () => {
        alert(`Bạn đã hủy lịch hẹn với ${selectedAppointment.doctor} vào ngày ${selectedAppointment.date}`);
        setShowPopupCancel(false);
    };
    const handleViewClick = (appointment) => {
        setSelectedAppointment(appointment);
        setShowPopupView(true);
    };
    const statusLabels = ["Tất cả","Đang chờ xác nhận", "Đang chờ khám", "Đã khám", "Đã hủy"];

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
                            <th>Giờ Khám</th>
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
                                <td>{app.hour}</td>
                                <td>{app.doctor}</td>
                                <td>{app.status}</td>
                                <td>
                                    {app.status === "Đã khám" && (
                                        <div className={cx('icon', 'view-info')} data-tooltip="Xem chi tiết"
                                        onClick={() => handleViewClick(app)}>
                                            <FontAwesomeIcon icon={faInfoCircle} />
                                        </div>
                                    )}
                                    {app.status === "Đang chờ xác nhận" && (
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
            {showPopupCancel && (
                <div className={cx("popup-overlay")}>
                    <div className={cx("popup")}>
                        <p>Bạn có chắc chắn muốn hủy lịch hẹn với <b>{selectedAppointment.doctor}</b> vào ngày <b>{selectedAppointment.date}</b> không?</p>
                        <div className={cx("popup-buttons")}>
                            <button onClick={confirmCancel} className={cx("confirm-btn")}>Xác nhận</button>
                            <button onClick={() => setShowPopupCancel(false)} className={cx("cancel-btn")}>Hủy</button>
                        </div>
                    </div>
                </div>
            )}
            {showPopupView && (
                <div className={cx("popup-overlay")} >
                    <div className={cx("popup-content")}>
                        <button className={cx("close-btn")} onClick={() => setShowPopupView(false)}>×</button>
                        <AppoinmentDetail historyData={[selectedAppointment]} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default HistoryPage;
