import axios from "axios";

const HttpService = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercettore per aggiungere il token JWT a tutte le richieste
HttpService.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    // Escludi l'aggiunta del token JWT per le richieste di login e registrazione
    if (token && !config.url.includes("/auth/login") && !config.url.includes("/auth/register")) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercettore per gestire le risposte e eventuali errori
HttpService.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Se il token è scaduto, rimuovilo dal localStorage
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default HttpService;