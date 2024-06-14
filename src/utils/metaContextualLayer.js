export const provideMetaContext = (articles) => {
  return articles.map(article => ({
    ...article,
    summary: article.description.substring(0, 100) + '...',
    relatedLinks: [] // Placeholder for related links
  }));
};