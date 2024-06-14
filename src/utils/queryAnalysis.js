import spacy from 'spacy';

const nlp = spacy.load('en_core_web_sm');

export const analyzeQuery = (query) => {
  const doc = nlp(query);
  const themes = doc.ents.filter(ent => ent.label_ === 'TOPIC' || ent.label_ === 'THEME').map(ent => ent.text);
  return themes;
};