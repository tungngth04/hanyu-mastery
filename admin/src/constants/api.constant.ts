const apiConstant = {
  auth: {
    login: "/auth/login",
    getProfile: "/auth/me",
    refreshToken: "auth/refresh-token",
  },

  vocabularyTopic: {
    getAll: "/vocabulary-topic/get-all-topic",
    create: "/vocabulary-topic/create-topic",
    update: (id: string) => `/vocabulary-topic/update-topic/${id}`,
    delete: (id: string) => `/vocabulary-topic/delete-topic/${id}`,
    getById: (id: string) => `/vocabulary-topic/${id}`,
  },

  vocabulary: {
    getAll: "/vocabulary",
    getByTopicId: (id: string) => `/vocabulary?topicId=${id}`,
    create: "/vocabulary",
    update: (id: string) => `/vocabulary/${id}`,
    delete: (id: string) => `/vocabulary/${id}`,
    getDetail: (id: string) => `/vocabulary/${id}`,
  },

  users: {
    getAll: "/users/all",
    getDetail: (id: string) => `/users/detail/${id}`,
    toggleStatus: (id: string) => `/users/toggle-status/${id}`,
    updateProfile: "/users/profile",
    changePassword: "/users/change-password",
    dashboardOverview: "/users/dashboard/overview",
    userGrowth: "/users/dashboard/user-growth",
  },

  supports: {
    getAll: "/supports/all",
    getDetail: (id: string) => `/supports/detail/${id}`,
    updateStatus: (id: string) => `/supports/update-status/${id}`,
  },

  videos: {
    getAll: "/videos",
    getVideoById: (id: string) => `/videos/${id}`,
    createYoutube: "/videos/youtube",
    createUpload: "/videos/upload",
    update: (id: string) => `/videos/${id}`,
    delete: (id: string) => `/videos/${id}`,
  },
  flashcardDeck: {
    getAll: "/flashcard-deck",
    stats: "/flashcard-deck/stats",
    create: "/flashcard-deck",
    update: (id: string) => `/flashcard-deck/${id}`,
    delete: (id: string) => `/flashcard-deck/${id}`,
  },
  grammar: {
    getAllLessons: "/grammar/lessons",
    createLesson: "/grammar/lesson",
    updateLesson: (id: string) => `/grammar/lesson/${id}`,
    deleteLesson: (id: string) => `/grammar/lesson/${id}`,
    getAllTopics: "/grammar/grammar-topics",
  },
};

export default apiConstant;
