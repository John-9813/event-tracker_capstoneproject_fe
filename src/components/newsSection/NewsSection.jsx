import React from "react";
import { Row, Col, Card, Button } from "react-bootstrap";

import "./NewsSection.css";

const NewsSection = ({ news, onSave }) => {
  if (!news || news.length === 0) {
    return <div>Nessuna notizia disponibile.</div>;
  }

  return (
    <Row>
      {news.map((article) => (
        <Col key={article.id} md={4} className="mb-4">
          <Card className="h-100 d-flex flex-column shadow-sm">
            <Card.Img
              variant="top"
              src={article.imageUrl || "https://via.placeholder.com/400x200"}
              alt={article.title || "Immagine notizia"}
            />
            <Card.Body className="d-flex flex-column justify-content-between">
              <div>
                <Card.Title>{article.title}</Card.Title>
                <Card.Text>
                  <small>{article.publishedDate}</small>
                </Card.Text>
                <Card.Text>
                  <strong>{article.source}</strong>
                </Card.Text>
              </div>
              <div className="d-flex justify-content-between mt-2">
                <Button
                  variant="outline-primary"
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Leggi di più
                </Button>
                <Button
                  variant="outline-success"
                  onClick={() => onSave({ ...article, type: "news" })}
                >
                  Salva
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default NewsSection;
