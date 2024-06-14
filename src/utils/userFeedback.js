const feedbackData = [];

export const submitFeedback = (articleId, rating) => {
  feedbackData.push({ articleId, rating });
};

export const getFeedback = () => feedbackData;

// Test function for user feedback loop
export const testUserFeedback = () => {
  submitFeedback(1, 1);
  submitFeedback(2, -1);
  submitFeedback(3, 1);
  const feedback = getFeedback();
  console.log("User Feedback:", feedback);
};

testUserFeedback();