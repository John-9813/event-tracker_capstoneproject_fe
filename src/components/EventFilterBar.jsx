import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { fetchFilteredEvents, fetchEventsFromBackend } from "../services/TicketmasterService";

const EventFilterBar = ({ onFilter }) => {
  const [city, setCity] = useState("Milano");
  const [category, setCategory] = useState("");
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  let debounceTimeout;

  const handleFilterChange = async () => {
    setLoading(true);
  
    try {
      if (!searchText && !city && !category) {
        console.log("Nessun filtro applicato, carico tutti gli eventi.");
        const events = await fetchEventsFromBackend();
        onFilter(events);
        return;
      }
  
      console.log("Filtri applicati:", { searchText, city, category });
      const filteredEvents = await fetchFilteredEvents({
        keyword: searchText || "",
        city: city || "",
        category: category || "",
      });
      console.log("Eventi filtrati ricevuti:", filteredEvents);
      onFilter(filteredEvents);
    } catch (error) {
      console.error("Errore durante il filtraggio degli eventi:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const resetFilters = () => {
    setSearchText("");
    setCity("Milano");
    setCategory("");
    onFilter({ searchText: "", city: "", category: "" });
  };

  return (
    <Row className="align-items-center bg-light p-3 rounded mb-4 shadow-sm">
      <Col md={3}>
        {/* Input per la ricerca per testo */}
        <Form.Control
          type="text"
          placeholder="Cerca evento"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </Col>
      <Col md={3}>
        {/* Dropdown per la ricerca per città */}
        <Form.Select value={city} onChange={(e) => setCity(e.target.value)}>
          <option value="Milano">Milano</option>
          <option value="Roma">Roma</option>
          <option value="Napoli">Napoli</option>
          <option value="Firenze">Firenze</option>
        </Form.Select>
      </Col>
      <Col md={3}>
        {/* Dropdown per la ricerca per categoria */}
        <Form.Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Categoria evento</option>
          <option value="concert">Concerto</option>
          <option value="theater">Teatro</option>
          <option value="attraction">Attrazione</option>
          <option value="music">Musica</option>
          <option value="art">Arte</option>
          <option value="sports">Sport</option>
        </Form.Select>
      </Col>
      <Col md={3} className="text-end">
        {/* Bottone per eseguire la ricerca */}
        <Button
          variant="primary"
          className="w-100"
          onClick={handleFilterChange}
        >
          Cerca ora
        </Button>
        <Button
          variant="secondary"
          className="w-100 mt-2"
          onClick={() => {
            setCity("Milano");
            setCategory("");
            setSearchText("");
            onFilter({ searchText: "", city: "Milano", category: "" });
          }}
        >
          Annulla Ricerca
        </Button>
      </Col>
    </Row>
  );
};

export default EventFilterBar;
