import { EnrollmentCreateNestedManyWithoutUsersInput } from "./EnrollmentCreateNestedManyWithoutUsersInput";
import { ProgressCreateNestedManyWithoutUsersInput } from "./ProgressCreateNestedManyWithoutUsersInput";
import { InputJsonValue } from "../../types";
import { CourseCreateNestedManyWithoutUsersInput } from "./CourseCreateNestedManyWithoutUsersInput";

export type UserCreateInput = {
  email?: string | null;
  enrollments?: EnrollmentCreateNestedManyWithoutUsersInput;
  firstName?: string | null;
  lastName?: string | null;
  password: string;
  progresses?: ProgressCreateNestedManyWithoutUsersInput;
  roles: InputJsonValue;
  teachingCourses?: CourseCreateNestedManyWithoutUsersInput;
  username: string;
};
