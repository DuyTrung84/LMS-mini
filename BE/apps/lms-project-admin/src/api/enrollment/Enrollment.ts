import { Course } from "../course/Course";
import { User } from "../user/User";

export type Enrollment = {
  course?: Course | null;
  createdAt: Date;
  id: string;
  student?: User | null;
  updatedAt: Date;
};
