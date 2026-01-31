import { Progress as TProgress } from "../api/progress/Progress";

export const PROGRESS_TITLE_FIELD = "id";

export const ProgressTitle = (record: TProgress): string => {
  return record.id?.toString() || String(record.id);
};
