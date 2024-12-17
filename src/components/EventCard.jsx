import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";

const EventCard = ({ event, onSave }) => {
  return (
    <Card className="shadow-sm h-100 d-flex flex-column">
      {/* Immagine dell'evento */}
      <Card.Img
        variant="top"
        src={event.imageUrl || "https://via.placeholder.com/400x200"}
        alt={event.title || "Evento"}
      />

      {/* Corpo della card */}
      <Card.Body className="d-flex flex-column justify-content-between">
        {/* Titolo centrato */}
        <Card.Title className="text-center mb-3">{event.title}</Card.Title>

        {/* Dettagli dell'evento allineati a sinistra */}
        <div className="text-start">
          <Card.Text className="m-0">
            <strong>Città:</strong> {event.city || "Città non disponibile"}
          </Card.Text>
          <Card.Text className="m-0">
            <strong>Luogo:</strong> {event.venueName || "Luogo non disponibile"}
          </Card.Text>
          <Card.Text className="m-0">
            <strong>Data:</strong> {event.startDate || "Data non disponibile"}
          </Card.Text>
          <Card.Text className="m-0">
            <strong>Orario:</strong>{" "}
            {event.startTime || "Orario non disponibile"}
          </Card.Text>
          <Card.Text className="m-0">
            <strong>Stato Biglietti:</strong>{" "}
            {event.ticketStatus || "Stato non disponibile"}
          </Card.Text>
        </div>
      </Card.Body>

      {/* Footer con pulsanti ben posizionati */}
      <Card.Footer className="bg-white border-0 mt-auto">
        <Row className="justify-content-between px-2">
          <Col xs="auto">
            <Button
              variant="primary"
              href={event.pageUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Info Acquisto
            </Button>
          </Col>
          <Col xs="auto">
          <Button
          variant="outline-secondary"
          onClick={() => onSave({ ...event, type: "event" })}
        >
          Salva
        </Button>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
};

export default EventCard;
