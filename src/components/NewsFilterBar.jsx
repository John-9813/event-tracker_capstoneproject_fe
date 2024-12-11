import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";

const NewsFilterBar = ({ onFilter }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onFilter("query", query);
  };

  return (
    <Row className="align-items-center bg-light p-3 rounded mb-4 shadow-sm">
      <Col md={6}>
        <Form.Control
          type="text"
          placeholder="Cerca notizia"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </Col>

      <Col md={2} className="text-end">
        <Button variant="primary" className="w-100" onClick={handleSearch}>
          Cerca ora
        </Button>
      </Col>
    </Row>
  );
};

export default NewsFilterBar;

  