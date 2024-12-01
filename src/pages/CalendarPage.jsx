import React, { useState } from "react";
import Calendar from "react-calendar";
import { Container } from "react-bootstrap";

const CalendarPage = ({ savedEvents }) => {
  const [date, setDate] = useState(new Date());

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Calendario Personale</h2>
      <Calendar value={date} onChange={setDate} />
      <div className="mt-4">
        <h4>Eventi in questa data:</h4>
        <ul>
          {savedEvents
            .filter((event) => event.date === date.toISOString().split("T")[0])
            .map((event) => (
              <li key={event.id}>{event.title}</li>
            ))}
        </ul>
      </div>
    </Container>
  );
};

export default CalendarPage;
