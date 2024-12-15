import axios from "axios";
import   HttpService from "./HttpService";

const ticketmasterApi = axios.create({
    baseURL: "https://app.ticketmaster.com/discovery/v2",
    headers: {
        "Content-Type": "application/json",
    },
});


// Chiave API dal file .env
const API_KEY = process.env.REACT_APP_TICKETMASTER_API_KEY;

const fetchEventsFromBackend = async (city = "Milano", countryCode = "IT", locale = "it-it") => {
  
  const validLocale = locale.match(/^[a-zA-Z]{2}(-[a-zA-Z]{2})?$/) ? locale : "it-it";

  try {
    const response = await HttpService.get("/events/proxy", {
      params: { city, countryCode, locale: validLocale },
    });

    const events = response.data || [];
    return events.map((event) => ({
      id: event.eventId,
      title: event.title,
      description: event.description || "Descrizione non disponibile",
      imageUrl: event.imageUrl || "https://via.placeholder.com/400x200",
      startDate: event.startDate || "Data non disponibile",
      location: event.location || "Luogo non disponibile",
      category: event.category || "Categoria non disponibile",
      pageUrl: event.pageUrl,
    }));
  } catch (error) {
    console.error("Errore durante il recupero degli eventi dal backend:", error);
    return [];
  }
};

const fetchFilteredEvents = async ({ keyword = "", city = "", category = "" }) => {
  console.log("Invio parametri al backend:", { keyword, city, category });
  try {
      const params = {};
      if (keyword.trim() !== "") params.keyword = keyword;
      if (city.trim() !== "") params.city = city;
      if (category.trim() !== "") params.category = category;

      const response = await HttpService.get("/events/filter", { params });
      console.log("Eventi filtrati ricevuti dal backend:", response.data);

      return response.data.map((event) => ({
          id: event.eventId,
          title: event.title,
          description: event.description || "Descrizione non disponibile",
          imageUrl: event.imageUrl || "https://via.placeholder.com/400x200",
          startDate: event.startDate || "Data non disponibile",
          location: event.location || "Luogo non disponibile",
          category: event.category || "Categoria non disponibile",
          pageUrl: event.pageUrl,
      }));
  } catch (error) {
      console.error("Errore durante il filtraggio degli eventi:", error);
      return [];
  }
};
export { ticketmasterApi, API_KEY, fetchEventsFromBackend, fetchFilteredEvents };


