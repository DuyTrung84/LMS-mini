import { StringNullableFilter } from "../../util/StringNullableFilter";
import { EnrollmentListRelationFilter } from "../enrollment/EnrollmentListRelationFilter";
import { StringFilter } from "../../util/StringFilter";
import { ProgressListRelationFilter } from "../progress/ProgressListRelationFilter";
import { CourseListRelationFilter } from "../course/CourseListRelationFilter";

export type UserWhereInput = {
  email?: StringNullableFilter;
  enrollments?: EnrollmentListRelationFilter;
  firstName?: StringNullableFilter;
  id?: StringFilter;
  lastName?: StringNullableFilter;
  progresses?: ProgressListRelationFilter;
  teachingCourses?: CourseListRelationFilter;
  username?: StringFilter;
};
