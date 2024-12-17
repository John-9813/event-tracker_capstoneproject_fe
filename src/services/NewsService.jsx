import axios from "axios";

// Funzione per recuperare le news dal backend
const fetchNewsFromBackend = async (query = "news", language = "it", page = 1, size = 20) => {
  try {
    const response = await axios.get(`http://localhost:8080/news/external`, {
      params: { query, language, page: page < 1 ? 1 : page, pageSize: size }, // Ripristino pageSize
    });

    // Filtriamo notizie con "[Removed]" e immagini non valide dopo aver ricevuto i dati
    const filteredNews = response.data.filter((news) => {
      const isRemoved = news.title && news.title.includes("[Removed]");
      const hasInvalidImage =
        !news.imageUrl || news.imageUrl.includes("placeholder");

      return !isRemoved && !hasInvalidImage;
    });

    // Mappiamo le notizie valide
    return filteredNews.map((news) => ({
      id: news.newsId,
      title: news.title,
      description: news.description || "Descrizione non disponibile",
      imageUrl: news.imageUrl || "https://via.placeholder.com/400x200",
      publishedDate: news.publishedDate || "Data non disponibile",
      source: news.source || "Fonte non disponibile",
      url: news.url,
    }));
  } catch (error) {
    console.error("Errore durante il recupero delle notizie dal backend:", error);
    return [];
  }
};

export { fetchNewsFromBackend };

