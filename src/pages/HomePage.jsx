import React, { useState, useEffect } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import EventCarousel from "../components/EventCarousel";
import EventList from "../components/EventList";
import NewsSection from "../components/NewsSection";
import EventFilterBar from "../components/EventFilterBar";
import NewsFilterBar from "../components/NewsFilterBar";
import {
  fetchEventsFromBackend,
  fetchFilteredEvents,
} from "../services/TicketmasterService";
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
      console.log("Eventi caricati inizialmente:", events);

      setLoading(true);
      try {
        const events = await fetchEventsFromBackend();
        console.log("Eventi iniziali caricati:", events);
        setEvents(events);
        if (filteredEvents.length === 0) {
          setFilteredEvents(events);
        }
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

  const handleEventFilter = async (filters) => {
    console.log('Filtri selezionati:', filters);
    setLoading(true);
    try {
      const filteredEvents = await fetchFilteredEvents(filters);
      if (filteredEvents.length === 0) {
        console.warn('Nessun evento trovato per i filtri selezionati.');
      } else {
        console.log('Eventi filtrati ricevuti:', filteredEvents);
        // Posiziona l'evento corrispondente ai filtri come primo nella lista
        const keyword = filters.keyword?.toLowerCase() || '';
        const city = filters.city?.toLowerCase() || '';
        const category = filters.category?.toLowerCase() || '';
        const eventIndex = filteredEvents.findIndex(
          (event) =>
            event.title.toLowerCase().includes(keyword) &&
            event.location.toLowerCase().includes(city) &&
            event.category.toLowerCase().includes(category)
        );
        if (eventIndex > -1) {
          const [matchedEvent] = filteredEvents.splice(eventIndex, 1);
          filteredEvents.unshift(matchedEvent);
        }
      }
      setFilteredEvents(filteredEvents);
    } catch (error) {
      console.error('Errore durante il filtraggio degli eventi:', error);
    } finally {
      setLoading(false);
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
      <Row className="d-flex justify-content-center align-items-center flex-column">
        <Col xs={12} className="text-center">
          <h2>Eventi</h2>

          {/* Spinner durante il caricamento */}
          {loading && (
            <div className="d-flex justify-content-center">
              <Spinner animation="border" variant="primary" />
            </div>
          )}

          {/* Messaggio di warning se non ci sono eventi */}
          {!loading && filteredEvents.length === 0 && (
            <Alert variant="warning">
              Nessun evento trovato per i filtri selezionati.
            </Alert>
          )}

          {/* Contenuto principale degli eventi */}
          {!loading && filteredEvents.length > 0 && (
            <>
              <div className="event-carousel-wrapper">
                <EventCarousel events={filteredEvents} />
              </div>
              <Row className="mt-4 justify-content-center">
                <Col xs={12} md={10}>
                  <EventFilterBar onFilter={handleEventFilter} />
                </Col>
              </Row>
              <Row className="mt-4">
                <Col>
                  <EventList events={filteredEvents} onSave={onSaveEvent} />
                </Col>
              </Row>
            </>
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
