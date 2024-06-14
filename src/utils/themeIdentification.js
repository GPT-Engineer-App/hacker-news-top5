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