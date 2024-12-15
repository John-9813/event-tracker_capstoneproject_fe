import React from "react";
import { Row, Col } from "react-bootstrap";
import EventCard from "./EventCard";

const EventList = ({ events }) => {
  console.log("Eventi ricevuti da EventList:", events);

  return (
    <Row>
      {events.map((event) => (
        <Col key={event.id} md={6} lg={4} className="mb-4">
          <EventCard event={event} />
        </Col>
      ))}
    </Row>
  );
};

export default EventList;