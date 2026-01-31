import { Enrollment } from "../enrollment/Enrollment";
import { Progress } from "../progress/Progress";
import { JsonValue } from "type-fest";
import { Course } from "../course/Course";

export type User = {
  createdAt: Date;
  email: string | null;
  enrollments?: Array<Enrollment>;
  firstName: string | null;
  id: string;
  lastName: string | null;
  progresses?: Array<Progress>;
  roles: JsonValue;
  teachingCourses?: Array<Course>;
  updatedAt: Date;
  username: string;
};
