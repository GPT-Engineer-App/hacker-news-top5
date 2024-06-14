import spacy from 'spacy';

const nlp = spacy.load('en_core_web_sm');

export const analyzeQuery = (query) => {
  const doc = nlp(query);
  const themes = doc.ents.filter(ent => ent.label_ === 'TOPIC' || ent.label_ === 'THEME').map(ent => ent.text);
  return themes;
};

// Test function for user query analysis
export const testAnalyzeQuery = () => {
  const testQueries = [
    "What are the latest trends in mental health?",
    "Tell me about climate action initiatives.",
    "What's new in educational technology?"
  ];

  testQueries.forEach(query => {
    const themes = analyzeQuery(query);
    console.log(`Query: "${query}" - Identified Themes:`, themes);
  });
};

testAnalyzeQuery();