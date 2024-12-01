import React from "react";
import { Row, Col, Card, Button } from "react-bootstrap";

const NewsSection = ({ news, onSave }) => {
  if (!news || news.length === 0) {
    return <div>Nessuna notizia disponibile.</div>;
  }

  return (
    <Row>
      {news.map(article => (
        <Col key={article.id} md={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>{article.title}</Card.Title>
              <Card.Text>{article.description}</Card.Text>
              <Button
                variant="outline-primary"
                onClick={() => onSave({ ...article, type: "news" })}>Salva
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default NewsSection;

  