const apiConstant = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    getProfile: "/auth/me",
  },
  vocabularyTopic: {
    getAll: "/vocabulary-topic/get-all-topic",
  },
  vocabulary: {
    getAll: "/vocabulary",
    getByTopicId: (id: string) => `/vocabulary/${id}`,
  },
  flashcardDeck: {
    getAll: "/flashcard-deck",
  },
  flashcard: {
    getByDeckId: (id: string) => `/flashcard/${id}`,
  },
  users: {
    updateNotification: "/users/notification",
    updateProfile: "/users/profile",
    changePassword: "/auth/change-password",
  },
};

export default apiConstant;
