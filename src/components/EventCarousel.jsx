import React from "react";
import { Carousel } from "react-bootstrap";

const EventCarousel = ({ events }) => { 

  const maxItems = 5;
  const limitedEvents = events.slice(0, maxItems);

  if (!events || events.length === 0) {
    return <div>Nessun evento disponibile.</div>;
  }

  return (
    <Carousel className="w-75">
      {limitedEvents.map((event) => (
        <Carousel.Item key={event.id}>
          <img
            className="d-block w-100"
            src={event.imageUrl || "https://via.placeholder.com/400x200"}
            alt={event.title || "Evento"}
          />
          <Carousel.Caption>
            <h3>{event.title}</h3>
            <p>
              <strong>Categoria:</strong> {event.category || "Non specificata"}
              <br />
              <strong>Data:</strong> {event.startDate || "Data non disponibile"}
              <br />
              <strong>Luogo:</strong> {event.location || "Luogo non disponibile"}
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default EventCarousel;





