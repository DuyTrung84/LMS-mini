import { Lesson } from "../lesson/Lesson";
import { User } from "../user/User";

export type Progress = {
  completed: boolean | null;
  completedAt: Date | null;
  createdAt: Date;
  id: string;
  lesson?: Lesson | null;
  student?: User | null;
  updatedAt: Date;
};
