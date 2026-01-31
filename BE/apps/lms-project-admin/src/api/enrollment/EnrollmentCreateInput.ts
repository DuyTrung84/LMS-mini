import { CourseWhereUniqueInput } from "../course/CourseWhereUniqueInput";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type EnrollmentCreateInput = {
  course?: CourseWhereUniqueInput | null;
  student?: UserWhereUniqueInput | null;
};
