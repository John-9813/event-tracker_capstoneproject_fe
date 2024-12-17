import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { fetchFilteredEvents, fetchEventsFromBackend } from "../../services/TicketmasterService";
import "./EventFilterBar.css";

const EventFilterBar = ({ onFilter }) => {
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFilterChange = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const filters = {
        keyword: searchText?.trim() || "",
        city: city?.trim() || "",
        classificationName: category?.trim() || "",
      };

      console.log("Filtri ricevuti da EventFilterBar:", filters);

      if (!filters.keyword && !filters.city && !filters.classificationName) {
        console.log("Nessun filtro applicato, caricamento eventi iniziali.");
        const events = await fetchEventsFromBackend();
        console.log("Eventi iniziali ricevuti in EventFilterBar:", events);
        onFilter(events);
        return;
      }

      const filteredEvents = await fetchFilteredEvents(filters);
      console.log("Eventi filtrati ricevuti in EventFilterBar:", filteredEvents);
      onFilter(filteredEvents);
    } catch (error) {
      console.error("Errore durante il filtraggio degli eventi:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetFilters = () => {
    setSearchText("");
    setCity("");
    setCategory("");
  };

  return (
    <Form onSubmit={handleFilterChange} className="bg-light p-3 rounded mb-4 shadow-sm">
      <Row className="align-items-center justify-content-around">
        <Col md={3}>
          <Form.Control
            type="text"
            placeholder="Cerca evento"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </Col>
        <Col md={3}>
          <Form.Select value={city} onChange={(e) => setCity(e.target.value)}>
            <option value="">Città</option>
            <option value="Milano">Milano</option>
            <option value="Roma">Roma</option>
            <option value="Napoli">Napoli</option>
            <option value="Firenze">Firenze</option>
          </Form.Select>
        </Col>
        <Col md={3}>
          <Button
            type="submit"
            variant="primary"
            className="w-100"
            disabled={loading}
          >
            {loading ? "Caricamento..." : "Cerca ora"}
          </Button>
          </Col>
          <Col md={3}>
          <Button
            variant="secondary"
            className="w-75"
            onClick={resetFilters}
            disabled={loading}
          >
            Annulla Ricerca
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default EventFilterBar;

