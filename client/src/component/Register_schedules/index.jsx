import classNames from "classnames/bind";
import { useState, useEffect } from "react";
import styles from "./Register_schedules.module.scss";
import Hour from "../Hour/Hour";

const cx = classNames.bind(styles);

// Danh sách giờ cố định
const hoursData = [
    { hour: "8:00" },
    { hour: "9:00" },
    { hour: "10:00" },
    { hour: "11:00" },
    { hour: "13:00" },
    { hour: "14:00" },
    { hour: "15:00" },
    { hour: "16:00" },
    { hour: "17:00" },
];

function Register_schedules() {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?._id;

    const [selectedDate, setSelectedDate] = useState(""); 
    const [selectedHours, setSelectedHours] = useState([]); 
    const [workSchedules, setWorkSchedules] = useState({}); 
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchSchedules = async () => {
            if (!userId) return;
    
            try {
                setIsLoading(true);
                const res = await fetch(`https://gr2-3t8u.onrender.com/schedule/schedulesGetByUserID/${userId}`);
                const data = await res.json();
                setWorkSchedules(data);
            } catch (err) {
                console.error("Lỗi khi tải lịch làm việc:", err);
                alert("Không thể tải lịch làm việc. Vui lòng thử lại!");
            } finally {
                setIsLoading(false);
            }
        };
    
        fetchSchedules();
    }, [userId]);

    useEffect(() => {
        if (selectedDate && workSchedules[selectedDate]) {
            setSelectedHours(workSchedules[selectedDate]);
        } else {
            setSelectedHours([]); 
        }
    }, [selectedDate, workSchedules]);

    const handleHourClick = (hour) => {
        setSelectedHours((prev) =>
            prev.includes(hour) ? prev.filter((h) => h !== hour) : [...prev, hour]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedDate) {
            alert("Vui lòng chọn ngày!");
            return;
        }

        if (selectedHours.length === 0) {
            alert("Vui lòng chọn ít nhất một ca làm việc!");
            return;
        }

        const newWorkSchedules = {
            ...workSchedules,
            [selectedDate]: selectedHours,
        };
        setWorkSchedules(newWorkSchedules);

        try {
            setIsLoading(true);
            const response = await fetch("https://gr2-3t8u.onrender.com/schedule/registerSchedule", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: userId,
                    schedules: {
                        [selectedDate]: selectedHours,
                    },
                }),
            });

            const text = await response.text(); 
            console.log("==> Raw response:", response.status, text);

            if (response.ok) {
                alert("Lịch làm việc đã được lưu vào hệ thống!");
            } else {
                alert("Lỗi từ server: " + text);
            }
        } catch (err) {
            console.error("Lỗi gửi request:", err);
            alert("Không thể gửi dữ liệu! Vui lòng kiểm tra kết nối mạng.");
        } finally {
            setIsLoading(false);
        }
    };

    // Hàm format ngày cho hiển thị đẹp hơn
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Hàm sắp xếp lịch làm việc theo ngày
    const sortedSchedules = Object.entries(workSchedules).sort(([dateA], [dateB]) => {
        return new Date(dateA) - new Date(dateB);
    });

    return (
        <div className={cx("wrapper")}>
            <h3>Quản Lý Ca Khám Bệnh</h3>
            
            {isLoading && (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                    <p>Đang tải dữ liệu...</p>
                </div>
            )}

            <form className={cx("filter")} onSubmit={handleSubmit}>
                <div className={cx("select-date")}>
                    <label htmlFor="workDate">Chọn ngày làm việc</label>
                    <input 
                        type="date" 
                        id="workDate"
                        name="workDate" 
                        required 
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]} // Không cho chọn ngày quá khứ
                    />
                </div>

                <div className={cx("select-hour")}>
                    {hoursData.map(({ hour }) => (
                        <Hour
                            key={hour}
                            hourText={hour}
                            isSelected={selectedHours.includes(hour)}
                            onClick={() => handleHourClick(hour)}
                        />
                    ))}
                </div>

                <button 
                    type="submit" 
                    disabled={isLoading || !selectedDate}
                    style={{ 
                        opacity: isLoading || !selectedDate ? 0.6 : 1,
                        cursor: isLoading || !selectedDate ? 'not-allowed' : 'pointer'
                    }}
                >
                    {isLoading ? 'Đang lưu...' : 'Lưu thông tin'}
                </button>
            </form>

            <div className={cx("schedule-list")}>
                <h4>Lịch làm việc của bác sĩ</h4>
                {sortedSchedules.length > 0 ? (
                    <ul>
                        {sortedSchedules.map(([date, hours]) => (
                            <li key={date}>
                                <strong>{formatDate(date)}</strong>
                                <br />
                                <span>Ca làm việc: {hours.length > 0 ? hours.join(", ") : "Không có ca làm việc"}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p style={{ textAlign: 'center', fontStyle: 'italic', color: '#666' }}>
                        Chưa có lịch làm việc nào được đăng ký
                    </p>
                )}
            </div>
        </div>
    );
}

export default Register_schedules;