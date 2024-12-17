import React, { useState } from "react";
import Calendar from "react-calendar";
import { Container, Button, Modal, Form } from "react-bootstrap";
import "./CalendarPage.css";

const CalendarPage = ({ savedEvents, onAddEvent, onRemoveEvent, onUpdateNote }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: "", date: "" });
  const [localNotes, setLocalNotes] = useState({});

  const getFormattedDate = (date) => {
    const offset = date.getTimezoneOffset();
    const adjustedDate = new Date(date.getTime() - offset * 60 * 1000);
    return adjustedDate.toISOString().split("T")[0];
  };

  const eventsForDate = savedEvents.filter(
    (event) => event.date === getFormattedDate(selectedDate)
  );
  
  const handleRemoveEvent = (id) => {
    onRemoveEvent(id);
  };

  const handleNoteChange = (id, note) => {
    setLocalNotes((prevNotes) => ({
      ...prevNotes,
      [id]: note,
    }));
  };

  const handleSaveNote = (id) => {
    const note = localNotes[id];
    if (note !== undefined) {
      onUpdateNote(id, note);
      delete localNotes[id];
    }
  };
  console.log("Saved Events:", savedEvents);
  console.log(
    "Event Dates:",
    savedEvents.map((e) => e.date)
  );
  console.log("Selected Date:", getFormattedDate(selectedDate));
  
  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Calendario Personale</h2>
      <Calendar className="text-center mb-3"
        value={selectedDate}
        onChange={setSelectedDate}
        tileClassName={({ date }) => {
          const formattedDate = getFormattedDate(date);
          if (formattedDate === getFormattedDate(selectedDate)) {
            return "selected-day";
          }
          if (savedEvents.some((event) => event.date === formattedDate)) {
            return "highlight";
          }
          return null;
        }}     
        showNeighboringMonth={false} 
        locale="it-IT"
      />
      <div className="mt-4">
        <h4>Eventi per la data selezionata:</h4>
        {eventsForDate.length > 0 ? (
          <ul>
            {eventsForDate.map((event) => (
              <li key={event.id} className="mb-3">
                {event.title}
                <Form.Control
                  as="textarea"
                  rows={2}
                  placeholder="Aggiungi una nota"
                  value={localNotes[event.id] || event.note || ""}
                  onChange={(e) => handleNoteChange(event.id, e.target.value)}
                  className="mt-2"
                />
                <Button
                  variant="primary"
                  size="sm"
                  className="mt-2"
                  onClick={() => handleSaveNote(event.id)}
                >
                  Salva Nota
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  className="ms-2 mt-2"
                  onClick={() => handleRemoveEvent(event.id)}
                >
                  Rimuovi
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Nessun evento per questa data.</p>
        )}
        <Button className="mt-4" onClick={() => setShowModal(true)}>
          Aggiungi Evento
        </Button>
      </div>
      {/* Modale per aggiungere un evento */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Aggiungi Evento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Titolo Evento</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci titolo"
                value={newEvent.title}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, title: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Chiudi
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              onAddEvent({ ...newEvent, date: getFormattedDate(selectedDate) });
              setNewEvent({ title: "", date: "" });
              setShowModal(false);
            }}
          >
            Salva Evento
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default CalendarPage;
