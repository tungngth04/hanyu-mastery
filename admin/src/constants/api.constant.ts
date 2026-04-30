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
    getDaily: "/vocabulary/daily",
  },
  flashCardDeck: {
    getAll: "/flashcard-deck",
    getStats: "/flashcard-deck/stats",
  },
  flashcard: {
    getByDeckId: (id: string) => `/flashcard/${id}`,
    updateStatus: (vocabularyId: string) => `/flashcard/${vocabularyId}/status`,
  },
  users: {
    updateNotification: "/users/notification",
    updateProfile: "/users/profile",
    changePassword: "/users/change-password",
  },
  supports: {
    createSupport: "/supports/create-support",
  },
  videos: {
    getAll: "/videos",
    getVideoById: (id: string) => `/videos/${id}`,
  },
  videoNote: {
    createNote: "/video-note",
  },
  videoProgress: {
    saveProgress: "/video-progress",
  },
  videoSave: {
    saveVideo: "/video-save/save",
    getAllVideoSave: "/video-save",
  },
  videoComment: {
    create: "/video-comment",
    getByVideoId: (id: string) => `/video-comment/${id}`,
  },
  pronunciation: {
    upRecord: "/pronunciation",
    speak: "/pinyin/speak",
    speakInitial: "/pinyin/initial",
    speakFinal: "/pinyin/final",
    getPinyin: "/pinyin",
    combine: "/pinyin/combine",
  },
  userDeckProgress: {
    study: "/user-deck-progress/study",
  },
};

export default apiConstant;
