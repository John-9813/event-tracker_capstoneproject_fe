import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppNavbar from "./components/AppNavbar";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import 'bootstrap/dist/css/bootstrap.min.css';


const sampleEvents = [
  { id: 1, title: "Evento 1", description: "Descrizione evento 1" },
  { id: 2, title: "Evento 2", description: "Descrizione evento 2" },
];

const sampleNews = [
  { id: 1, title: "Notizia 1", description: "Breve descrizione notizia 1" },
  { id: 2, title: "Notizia 2", description: "Breve descrizione notizia 2" },
];

const App = () => {
  const [savedItems, setSavedItems] = useState([]);

  const handleSaveItem = (item) => {
    setSavedItems([...savedItems, item]);
  };

  return (
    <BrowserRouter>
      <AppNavbar />
      <Routes>
        <Route
          path="/"
          element={<HomePage events={sampleEvents} news={sampleNews} onSaveEvent={handleSaveItem} onSaveNews={handleSaveItem} />}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

// import React from 'react';

// const App = () => (
//   <div>
//     <h1>Test di base</h1>
//     <p>L'app sta funzionando correttamente senza Bootstrap.</p>
//   </div>
// );

export default App;