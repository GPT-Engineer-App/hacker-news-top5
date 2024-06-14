export const scoreAndSortArticles = (articles, query, sortCriteria) => {
  const score = (article) => {
    let score = 0;
    query.split(' ').forEach(word => {
      if (article.title.toLowerCase().includes(word.toLowerCase()) || article.description.toLowerCase().includes(word.toLowerCase())) {
        score += 1;
      }
    });
    return score;
  };

  const sortFunctions = {
    date: (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt),
    relevance: (a, b) => score(b) - score(a),
    popularity: (a, b) => b.score - a.score,
  };

  return articles.sort(sortFunctions[sortCriteria]);
};