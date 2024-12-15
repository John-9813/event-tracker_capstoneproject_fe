import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { formatDateToItalian } from '../utils/DateUtils';

const EventCard = ({ event }) => (
  <Card className="shadow-sm">
    <Card.Img
      variant="top"
      src={event.imageUrl || 'https://via.placeholder.com/400x200'}
      alt={event.title || 'Evento'}
    />
    <Card.Body>
      <Card.Title>{event.title}</Card.Title>
      <Card.Text>
        <strong>Categoria:</strong> {event.category || 'Categoria non disponibile'}
      </Card.Text>
      <Card.Text>
        <strong>Data:</strong> {formatDateToItalian(event.startDate) || 'Data non disponibile'}
      </Card.Text>
      <Card.Text>
        <strong>Luogo:</strong> {event.location || 'Luogo non disponibile'}
      </Card.Text>
      <Card.Text>
        <strong>Prezzo:</strong> {event.priceRange || 'Prezzo non disponibile'}
      </Card.Text>
      <Button
        variant="primary"
        href={event.pageUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        Dettagli Evento
      </Button>
    </Card.Body>
  </Card>
);

export default EventCard;
