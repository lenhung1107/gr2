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

    useEffect(() => {
        const fetchSchedules = async () => {
            if (!userId) return;
    
            try {
                const res = await fetch(`http://localhost:3000/schedule/schedulesGetByUserID/${userId}`);
                const data = await res.json();
                setWorkSchedules(data);
            } catch (err) {
                console.error("Lỗi khi tải lịch làm việc:", err);
            }
        };
    
        fetchSchedules();
    }, [userId]);
    useEffect(() => {
        if (selectedDate && workSchedules[selectedDate]) {
            setSelectedHours(workSchedules[selectedDate]); // Lấy giờ từ database
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

        const newWorkSchedules = {
            ...workSchedules,
            [selectedDate]: selectedHours,
        };
        setWorkSchedules(newWorkSchedules);

        try {
            const response = await fetch("http://localhost:3000/schedule/registerSchedule", {
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
            alert("Không thể gửi dữ liệu!");
        }
    };
    return (
        <div className={cx("wrapper")}>
            <h3>Quản Lý Ca Khám Bệnh</h3>
            <form className={cx("filter")} onSubmit={handleSubmit}>
                <div className={cx("select-date")}>
                    <label>Chọn ngày làm việc</label>
                    <input type="date" name="workDate" required onChange={(e) => setSelectedDate(e.target.value)} />
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
                <button type="submit">Lưu thông tin</button>
            </form>

            <div className={cx("schedule-list")}>
                <h4>Lịch làm việc của bác sĩ</h4>
                <ul>
                    {Object.entries(workSchedules).map(([date, hours]) => (
                        <li key={date}>
                            <strong>Ngày: {date}</strong> - Giờ: {hours.join(", ") || "Không có ca làm việc"}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Register_schedules;