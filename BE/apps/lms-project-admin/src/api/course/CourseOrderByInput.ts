import { SortOrder } from "../../util/SortOrder";

export type CourseOrderByInput = {
  createdAt?: SortOrder;
  description?: SortOrder;
  endDate?: SortOrder;
  id?: SortOrder;
  startDate?: SortOrder;
  teacherId?: SortOrder;
  title?: SortOrder;
  updatedAt?: SortOrder;
};
