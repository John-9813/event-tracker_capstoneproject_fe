import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";

const EventFilterBar = ({ onFilter }) => {
  const handleInputChange = (filterType, value) => {
    onFilter(filterType, value);
  };

const handleCityChange = (city) => {
    onFilter("location", city);
  };

  return (
    <Row className="align-items-center bg-light p-3 rounded mb-4 shadow-sm">
      {/* Input di ricerca libera */}
      <Col md={3}>
        <Form.Control
          type="text"
          placeholder="Trova evento"
          onChange={(e) => handleInputChange("searchText", e.target.value)}
        />
      </Col>

      {/* Dropdown luogo evento */}
      <Col md={3}>
        <Form.Select onChange={(e) => handleInputChange("location", e.target.value)}>
          <option value="">Luogo evento</option>
          <option value="Milano">Milano</option>
          <option value="Roma">Roma</option>
          <option value="Napoli">Napoli</option>
        </Form.Select>
      </Col>

      {/* Dropdown categoria evento */}
      <Col md={3}>
        <Form.Select onChange={(e) => handleInputChange("category", e.target.value)}>
          <option value="">Categoria evento</option>
          <option value="Musica">Musica</option>
          <option value="Arte">Arte</option>
          <option value="Cibo">Cibo</option>
        </Form.Select>
      </Col>

      {/* Pulsante cerca */}
      <Col md={3} className="text-end">
        <Button variant="primary" className="w-100">
          Cerca ora
        </Button>
      </Col>
    </Row>
  );
};

export default EventFilterBar;


