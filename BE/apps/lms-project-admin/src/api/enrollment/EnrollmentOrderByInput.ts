import { SortOrder } from "../../util/SortOrder";

export type EnrollmentOrderByInput = {
  courseId?: SortOrder;
  createdAt?: SortOrder;
  id?: SortOrder;
  studentId?: SortOrder;
  updatedAt?: SortOrder;
};
