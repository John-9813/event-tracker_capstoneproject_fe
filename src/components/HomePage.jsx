import React from "react";
import { Container } from "react-bootstrap";
import EventCarousel from "./EventCarousel";
import EventList from "./EventList";
import NewsSection from "./NewsSection";

const HomePage = ({ events, news, onSaveEvent, onSaveNews }) => {
  return (
    <Container>
      <EventCarousel events={events} />
      <h2 className="mt-5">Eventi</h2>
      <EventList events={events} onSave={onSaveEvent} />
      <h2 className="mt-5">Notizie</h2>
      <NewsSection news={news} onSave={onSaveNews} />
    </Container>
  );
};

export default HomePage;

