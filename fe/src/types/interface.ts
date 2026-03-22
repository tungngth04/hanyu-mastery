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
