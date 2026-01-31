import { Course as TCourse } from "../api/course/Course";

export const COURSE_TITLE_FIELD = "title";

export const CourseTitle = (record: TCourse): string => {
  return record.title?.toString() || String(record.id);
};
