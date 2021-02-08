import React from 'react'
import FullCalendar from '@fullcalendar/react'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'

const provapagina = () => (
    <FullCalendar
        plugins={[interactionPlugin, timeGridPlugin]}
        initialView='timeGridWeek'
        nowIndicator={true}
        editable={true}
        timeZone="local"
        locale="it"
        initialEvents={[
            { title: 'TAGLIO CAPELLI', start: new Date() }
        ]}
    />
)

export default provapagina;
