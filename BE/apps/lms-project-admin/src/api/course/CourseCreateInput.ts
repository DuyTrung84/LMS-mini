import { EnrollmentCreateNestedManyWithoutCoursesInput } from "./EnrollmentCreateNestedManyWithoutCoursesInput";
import { LessonCreateNestedManyWithoutCoursesInput } from "./LessonCreateNestedManyWithoutCoursesInput";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type CourseCreateInput = {
  description?: string | null;
  endDate?: Date | null;
  enrollments?: EnrollmentCreateNestedManyWithoutCoursesInput;
  lessons?: LessonCreateNestedManyWithoutCoursesInput;
  startDate?: Date | null;
  teacher?: UserWhereUniqueInput | null;
  title?: string | null;
};
