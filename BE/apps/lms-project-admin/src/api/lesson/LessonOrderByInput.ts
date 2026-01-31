import { SortOrder } from "../../util/SortOrder";

export type LessonOrderByInput = {
  content?: SortOrder;
  courseId?: SortOrder;
  createdAt?: SortOrder;
  id?: SortOrder;
  title?: SortOrder;
  typeField?: SortOrder;
  updatedAt?: SortOrder;
  videoUrl?: SortOrder;
};
