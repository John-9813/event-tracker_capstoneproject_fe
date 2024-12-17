import React from "react";
import { Row, Col, Card, Button } from "react-bootstrap";

const NewsSection = ({ news, onSave }) => {
  if (!news || news.length === 0) {
    return <div>Nessuna notizia disponibile.</div>;
  }

  return (
    <Row>
      {news.map((article) => (
        <Col key={article.id} md={4} className="mb-4">
          <Card className="shadow-sm">
            <Card.Img
              variant="top"
              src={article.imageUrl || "https://via.placeholder.com/400x200"}
              alt={article.title || "Immagine notizia"}
            />
            <Card.Body>
              <Card.Title>{article.title}</Card.Title>
              <Card.Text>{article.description || "Descrizione non disponibile"}</Card.Text>
              <Card.Text><small>{article.publishedDate}</small></Card.Text>
              <Card.Text><strong>{article.source}</strong></Card.Text>
              <Button
                variant="outline-primary"
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Leggi di più
              </Button>
              <Button
                variant="outline-secondary"
                className="ms-2"
                onClick={() => onSave({ ...article, type: "news" })}
              >
                Salva
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default NewsSection;