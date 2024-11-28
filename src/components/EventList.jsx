import React from "react";
import { Row, Col, Card, Button } from "react-bootstrap";

const EventList = ({ events, onSave }) => {
  if (!events || events.length === 0) {
    return <div>Nessun evento trovato.</div>;
  }

  return (
    <Row>
      {events.map(event => (
        <Col key={event.id} md={4} className="mb-4">
          <Card>
            <Card.Img variant="top" src="https://via.placeholder.com/400x200" />
            <Card.Body>
              <Card.Title>{event.title}</Card.Title>
              <Card.Text>{event.description}</Card.Text>
              <Button variant="primary" onClick={() => onSave(event)}>Salva</Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default EventList;

