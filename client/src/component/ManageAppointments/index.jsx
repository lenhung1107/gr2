import classNames from "classnames/bind";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarXmark, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import styles from "./ManageAppointments.module.scss";
import useFetchData from "../../CustomHook/useFetchData";
const cx = classNames.bind(styles);
function ManageAppointments() {
    const apiUrl = "https://gr2-hdy0.onrender.com/appointment/getAllAppoinment"; // URL API khác cho từng trang
    const { data, loading, error } = useFetchData(apiUrl);
    const appointments = data || [];

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

    const statusLabels = ["Tất cả", "Đang chờ xác nhận", "Đang chờ khám", "Đã hủy", "Đã khám"];
    console.log("Selected appointment:", selectedAppointment);
    const handleConfirmAppointment = async (appointment) => {
        try {
            const response = await fetch(`https://gr2-hdy0.onrender.com/appointment/confirmByAdmin/${appointment._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const updated = await response.json();
                alert(updated.message);

                window.location.reload();
            } else {
                alert('Xác nhận thất bại');
            }
        } catch (error) {
            alert('Có lỗi xảy ra khi xác nhận');
            console.error(error);
        }

        setShowPopupAgree(false);
    };

    const filteredAppointments = appointments
        .filter(app => app.name !== "Đã xoá" && app.phone !== "Không có" && app.age !== "Không rõ")
        .filter(app => filter === "Tất cả" || app.status === filter);
    if (loading) return <p style={{ color: 'black', fontSize: '1.8rem', fontWeight: '500' }} >Đang tải dữ liệu...</p>;
    if (error) return <p style={{ color: 'red', fontSize: '1.8rem', fontWeight: '500' }}>Lỗi: {error}</p>;
    if (!appointments || appointments.length === 0) return <p style={{ color: 'black', fontSize: '1.8rem', fontWeight: '500' }}>Không có cuộc hẹn nào.</p>;

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
                            <tr key={app._id}>
                                <td>{index + 1}</td>
                                <td>{app.name}</td>
                                <td>{app.phone}</td>
                                <td>{app.age}</td>
                                <td>{new Date(app.date).toLocaleDateString('vi-VN')}</td>
                                <td>{app.hour}</td>
                                <td>{app.service}</td>
                                <td>{app.symptoms}</td>
                                <td>{app.status}</td>
                                <td>
                                    {app.status === "Đang chờ khám" && (
                                        <></>
                                    )}
                                    {app.status === "Đang chờ xác nhận" && (
                                        <div className={cx('icon')}>
                                            <div className={cx('tooltip')} onClick={() => handleAgreeClick(app)}>
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
            {showPopupAgree && selectedAppointment && (
                <div className={cx("popup-overlay")}>
                    <div className={cx("popup")}>
                        <p>Bạn có chắc chắn muốn xác nhận cuộc hẹn này không?</p>
                        <div className={cx("popup-buttons")}>
                            <button onClick={() => handleConfirmAppointment(selectedAppointment)} className={cx("confirm-btn")}>Xác nhận</button>
                            <button onClick={() => setShowPopupAgree(false)} className={cx("cancel-btn")}>Hủy</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ManageAppointments;