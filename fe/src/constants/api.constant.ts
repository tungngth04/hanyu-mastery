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
    addToDeck: "/vocabulary/add",
  },
  flashCardDeck: {
    getAll: "/flashcard-deck",
    getStats: "/flashcard-deck/stats",
    create: "/flashcard-deck",
  },
  flashcard: {
    getByDeckId: (id: string) => `/flashcard/${id}`,
    updateStatus: (vocabularyId: string) => `/flashcard/${vocabularyId}/status`,
  },
  users: {
    updateNotification: "/users/notification",
    updateProfile: "/users/profile",
    changePassword: "/users/change-password",
    getLearningStats: "/users/dashboard/learning-stats",
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
  grammar: {
    getSidebar: "/grammar/sidebar",
    getLessonDetail: (lessonId: string) => `/grammar/lesson/${lessonId}`,
    updateProgress: "/grammar/progress",
  },
  hskExam: {
    getAll: "/hsk-exam",
    getById: (id: string) => `/hsk-exam/${id}`,
    submit: "/hsk-exam-result/submit",
    saveAnswer: "/hsk-exam/save-answer",
    getResult: (examId: string) => `/hsk-exam/result/${examId}`,
  },
};

export default apiConstant;
