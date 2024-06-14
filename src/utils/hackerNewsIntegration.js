export const fetchTopStories = async () => {
  const topStoriesUrl = 'https://hacker-news.firebaseio.com/v0/topstories.json';
  const storyDetailUrl = 'https://hacker-news.firebaseio.com/v0/item/';

  try {
    const response = await fetch(topStoriesUrl);
    const storyIds = await response.json();
    const top5StoryIds = storyIds.slice(0, 5);

    const storyPromises = top5StoryIds.map(async (id) => {
      const storyResponse = await fetch(`${storyDetailUrl}${id}.json`);
      return storyResponse.json();
    });

    const stories = await Promise.all(storyPromises);
    return stories;
  } catch (error) {
    console.error('Error fetching top stories:', error);
    return [];
  }
};