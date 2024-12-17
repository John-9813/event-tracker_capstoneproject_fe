import axios from "axios";
import HttpService from "./HttpService";

const ticketmasterApi = axios.create({
  baseURL: "https://app.ticketmaster.com/discovery/v2",
  headers: {
    "Content-Type": "application/json",
  },
});

// Chiave API dal file .env
const API_KEY = process.env.REACT_APP_TICKETMASTER_API_KEY;

const formatTime = (time) => {
  return time ? time.slice(0, 5) : "Orario non disponibile";
};

const formatDateToItalian = (date) => {
  if (!date) return "Data non disponibile";
  const [year, month, day] = date.split("-");
  return `${day}-${month}-${year}`;
};

const mapTicketStatus = (ticketStatus) => {
  if (ticketStatus === "onsale") return "Disponibili";
  if (ticketStatus === "offsale") return "Non Disponibili";
  if (ticketStatus === "cancelled") return "Cancellati";
  return "Stato non disponibile";
};



const fetchEventsFromBackend = async (city = "", countryCode = "IT", locale = "it-it", page = 0, size = 20) => {
  const validLocale = locale.match(/^[a-zA-Z]{2}(-[a-zA-Z]{2})?$/) ? locale : "it-it";

  try {
    const response = await HttpService.get("/events/proxy", {
      params: { city, countryCode, locale: validLocale, page, size },
    });

    const events = response.data || [];
    return events.map((event) => ({
      id: event.eventId,
      title: event.title,
      imageUrl: event.imageUrl || "https://via.placeholder.com/400x200",
      startDate: formatDateToItalian(event.startDate),
      startTime: formatTime(event.startTime),
      venueName: event.venueName || "Luogo non disponibile",
      city: event.city || "Città non disponibile",
      ticketStatus: mapTicketStatus(event.ticketStatus),
      pageUrl: event.pageUrl,
    }));
  } catch (error) {
    console.error("Errore durante il recupero degli eventi dal backend:", error);
    return [];
  }
};

const fetchFilteredEvents = async ({ keyword = "", city = "", page = 0, size = 20 }) => {
  console.log("fetchFilteredEvents chiamata con filtri:", { keyword, city, page });

  try {
    const params = { page, size };
    
    // Aggiungi solo parametri con valore effettivo
    if (keyword && keyword.trim() !== "") params.keyword = keyword.trim();
    if (city && city.trim() !== "") params.city = city.trim();

    console.log("Parametri inviati al backend:", params);

    const response = await HttpService.get("/events/filter", { params });
    console.log("Eventi filtrati ricevuti dal backend:", response.data);

    return response.data.map((event) => ({
      id: event.eventId,
      title: event.title,
      imageUrl: event.imageUrl || "https://via.placeholder.com/400x200",
      startDate: formatDateToItalian(event.startDate),
      startTime: formatTime(event.startTime),
      venueName: event.venueName || "Luogo non disponibile",
      city: event.city || "Città non disponibile",
      ticketStatus: event.ticketStatus || "Non specificato",
      pageUrl: event.pageUrl,
    }));
  } catch (error) {
    console.error("Errore durante il filtraggio degli eventi:", error);
    return [];
  }
};



export { fetchEventsFromBackend, fetchFilteredEvents };