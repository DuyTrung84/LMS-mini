import { EnrollmentUpdateManyWithoutCoursesInput } from "./EnrollmentUpdateManyWithoutCoursesInput";
import { LessonUpdateManyWithoutCoursesInput } from "./LessonUpdateManyWithoutCoursesInput";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type CourseUpdateInput = {
  description?: string | null;
  endDate?: Date | null;
  enrollments?: EnrollmentUpdateManyWithoutCoursesInput;
  lessons?: LessonUpdateManyWithoutCoursesInput;
  startDate?: Date | null;
  teacher?: UserWhereUniqueInput | null;
  title?: string | null;
};
