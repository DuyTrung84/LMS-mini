import { StringNullableFilter } from "../../util/StringNullableFilter";
import { CourseWhereUniqueInput } from "../course/CourseWhereUniqueInput";
import { StringFilter } from "../../util/StringFilter";
import { ProgressListRelationFilter } from "../progress/ProgressListRelationFilter";

export type LessonWhereInput = {
  content?: StringNullableFilter;
  course?: CourseWhereUniqueInput;
  id?: StringFilter;
  progresses?: ProgressListRelationFilter;
  title?: StringNullableFilter;
  typeField?: StringNullableFilter;
  videoUrl?: StringNullableFilter;
};
