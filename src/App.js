import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import AppNavbar from "./components/navbar/AppNavbar.jsx";
import Footer from "./components/footer/Footer.jsx";
import HomePage from "./pages/homePage/HomePage.jsx";
import LoginPage from "./pages/loginPage/LoginPage.jsx";
import SavedItemsPage from "./pages/savedItemsPage/SavedItemsPage.jsx";
import CalendarPage from "./pages/calendarPage/CalendarPage.jsx";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "./hooks/useAuth";

import "./styles/custom.scss";

const notify = (message, type = "success") => {
  toast[type](message);
};

const App = () => {
  const [savedItems, setSavedItems] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useAuth();
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setLoadingAuth(false);
    };
    checkAuth();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    notify("Logout effettuato con successo!", "info");
  };

  // Funzione per salvare un elemento
  const handleSaveItem = (item) => {
    if (
      !savedItems.find(
        (saved) => saved.id === item.id && saved.type === item.type
      )
    ) {
      const formattedItem = {
        ...item,
        date: item.startDate
          ? item.startDate.split("-").reverse().join("-")
          : new Date().toISOString().split("T")[0],
        type: item.type || "event",
      };
      setSavedItems([...savedItems, formattedItem]);
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
      {
        ...newEvent,
        id: Date.now(),
        type: "event",
        isPersonal: true, // Aggiunge una proprietà per identificare eventi personali
      },
    ]);
    notify("Evento personale aggiunto con successo!");
  };

  const handleRemoveEvent = (id) => {
    setSavedItems(savedItems.filter((item) => item.id !== id));
    notify("Evento rimosso con successo!", "info");
  };

  const handleUpdateNote = (id, newNote) => {
    setSavedItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, note: newNote } : item
      )
    );
    toast.success("Nota aggiornata con successo!");
  };

  if (loadingAuth) {
    // Mostra un caricamento mentre verifica l'autenticazione
    return <div>Caricamento...</div>;
  }

  return (
    <BrowserRouter>
      <div id="app-container">
        <AppNavbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        <main>
          <Routes>
            {/* Reindirizza alla home o alla login in base allo stato di autenticazione */}
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Navigate to="/home" />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/login"
              element={
                <LoginPage
                  onLogin={() => {
                    console.log(
                      "onLogin chiamato, aggiornamento isAuthenticated."
                    );
                    setIsAuthenticated(true);
                  }}
                />
              }
            />

            <Route
              path="/home"
              element={
                isAuthenticated ? (
                  <HomePage
                    onSaveEvent={handleSaveItem}
                    onSaveNews={handleSaveItem}
                  />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/saved"
              element={
                isAuthenticated ? (
                  <SavedItemsPage
                    savedItems={savedItems.filter((item) => !item.isPersonal)}
                    onRemove={handleRemoveItem}
                  />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/calendar"
              element={
                isAuthenticated ? (
                  <CalendarPage
                    savedEvents={savedItems.filter(
                      (item) => item.type === "event"
                    )}
                    onAddEvent={handleAddEvent}
                    onRemoveEvent={handleRemoveEvent}
                    onUpdateNote={handleUpdateNote}
                  />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
