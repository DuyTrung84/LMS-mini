import { CourseWhereUniqueInput } from "../course/CourseWhereUniqueInput";
import { ProgressUpdateManyWithoutLessonsInput } from "./ProgressUpdateManyWithoutLessonsInput";

export type LessonUpdateInput = {
  content?: string | null;
  course?: CourseWhereUniqueInput | null;
  progresses?: ProgressUpdateManyWithoutLessonsInput;
  title?: string | null;
  typeField?: string | null;
  videoUrl?: string | null;
};
