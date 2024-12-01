import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const SavedItemsPage = ({ savedItems, onRemove }) => (
  <Container className="my-5">
    <h2 className="text-center mb-4">Elementi Salvati</h2>
    <Row>
      {savedItems.map((item) => (
        <Col key={item.id} md={6} lg={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>{item.title}</Card.Title>
              <Card.Text>{item.description}</Card.Text>
              <Button variant="danger" onClick={() => onRemove(item.id)}>
                Rimuovi
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </Container>
);

export default SavedItemsPage;
