import axios from "axios";

// Funzione per recuperare le news dal backend
const fetchNewsFromBackend = async (query = "news", language = "it") => {
  try {
    const response = await axios.get(`http://localhost:8080/news/external`, {
      params: { query, language },
    });
    return response.data.map((news) => ({
      id: news.newsId,
      title: news.title,
      description: news.description,
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
