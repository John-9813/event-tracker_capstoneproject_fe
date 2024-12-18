import React from "react";
import { Row, Col } from "react-bootstrap";
import EventCard from "../eventCard/EventCard";
import "./EventList.css";

const EventList = ({ events, onSave }) => {
  console.log("Eventi ricevuti da EventList:", events);

  return (
    <Row>
      {events.map((event) => (
        <Col key={event.id} md={6} lg={4} className="mb-4">
          <EventCard event={event} onSave={onSave} />
        </Col>
      ))}
    </Row>
  );
};

export default EventList;

