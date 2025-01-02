import classNames from "classnames/bind";
import { useState } from "react";
import styles from "./ManageSchedules.module.scss";
import Hour from "../Hour/Hour";
const cx = classNames.bind(styles);
function ManageSchedules() {
  const hoursData = [
    { hour: '9:00', status: 'inSchedule' }, // Đã có trong giờ làm việc
    { hour: '10:00', status: 'booked' },   // Đã được đặt (vô hiệu hóa)
    { hour: '11:00', status: 'available' },// Chưa được thêm
    { hour: '13:00', status: 'available' },
    { hour: '14:00', status: 'available' },
    { hour: '15:00', status: 'available' },
    { hour: '16:00', status: 'available' },
    { hour: '17:00', status: 'available' },
  ];
  const [selectedHours, setSelectedHours] = useState([]);
  const handleHourClick = (hour) => {
    setSelectedHours((prev) => {
      if (prev.includes(hour)) {
        // Nếu giờ đã được chọn, hủy chọn
        return prev.filter((h) => h !== hour);
      } else {
        // Nếu giờ chưa được chọn, thêm vào danh sách
        return [...prev, hour];
      }
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Giờ đã chọn:", selectedHours);
  };

  return (

    <div className={cx('wrapper')}>
      <h3>Quản Lý Ca Khám Bệnh</h3>
      <form className={cx('filter')} onClick={handleSubmit}>
        <div className={cx('select-date')}>
          <label>Chọn ngày làm việc </label>
          <input type="date" name="fromDate" required />
        </div>
        <div className={cx('select-hour')}>
          {hoursData.map(({ hour, status }) => (
            <Hour
            key={hour}
            hourText={hour}
                      // Vô hiệu hóa giờ đã đặt
            isSelected={selectedHours.includes(hour)} // Hiển thị giờ đang chọn
            isInSchedule={status === 'inSchedule'}    // Hiển thị giờ trong lịch làm việc
            onClick={() => handleHourClick(hour)}      // Xử lý click
            />))}
        </div>
        <button type="submit">Lưu thông tin</button>
      </form>
    </div>);
}

export default ManageSchedules;