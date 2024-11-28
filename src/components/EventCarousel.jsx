import React from "react";
import { Carousel } from "react-bootstrap";

const EventCarousel = ({ events }) => {
  if (!events || events.length === 0) {
    return <div>Nessun evento disponibile.</div>;
  }

  return (
    <Carousel>
      {events.map(event => (
        <Carousel.Item key={event.id}>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/400x200"
            alt={event.title}
          />
          <Carousel.Caption>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default EventCarousel;




