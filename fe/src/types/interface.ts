export interface IUser {
  _id?: string;
  email: string;
  fullName: string;
  password?: string;

  avatar?: string;
  learningGoal?: string;

  studyStreak?: number;
  lastStudyDate?: Date;
  notification?: boolean;

  role: "user" | "admin";
  status?: string;
  deleted?: boolean;

  createdAt?: string;
}

export interface IVocabularyTopic {
  _id: string;
  name: string;
  description: string;
}

export interface IVocabulary {
  _id: string;
  hanzi: string;
  pinyin: string;
  meaning: string;
  example: string;
  exampleMeaning: string;
  level: number;
  radical: string;
  audio: string;
}

export interface IVocabularyResponse {
  vocabularies: IVocabulary[];
  limit: number;
  currentPage: number;
  totalPage: number;
  totalResults: number;
}

// Interface cho từng flashcard deck
export interface IFlashCardDeckItem {
  _id: string;
  title: string;
  topic: string;
  level: string; // "HSK 1", "HSK 2", ...
  userId: string;
  isSystem: boolean;
  cards: number; // tổng số flashcard
  completed: number; // số flashcard đã học
  lastStudied: string; // ví dụ: "Chưa học"
  icon?: string;
  color?: string;
}

// Interface cho response data
export interface IFlashCardDeckData {
  flashcardDecks: IFlashCardDeckItem[];
  pageSize: number;
  currentPage: number;
  totalPage: number;
  totalResults: number;
}

// Interface tổng response API
export interface IFlashCardDeck {
  code: number;
  message: string;
  data: IFlashCardDeckData;
}

// video
export interface IVideoItem {
  _id: string;
  type: string;
  description: string;
  title: string;
  thumbnail?: string;
  videoId?: string;
  videoUrl?: string;
  duration?: number;
  views: number;
  level?: string | number;
  createdBy?: {
    _id: string;
    name?: string;
  };
  author?: string;
  publishedAt?: string;
}

export interface IVideoData {
  videos: IVideoItem[];
  pageSize: number;
  currentPage: number;
  totalPage: number;
  totalResults: number;
}

export interface IVideo {
  code: number;
  message: string;
  data: IVideoData;
}

export interface IVideoNote {
  _id: string;
  userId: string;
  videoId: string;
  time: number;
  content: string;

  createdAt: string;
  updatedAt: string;
}

export interface IVideoProgress {
  _id: string;
  userId: string;
  videoId: string;

  currentTime: number;
  duration: number;
  isCompleted: boolean;

  createdAt: string;
  updatedAt: string;
}

export interface IPhonemeDetail {
  _id: string;
  phoneme: string;
  accuracy: number;
}

export interface IWordPhoneme {
  _id: string;
  word: string;
  phonemes: IPhonemeDetail[];
}

export interface IPronunciationResult {
  _id: string;
  userId: string;
  text: string;

  accuracy: number;
  fluency: number;
  completeness: number;
  pronunciation: number;

  recognizedText: string;

  phonemes: IWordPhoneme[];

  createdAt: string;
  updatedAt: string;
}
