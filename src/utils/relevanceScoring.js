export const scoreAndSortArticles = (articles, query) => {
  const score = (article) => {
    let score = 0;
    query.split(' ').forEach(word => {
      if (article.title.toLowerCase().includes(word.toLowerCase()) || article.description.toLowerCase().includes(word.toLowerCase())) {
        score += 1;
      }
    });
    return score;
  };

  return articles.sort((a, b) => score(b) - score(a));
};