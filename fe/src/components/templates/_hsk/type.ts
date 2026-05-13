export interface ExamQuestion {
  questionNumber: number;
  part: number;
  type: "true_false" | "single_choice" | "sentence_writing" | string;
  question: string;
  options: string[];
  correctAnswer: boolean | number | string;
  audioStart?: number;
  audioEnd?: number;
  score: number;
  aiGrading: boolean;
}

export interface ExamSection {
  name: string;
  key: string;
  duration: number;
  totalQuestions: number;
  audio: string;
  questions: ExamQuestion[];
}

export interface ExamData {
  _id: string;
  title: string;
  code: string;
  level: number;
  year: string;
  totalQuestions: number;
  totalDuration: number;
  totalScore: number;
  passingScore: number;
  sections: ExamSection[];
}
