import React, { useState, useEffect } from "react";
import { Container, Row, Col, Spinner, Alert, Button } from "react-bootstrap";
import EventCarousel from "../../components/eventCarousel/EventCarousel";
import EventList from "../../components/eventList/EventList";
import NewsSection from "../../components/newsSection/NewsSection";
import EventFilterBar from "../../components/eventFilterBar/EventFilterBar";
import NewsFilterBar from "../../components/newsFilterBar/NewsFilterBar";

import { fetchEventsFromBackend, fetchFilteredEvents } from "../../services/TicketmasterService";
import { fetchNewsFromBackend } from "../../services/NewsService";

import "./HomePage.css";

const HomePage = ({ onSaveEvent, onSaveNews }) => {
  const [events, setEvents] = useState([]);
  const [news, setNews] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);

  const [currentPageEvents, setCurrentPageEvents] = useState(0);
  const [currentPageNews, setCurrentPageNews] = useState(0);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [loadingNews, setLoadingNews] = useState(true);

   // Carica eventi predefiniti (Milano) con paginazione
   useEffect(() => {
    const loadDefaultEvents = async () => {
      setLoadingEvents(true);
      try {
        const events = await fetchEventsFromBackend("Milano", "IT", "it-it", currentPageEvents, 18);
        console.log("Eventi di Milano caricati come default:", events);
        setEvents(events);
        setFilteredEvents(events);
      } catch (error) {
        console.error("Errore durante il caricamento degli eventi di default:", error);
      } finally {
        setLoadingEvents(false);
      }
    };

    loadDefaultEvents();
  }, [currentPageEvents]);
  
  // Carica le notizie in base alla pagina corrente
  useEffect(() => {
    const loadNews = async () => {
      setLoadingNews(true);
      try {
        const newsData = await fetchNewsFromBackend("news", "it", currentPageNews, 18);
        console.log(`Notizie caricate per pagina ${currentPageNews + 1}:`, newsData);
        setNews(newsData);
        setFilteredNews(newsData);
      } catch (error) {
        console.error("Errore durante il caricamento delle notizie:", error);
      } finally {
        setLoadingNews(false);
      }
    };

    loadNews();
  }, [currentPageNews]);

  // Gestione dei filtri per gli eventi
  const handleEventFilter = async (filters) => {
    console.log("Filtri selezionati in HomePage:", filters);
  
    setLoadingEvents(true);
    try {
      const normalizedFilters = {
        keyword: filters.keyword?.trim() || "",
        city: filters.city?.trim() || "",
      };
  
      console.log("Filtri normalizzati per il backend:", normalizedFilters);
  
      const filteredEvents = await fetchFilteredEvents(normalizedFilters);
  
      if (filteredEvents.length === 0) {
        console.warn("Nessun evento trovato per i filtri selezionati. Mantengo gli eventi attuali.");
      } else {
        console.log("Eventi filtrati ricevuti dal backend:", filteredEvents);
        setFilteredEvents(filteredEvents);
      }
    } catch (error) {
      console.error("Errore durante il filtraggio degli eventi:", error);
    } finally {
      setLoadingEvents(false);
    }
  };
  
  // Gestione dei filtri per le notizie
  const handleNewsFilter = (filterType, value) => {
    if (filterType === "searchText") {
      setFilteredNews(
        news.filter((article) =>
          article.title.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  // Navigazione pagine eventi
  const handleNextPageEvents = async () => {
    const nextPage = currentPageEvents + 1;
    setCurrentPageEvents(nextPage);
  
    const filteredEvents = await fetchFilteredEvents({
      city: "Milano",
      page: nextPage,
      size: 20,
    });
    setFilteredEvents(filteredEvents);
  };
  
  const handlePreviousPageEvents = async () => {
    if (currentPageEvents === 0) return;
  
    const prevPage = currentPageEvents - 1;
    setCurrentPageEvents(prevPage);
  
    const filteredEvents = await fetchFilteredEvents({
      city: "Milano",
      page: prevPage,
      size: 20,
    });
    setFilteredEvents(filteredEvents);
  };
  

  // Navigazione pagine notizie
  const handleNextPageNews = () => setCurrentPageNews((prev) => prev + 1);
  const handlePreviousPageNews = () => setCurrentPageNews((prev) => Math.max(prev - 1, 0));

  return (
    <Container>
      {/* Sezione Eventi */}
      <Row className="d-flex justify-content-center align-items-center flex-column">
        <Col xs={12} className="text-center">
          <h2>Eventi</h2>
  
          {loadingEvents ? (
        <Spinner animation="border" variant="primary" />
      ) : (
        <>
          {/* Carosello centrato */}
          <div className="event-carousel-wrapper d-flex justify-content-center align-items-center">
            <EventCarousel events={filteredEvents} />
          </div>

          {/* Barra filtro */}
          <Row className="mt-4 justify-content-center">
            <Col xs={12} md={10}>
              <EventFilterBar onFilter={handleEventFilter} />
            </Col>
          </Row>

          {/* Lista eventi */}
          <Row className="mt-4">
            <Col>
              <EventList events={filteredEvents} onSave={onSaveEvent} />
            </Col>
          </Row>
              <div className="pagination-controls mt-3 d-flex justify-content-center">
                <Button onClick={handlePreviousPageEvents} disabled={currentPageEvents === 0}>
                  Precedente
                </Button>
                <span className="mx-3">Pagina {currentPageEvents + 1}</span>
                <Button onClick={handleNextPageEvents}>Successiva</Button>
              </div>
            </>
          )}
        </Col>
      </Row>
  
      {/* Sezione Notizie */}
      <Row className="mt-5">
        <Col>
          <h2 className="text-center">Notizie</h2>
          {loadingNews ? (
            <Spinner animation="border" variant="primary" />
          ) : (
            <>
              <NewsFilterBar onFilter={handleNewsFilter} />
              <NewsSection news={filteredNews} onSave={onSaveNews} />
              <div className="pagination-controls mt-3 d-flex justify-content-center">
                <Button onClick={handlePreviousPageNews} disabled={currentPageNews === 0}>
                  Precedente
                </Button>
                <span className="mx-3">Pagina {currentPageNews + 1}</span>
                <Button onClick={handleNextPageNews}>Successiva</Button>
              </div>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
  
};

export default HomePage;

