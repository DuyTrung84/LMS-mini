import { LessonWhereInput } from "./LessonWhereInput";
import { LessonOrderByInput } from "./LessonOrderByInput";

export type LessonFindManyArgs = {
  where?: LessonWhereInput;
  orderBy?: Array<LessonOrderByInput>;
  skip?: number;
  take?: number;
};
