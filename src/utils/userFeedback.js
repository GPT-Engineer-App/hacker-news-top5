const feedbackData = [];

export const submitFeedback = (articleId, rating) => {
  feedbackData.push({ articleId, rating });
};

export const getFeedback = () => feedbackData;