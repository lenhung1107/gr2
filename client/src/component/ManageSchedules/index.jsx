// DoctorScheduleCalendar.jsx
import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import viLocale from '@fullcalendar/core/locales/vi';
import './calendar.css';

const ManageSchedules = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/schedule/getworkHourofDoctor/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        const formattedEvents = data.map((item) => ({
          title: `${item.time} - ${item.status}`,
          date: item.date,
          allDay: true
        }));
        setEvents(formattedEvents);
      })
      .catch((err) => console.error('Lỗi lấy lịch làm việc:', err));
  }, [userId]);

  return (
    <div className="content">
      <h2 className="">Lịch làm việc của bác sĩ</h2>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        height="auto"
        locale={{
          ...viLocale,
          buttonText: {
            today: 'Hôm nay',
            month: 'Tháng',
            week: 'Tuần',
            day: 'Ngày',
            list: 'Lịch'
          }
        }}
        headerToolbar={{
          left: 'title',
          center: '',
          right: 'prev,next today',
        }}
        titleFormat={(date) => {
          const month = date.date.marker.toLocaleString('vi-VN', { month: 'long' });
          const year = date.date.marker.getFullYear();
          const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);
          return `${capitalizedMonth} năm ${year}`;
        }}
        dayMaxEventRows={3}
      />
    </div>
  );
};

export default ManageSchedules;
