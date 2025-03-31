import { useState, useEffect } from "react";
import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import "./scheduleOverride.css";

import '@schedule-x/theme-default/dist/index.css'


function ManageSchedules() {
  const eventsService = useState(() => createEventsServicePlugin())[0]
 
  const calendar = useCalendarApp({
    views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
    events: [
      {
        id: '1',
        title: 'Event 1',
        start: '2025-03-28 08:00',
        end: '2025-03-28 09:00',
        description: 'Kỳ thi Fundamental IT Engineer Examination tại Hà Nội.',
      },
    ],
    plugins: [eventsService]
  })

  useEffect(() => {
    // get all events
    eventsService.getAll()
  }, [])
  

  return (
    <div>
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  );
}

export default ManageSchedules;
