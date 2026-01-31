import { Enrollment as TEnrollment } from "../api/enrollment/Enrollment";

export const ENROLLMENT_TITLE_FIELD = "id";

export const EnrollmentTitle = (record: TEnrollment): string => {
  return record.id?.toString() || String(record.id);
};
