const apiConstant = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    getProfile: "/auth/me",
    refreshToken: "auth/refresh-token",
  },
  vocabularyTopic: {
    getAll: "/vocabulary-topic/get-all-topic",
  },
  vocabulary: {
    getAll: "/vocabulary",
    getByTopicId: (id: string) => `/vocabulary/${id}`,
  },
  flashCardDeck: {
    getAll: "/flashcard-deck",
    getStats: "/flashcard-deck/stats",
  },
  flashcard: {
    getByDeckId: (id: string) => `/flashcard/${id}`,
  },
  users: {
    updateNotification: "/users/notification",
    updateProfile: "/users/profile",
    changePassword: "/users/change-password",
  },
  supports: {
    createSupport: "/supports/create-support",
  },
};

export default apiConstant;
