import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";

const NewsFilterBar = ({ onFilter }) => {
    const handleInputChange = (filterType, value) => {
      onFilter(filterType, value);
    };
  
    return (
      <Row className="align-items-center bg-light p-3 rounded mb-4 shadow-sm">
        {/* Input di ricerca libera */}
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Cerca notizia"
            onChange={(e) => handleInputChange("searchText", e.target.value)}
          />
        </Col>
  
        {/* Dropdown categoria notizia */}
        <Col md={4}>
          <Form.Select onChange={(e) => handleInputChange("category", e.target.value)}>
            <option value="">Categoria notizia</option>
            <option value="Politica">Politica</option>
            <option value="Cultura">Cultura</option>
            <option value="Sport">Sport</option>
          </Form.Select>
        </Col>
  
        {/* Pulsante cerca */}
        <Col md={2} className="text-end">
          <Button variant="primary" className="w-100">
            Cerca ora
          </Button>
        </Col>
      </Row>
    );
  };
  
  export default NewsFilterBar;
  