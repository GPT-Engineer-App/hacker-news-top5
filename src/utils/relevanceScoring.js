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

// Test function for relevance scoring and sorting
export const testScoreAndSortArticles = () => {
  const testArticles = [
    { title: "Mental Health Awareness", description: "An article about mental health.", score: 0 },
    { title: "Climate Action Now", description: "An article about climate action.", score: 0 },
    { title: "Educational Technology Advances", description: "An article about educational technology.", score: 0 }
  ];
  const query = "mental health climate action";
  const sortedArticles = scoreAndSortArticles(testArticles, query);
  console.log("Sorted Articles:", sortedArticles);
};

testScoreAndSortArticles();