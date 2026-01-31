import { Lesson as TLesson } from "../api/lesson/Lesson";

export const LESSON_TITLE_FIELD = "title";

export const LessonTitle = (record: TLesson): string => {
  return record.title?.toString() || String(record.id);
};
