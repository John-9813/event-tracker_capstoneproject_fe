import React from "react";
import { Card, Button } from "react-bootstrap";
import { formatDateToItalian } from "../utils/DateUtils";

const EventCard = ({ event }) => (
  <Card className="shadow-sm h-100">
    <Card.Img
      variant="top"
      src={event.imageUrl || "https://via.placeholder.com/400x200"}
      alt={event.title || "Evento"}
    />
    <Card.Body>
      <Card.Title>{event.title}</Card.Title>
      <Card.Text>
        <strong>Città:</strong> {event.city || "Città non disponibile"}
      </Card.Text>
      <Card.Text>
        <strong>Luogo:</strong> {event.venueName || "Luogo non disponibile"}
      </Card.Text>
      <Card.Text>
        <strong>Data:</strong> {event.startDate || "Data non disponibile"}
      </Card.Text>
      <Card.Text>
        <strong>Orario:</strong> {event.startTime || "Orario non disponibile"}
      </Card.Text>
      <Card.Text>
        <strong>Stato Biglietti:</strong>{" "}
        {event.ticketStatus || "Stato non disponibile"}
      </Card.Text>

      <Button
        variant="primary"
        href={event.pageUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        Info Acquisto
      </Button>
    </Card.Body>
  </Card>
);

export default EventCard;
