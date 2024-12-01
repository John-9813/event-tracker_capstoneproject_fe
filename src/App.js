import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppNavbar from "./components/AppNavbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import SavedItemsPage from "./pages/SavedItemsPage";
import CalendarPage from "./pages/CalendarPage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const sampleEvents = [
  {
    id: 1,
    title: "Concerto Rock",
    description: "Grande concerto rock",
    type: "Musica",
    city: "Milano",
    date: "2024-12-01",
    note: ""
  },
  {
    id: 2,
    title: "Mostra d'arte",
    description: "Esposizione di opere d'arte",
    type: "Arte",
    city: "Roma",
    date: "2024-12-02",
    note: ""
  },
  {
    id: 3,
    title: "Festival Food",
    description: "Cibi da tutto il mondo",
    type: "Cibo",
    city: "Milano",
    date: "2024-12-03",
    note: ""
  },
];

const sampleNews = [
  { id: 1, title: "Notizia 1", description: "Breve descrizione notizia 1" },
  { id: 2, title: "Notizia 2", description: "Breve descrizione notizia 2" },
];

const notify = (message, type = "success") => {
  toast[type](message);
};

const App = () => {
  const [savedItems, setSavedItems] = useState([]);

  // Funzione per salvare un elemento
  const handleSaveItem = (item) => {
    if (
      !savedItems.find(
        (saved) => saved.id === item.id && saved.type === item.type
      )
    ) {
      setSavedItems([...savedItems, { ...item, type: item.type || "news" }]);
      notify(`${item.title} è stato salvato!`);
    } else {
      notify(`${item.title} è già tra gli elementi salvati.`, "warning");
    }
  };

  // Funzione per rimuovere un elemento salvato
  const handleRemoveItem = (id) => {
    const item = savedItems.find((saved) => saved.id === id);
    if (item) {
      setSavedItems(savedItems.filter((saved) => saved.id !== id));
      notify(`${item.title} è stato rimosso.`);
    }
  };

  // Funzione per aggiungere un evento direttamente dal calendario
  const handleAddEvent = (newEvent) => {
    setSavedItems([
      ...savedItems,
      { ...newEvent, id: Date.now(), type: "event" },
    ]);
    notify("Evento aggiunto con successo!");
  };

  const handleRemoveEvent = (id) => {
    setSavedItems(savedItems.filter((item) => item.id !== id));
    notify("Evento rimosso con successo!", "info");
  };

  const handleUpdateNote = (id, newNote) => {
    setSavedItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, note: newNote } : item)
    );
    toast.success("Nota aggiornata con successo!");

  };
  

  return (
    <BrowserRouter>
      <AppNavbar />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              events={sampleEvents}
              news={sampleNews}
              onSaveEvent={handleSaveItem}
              onSaveNews={handleSaveItem}
            />
          }
        />
        <Route
          path="/saved"
          element={
            <SavedItemsPage
              savedItems={savedItems}
              onRemove={handleRemoveItem}
            />
          }
        />
        <Route
          path="/calendar"
          element={
            <CalendarPage
              savedEvents={savedItems.filter((item) => item.type === "event")}
              onAddEvent={handleAddEvent}
              onRemoveEvent={handleRemoveEvent}
              onUpdateNote={handleUpdateNote}
            />
          }
        />
      </Routes>
      <ToastContainer />
      <Footer />
    </BrowserRouter>
  );
};

export default App;
