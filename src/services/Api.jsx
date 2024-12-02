import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api", // URL del backend
  headers: {
    "Content-Type": "application/json",
  },
});

// intercetta le richieste per aggiungere il token JWT
api.interceptors.request.use((config) => {

    // Ottieni il token JWT
  const token = localStorage.getItem("token"); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
