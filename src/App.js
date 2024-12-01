import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppNavbar from "./components/AppNavbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import 'bootstrap/dist/css/bootstrap.min.css';
import SavedItemsPage from "./pages/SavedItemsPage";
import CalendarPage from "./pages/CalendarPage";


const sampleEvents = [
  { id: 1, title: "Evento 1", description: "Descrizione evento 1" },
  { id: 2, title: "Evento 2", description: "Descrizione evento 2", },
];

const sampleNews = [
  { id: 1, title: "Notizia 1", description: "Breve descrizione notizia 1" },
  { id: 2, title: "Notizia 2", description: "Breve descrizione notizia 2" },
];




const App = () => {

  const [savedItems, setSavedItems] = useState([]);

// Funzione per salvare un elemento
const handleSaveItem = (item) => {
  // Evita duplicati
  if (!savedItems.find((saved) => saved.id === item.id)) {
    setSavedItems([...savedItems, item]);
  }
};

// Funzione per rimuovere un elemento salvato
const handleRemoveItem = (id) => {
  setSavedItems(savedItems.filter((item) => item.id !== id));
};

  return (
    <BrowserRouter>
      <AppNavbar />
      <Routes>
        <Route
          path="/"
          element={<HomePage events={sampleEvents} news={sampleNews} onSaveEvent={handleSaveItem} onSaveNews={handleSaveItem} />}/>
        <Route
        path="/saved"
        element={<SavedItemsPage savedItems={savedItems} onRemove={handleRemoveItem} />}/>
        <Route
        path="/calendar"
        element={<CalendarPage savedEvents={savedItems.filter((item) => item.type === "event")} />}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;