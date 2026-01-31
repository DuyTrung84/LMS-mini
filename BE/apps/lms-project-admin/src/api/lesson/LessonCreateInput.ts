import { CourseWhereUniqueInput } from "../course/CourseWhereUniqueInput";
import { ProgressCreateNestedManyWithoutLessonsInput } from "./ProgressCreateNestedManyWithoutLessonsInput";

export type LessonCreateInput = {
  content?: string | null;
  course?: CourseWhereUniqueInput | null;
  progresses?: ProgressCreateNestedManyWithoutLessonsInput;
  title?: string | null;
  typeField?: string | null;
  videoUrl?: string | null;
};
