import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const SavedItemsPage = ({ savedItems, onRemove }) => {
  const savedEvents = savedItems.filter((item) => item.type === "event");
  const savedNews = savedItems.filter((item) => item.type === "news");

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Elementi Salvati</h2>

      {/* Eventi Salvati */}
      <h4 className="mb-3">Eventi Salvati</h4>
      <Row>
        {savedEvents.map((event) => (
          <Col key={event.id} md={6} lg={4} className="mb-4">
            <Card className="shadow-sm h-100 d-flex flex-column justify-content-between">
              <Card.Img
                variant="top"
                src={event.imageUrl || "https://via.placeholder.com/400x200"}
                alt={event.title}
              />
              <Card.Body>
                <Card.Title>{event.title}</Card.Title>
                <Card.Text>
                  <strong>Città:</strong> {event.city} <br />
                  <strong>Data:</strong> {event.startDate} <br />
                  <strong>Orario:</strong> {event.startTime}
                </Card.Text>
              </Card.Body>
              <Card.Footer className="d-flex justify-content-between">
                <Button
                  variant="primary"
                  href={event.pageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Info Acquisto
                </Button>
                <Button variant="danger" onClick={() => onRemove(event.id)}>
                  Rimuovi
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Notizie Salvate */}
      <h4 className="mb-3 mt-4">Notizie Salvate</h4>
      <Row>
        {savedNews.map((news) => (
          <Col key={news.id} md={6} lg={4} className="mb-4">
            <Card className="shadow-sm h-100 d-flex flex-column justify-content-between">
              <Card.Img
                variant="top"
                src={news.imageUrl || "https://via.placeholder.com/400x200"}
                alt={news.title}
              />
              <Card.Body>
                <Card.Title>{news.title}</Card.Title>
              </Card.Body>
              <Card.Footer className="d-flex justify-content-between">
                <Button
                  variant="primary"
                  href={news.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Leggi di più
                </Button>
                <Button variant="danger" onClick={() => onRemove(news.id)}>
                  Rimuovi
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default SavedItemsPage;


