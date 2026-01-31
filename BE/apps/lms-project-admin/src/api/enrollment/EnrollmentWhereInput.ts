import { CourseWhereUniqueInput } from "../course/CourseWhereUniqueInput";
import { StringFilter } from "../../util/StringFilter";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type EnrollmentWhereInput = {
  course?: CourseWhereUniqueInput;
  id?: StringFilter;
  student?: UserWhereUniqueInput;
};
