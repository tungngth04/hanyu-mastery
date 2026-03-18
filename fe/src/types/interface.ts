export interface IUser {
  _id?: string;
  email: string;
  fullname: string;
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
