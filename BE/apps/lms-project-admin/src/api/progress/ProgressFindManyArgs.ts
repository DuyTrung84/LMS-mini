import { ProgressWhereInput } from "./ProgressWhereInput";
import { ProgressOrderByInput } from "./ProgressOrderByInput";

export type ProgressFindManyArgs = {
  where?: ProgressWhereInput;
  orderBy?: Array<ProgressOrderByInput>;
  skip?: number;
  take?: number;
};
