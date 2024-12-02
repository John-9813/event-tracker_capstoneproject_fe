import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import EventCarousel from "../components/EventCarousel";
import EventList from "../components/EventList";
import NewsSection from "../components/NewsSection";
import EventFilterBar from "../components/EventFilterBar";
import NewsFilterBar from "../components/NewsFilterBar";
import api from "../services/Api";

const HomePage = ({ news, onSaveEvent, onSaveNews }) => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filteredNews, setFilteredNews] = useState(news);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get("/events");
        setEvents(response.data);
      } catch (error) {
        console.error("Errore durante il caricamento degli eventi", error);
      }
    };

    fetchEvents();
  }, []);

  const handleEventFilter = (filterType, value) => {
    // Filtraggio dinamico degli eventi
    setFilteredEvents(
      events.filter((event) => {
        if (filterType === "searchText") return event.title.toLowerCase().includes(value.toLowerCase());
        if (filterType === "location") return event.city === value || value === "";
        if (filterType === "category") return event.type === value || value === "";
        return true;
      })
    );
  };

  const handleNewsFilter = (filterType, value) => {
    // Filtraggio dinamico delle notizie
    setFilteredNews(
      news.filter((article) => {
        if (filterType === "searchText") return article.title.toLowerCase().includes(value.toLowerCase());
        if (filterType === "category") return article.category === value || value === "";
        return true;
      })
    );
  };

  return (
    <Container>
      <Row >
        <Col className="justify-content-center d-flex">
          <EventCarousel events={filteredEvents} />
        </Col>
      </Row>

      {/* Barra di filtraggio per gli eventi */}
      <Row className="mt-4">
        <Col>
          <EventFilterBar onFilter={handleEventFilter} />
        </Col>
      </Row>

      {/* Lista degli eventi */}
      <Row className="mt-4">
        <Col>
          <h2>Eventi</h2>
          <EventList events={filteredEvents} onSave={onSaveEvent} />
        </Col>
      </Row>

      {/* Barra di filtraggio per le notizie */}
      <Row className="mt-4">
        <Col>
          <NewsFilterBar onFilter={handleNewsFilter} />
        </Col>
      </Row>

      {/* Lista delle notizie */}
      <Row className="mt-4">
        <Col>
          <h2>Notizie</h2>
          <NewsSection news={filteredNews} onSave={onSaveNews} />
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;




