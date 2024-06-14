import axios from 'axios';

const NEWS_API_URL = "https://newsapi.org/v2/everything";
const API_KEY = "YOUR_API_KEY";

export const fetchNews = async (themes) => {
  const articles = [];
  for (const theme of themes) {
    const params = {
      q: theme,
      apiKey: API_KEY
    };
    const response = await axios.get(NEWS_API_URL, { params });
    articles.push(...response.data.articles);
  }
  return articles;
};