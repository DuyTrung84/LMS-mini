import { Enrollment } from "../enrollment/Enrollment";
import { Lesson } from "../lesson/Lesson";
import { User } from "../user/User";

export type Course = {
  createdAt: Date;
  description: string | null;
  endDate: Date | null;
  enrollments?: Array<Enrollment>;
  id: string;
  lessons?: Array<Lesson>;
  startDate: Date | null;
  teacher?: User | null;
  title: string | null;
  updatedAt: Date;
};
