import { EnrollmentUpdateManyWithoutUsersInput } from "./EnrollmentUpdateManyWithoutUsersInput";
import { ProgressUpdateManyWithoutUsersInput } from "./ProgressUpdateManyWithoutUsersInput";
import { InputJsonValue } from "../../types";
import { CourseUpdateManyWithoutUsersInput } from "./CourseUpdateManyWithoutUsersInput";

export type UserUpdateInput = {
  email?: string | null;
  enrollments?: EnrollmentUpdateManyWithoutUsersInput;
  firstName?: string | null;
  lastName?: string | null;
  password?: string;
  progresses?: ProgressUpdateManyWithoutUsersInput;
  roles?: InputJsonValue;
  teachingCourses?: CourseUpdateManyWithoutUsersInput;
  username?: string;
};
