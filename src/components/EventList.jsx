import React from "react";
import { Row, Col, Card, Button } from "react-bootstrap";

const EventList = ({ events, onSave }) => (
  <Row>
    {events.map((event) => (
      <Col key={event.id} md={6} lg={4} className="mb-4">
        <Card className="shadow-sm">
          <Card.Img
            variant="top"
            src={event.imageUrl || "https://via.placeholder.com/400x200"}
            alt={event.title || "Evento"}
          />
          <Card.Body>
            <Card.Title>{event.title}</Card.Title>
            <Card.Text>
              <strong>Categoria:</strong> {event.category || "Non specificata"}
            </Card.Text>
            <Card.Text>
              <strong>Data:</strong> {event.startDate || "Data non disponibile"}
            </Card.Text>
            <Card.Text>
              <strong>Luogo:</strong> {event.location || "Luogo non disponibile"}
            </Card.Text>
            <Card.Text>
              <strong>Prezzo:</strong>{" "}
              {event.priceRange || "Prezzo non disponibile"}
            </Card.Text>
            <Button
              variant="primary"
              href={event.eventUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Dettagli Evento
            </Button>
          </Card.Body>
        </Card>
      </Col>
    ))}
  </Row>
);

export default EventList;

