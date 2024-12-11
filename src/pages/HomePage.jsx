import React, { useState, useEffect } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import EventCarousel from "../components/EventCarousel";
import EventList from "../components/EventList";
import NewsSection from "../components/NewsSection";
import EventFilterBar from "../components/EventFilterBar";
import NewsFilterBar from "../components/NewsFilterBar";
import { fetchEventsFromBackend } from "../services/TicketmasterService";
import { fetchNewsFromBackend } from "../services/NewsService";

const HomePage = ({ onSaveEvent, onSaveNews }) => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState(news);
  const [newsLoading, setNewsLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      try {
        const events = await fetchEventsFromBackend("IT", "", "event", "it-it");
        setEvents(events);
        setFilteredEvents(events);
      } catch (error) {
        console.error("Errore durante il caricamento degli eventi:", error);
      } finally {
        setLoading(false);
      }
    };

    const loadNews = async () => {
      setNewsLoading(true);
      try {
        const newsData = await fetchNewsFromBackend("news", "it", 10);
        setNews(newsData);
        setFilteredNews(newsData);
      } catch (error) {
        console.error("Errore durante il caricamento delle notizie:", error);
      } finally {
        setNewsLoading(false);
      }
    };

    loadEvents();
    loadNews();
  }, []);

  const handleEventFilter = async (filterType, value) => {
    if (["searchText", "category", "location"].includes(filterType)) {
      try {
        const events = await fetchEventsFromBackend("IT", "", value, "it-it");
        setFilteredEvents(events);
      } catch (error) {
        console.error("Errore durante il filtraggio degli eventi:", error);
      }
    }
  };

  const handleNewsFilter = async (filterType, value) => {
    if (filterType === "searchText") {
      setFilteredNews(
        news.filter((article) =>
          article.title.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  return (
    <Container>
      {/* Sezione Eventi */}
      <Row>
        <Col>
          <h2>Eventi</h2>
          {loading ? (
            <div className="d-flex justify-content-center">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : filteredEvents.length > 0 ? (
            <>
              <EventCarousel events={filteredEvents} />
              <Row className="mt-4">
                <Col>
                  <EventFilterBar onFilter={handleEventFilter} />
                </Col>
              </Row>
              <Row className="mt-4">
                <Col>
                  <EventList events={filteredEvents} onSave={onSaveEvent} />
                </Col>
              </Row>
            </>
          ) : (
            <Alert variant="info">Nessun evento disponibile.</Alert>
          )}
        </Col>
      </Row>

      {/* Sezione Notizie */}
      <Row className="mt-5">
        <Col>
          <h2>Notizie</h2>
          {newsLoading ? (
            <div className="d-flex justify-content-center">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : filteredNews.length > 0 ? (
            <>
              <NewsFilterBar onFilter={handleNewsFilter} />
              <NewsSection news={filteredNews} onSave={onSaveNews} />
            </>
          ) : (
            <Alert variant="info">Nessuna notizia disponibile.</Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
