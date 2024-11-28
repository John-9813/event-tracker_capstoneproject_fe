import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import EventCarousel from "./EventCarousel";
import EventList from "./EventList";
import NewsSection from "./NewsSection";
import EventFilterBar from "./EventFilterBar";
import NewsFilterBar from "./NewsFilterBar";

const HomePage = ({ events, news, onSaveEvent, onSaveNews }) => {
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [filteredNews, setFilteredNews] = useState(news);

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
      <Row>
        <Col>
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




