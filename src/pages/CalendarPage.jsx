import React, { useState } from "react";
import Calendar from "react-calendar";
import { Container } from "react-bootstrap";

const CalendarPage = ({ savedEvents }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getFormattedDate = (date) => {
    const offset = date.getTimezoneOffset();
    const adjustedDate = new Date(date.getTime() - offset * 60 * 1000);
    return adjustedDate.toISOString().split("T")[0];
  };
  
  const eventsForDate = savedEvents.filter(
    (event) => event.date === getFormattedDate(selectedDate)
  );
  

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Calendario Personale</h2>
      <Calendar value={selectedDate} onChange={setSelectedDate} />
      <div className="mt-4">
        <h4>Eventi per la data selezionata:</h4>
        {eventsForDate.length > 0 ? (
          <ul>
            {eventsForDate.map((event) => (
              <li key={event.id}>{event.title}</li>
            ))}
          </ul>
        ) : (
          <p>Nessun evento per questa data.</p>
        )}
      </div>
    </Container>
  );
};

export default CalendarPage;

