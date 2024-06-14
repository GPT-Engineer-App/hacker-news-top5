export const provideMetaContext = (articles) => {
  return articles.map(article => ({
    ...article,
    summary: article.description.substring(0, 100) + '...',
    relatedLinks: [] // Placeholder for related links
  }));
};

// Test function for meta-contextual layer
export const testProvideMetaContext = () => {
  const testArticles = [
    { title: "Mental Health Awareness", description: "An article about mental health.", score: 0 },
    { title: "Climate Action Now", description: "An article about climate action.", score: 0 },
    { title: "Educational Technology Advances", description: "An article about educational technology.", score: 0 }
  ];
  const metaContextArticles = provideMetaContext(testArticles);
  console.log("Meta-Context Articles:", metaContextArticles);
};

testProvideMetaContext();