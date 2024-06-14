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

  const sortByCriteria = (a, b) => {
    switch (sortCriteria) {
      case 'date':
        return new Date(b.publishedAt) - new Date(a.publishedAt);
      case 'relevance':
        return score(b) - score(a);
      case 'popularity':
        return b.score - a.score;
      default:
        return 0;
    }
  };

  return articles.sort(sortByCriteria);
};