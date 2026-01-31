import { CourseWhereUniqueInput } from "../course/CourseWhereUniqueInput";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type EnrollmentUpdateInput = {
  course?: CourseWhereUniqueInput | null;
  student?: UserWhereUniqueInput | null;
};
