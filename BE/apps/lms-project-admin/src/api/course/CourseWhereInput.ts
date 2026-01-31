import { StringNullableFilter } from "../../util/StringNullableFilter";
import { DateTimeNullableFilter } from "../../util/DateTimeNullableFilter";
import { EnrollmentListRelationFilter } from "../enrollment/EnrollmentListRelationFilter";
import { StringFilter } from "../../util/StringFilter";
import { LessonListRelationFilter } from "../lesson/LessonListRelationFilter";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type CourseWhereInput = {
  description?: StringNullableFilter;
  endDate?: DateTimeNullableFilter;
  enrollments?: EnrollmentListRelationFilter;
  id?: StringFilter;
  lessons?: LessonListRelationFilter;
  startDate?: DateTimeNullableFilter;
  teacher?: UserWhereUniqueInput;
  title?: StringNullableFilter;
};
