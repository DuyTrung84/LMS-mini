import { SortOrder } from "../../util/SortOrder";

export type ProgressOrderByInput = {
  completed?: SortOrder;
  completedAt?: SortOrder;
  createdAt?: SortOrder;
  id?: SortOrder;
  lessonId?: SortOrder;
  studentId?: SortOrder;
  updatedAt?: SortOrder;
};
