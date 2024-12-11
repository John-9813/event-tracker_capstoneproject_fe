import axios from "axios";


const ticketmasterApi = axios.create({
    baseURL: "https://app.ticketmaster.com/discovery/v2",
    headers: {
        "Content-Type": "application/json",
    },
});

// Chiave API dal file .env
const API_KEY = process.env.REACT_APP_TICKETMASTER_API_KEY;

const fetchEventsFromBackend = async (city = "", countryCode = "IT", locale = "it-it") => {
    try {
      const response = await axios.get(`http://localhost:8080/proxy`, {
        params: { city, countryCode, locale },
      });
      const events = response.data._embedded?.events || [];
      return events.map((event) => ({
        id: event.id,
        title: event.name,
        description: event.description || "Descrizione non disponibile",
        imageUrl: event.images?.[0]?.url || "https://via.placeholder.com/400x200",
        startDate: event.dates?.start?.localDate || "Data non disponibile",
        location: event._embedded?.venues?.[0]?.name || "Luogo non disponibile",
        category: event.classifications?.[0]?.segment?.name || "Categoria non disponibile",
        priceRange: event.priceRanges?.[0]
          ? `Da ${event.priceRanges[0].min} a ${event.priceRanges[0].max} ${event.priceRanges[0].currency}`
          : "Prezzo non disponibile",
        eventUrl: event.url,
      }));
    } catch (error) {
      console.error("Errore durante il recupero degli eventi dal backend:", error);
      return [];
    }
  };
  
export { ticketmasterApi, API_KEY, fetchEventsFromBackend };


