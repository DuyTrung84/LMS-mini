import { Course } from "../course/Course";
import { Progress } from "../progress/Progress";

export type Lesson = {
  content: string | null;
  course?: Course | null;
  createdAt: Date;
  id: string;
  progresses?: Array<Progress>;
  title: string | null;
  typeField: string | null;
  updatedAt: Date;
  videoUrl: string | null;
};
