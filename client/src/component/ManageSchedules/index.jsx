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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://gr2-3t8u.onrender.com/schedule/getworkHourofDoctor/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        const formattedEvents = data.map((item) => ({
          title: `${item.time} - ${item.status}`,
          date: item.date,
          allDay: true,
          classNames: [`event-${item.status?.toLowerCase().replace(/\s+/g, '-')}`]
        }));
        setEvents(formattedEvents);
      })
      .catch((err) => console.error('Lỗi lấy lịch làm việc:', err))
      .finally(() => setLoading(false));
  }, [userId]);

  return (
    <div className="schedule-container">
      <div className="schedule-header">
        <h2 className="schedule-title">
          <span className="title-icon">📅</span>
          Lịch làm việc của bác sĩ
        </h2>
        <div className="title-underline"></div>
      </div>
      
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Đang tải lịch làm việc...</p>
        </div>
      ) : (
        <div className="calendar-wrapper">
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
            aspectRatio={1.8}
            eventDisplay="block"
          />
        </div>
      )}
    </div>
  );
};

export default ManageSchedules;