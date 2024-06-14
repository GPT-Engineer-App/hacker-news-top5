const predefinedThemes = {
  health: ["preventive health", "mental health", "fitness", "nutrition"],
  education: ["experiential learning", "educational technology", "collaborative learning"],
  environment: ["sustainability", "climate action", "biodiversity"]
};

export const identifyThemes = (themes) => {
  const matchedThemes = [];
  themes.forEach(theme => {
    Object.keys(predefinedThemes).forEach(key => {
      if (predefinedThemes[key].includes(theme)) {
        matchedThemes.push(key);
      }
    });
  });
  return matchedThemes;
};

// Test function for contextual theme identification
export const testIdentifyThemes = () => {
  const testThemes = [
    ["mental health", "fitness"],
    ["educational technology", "collaborative learning"],
    ["sustainability", "climate action"]
  ];

  testThemes.forEach(themes => {
    const matchedThemes = identifyThemes(themes);
    console.log(`Themes: ${themes.join(", ")} - Matched Themes:`, matchedThemes);
  });
};

testIdentifyThemes();