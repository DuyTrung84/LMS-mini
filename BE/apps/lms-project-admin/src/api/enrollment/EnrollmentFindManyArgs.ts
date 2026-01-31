import { EnrollmentWhereInput } from "./EnrollmentWhereInput";
import { EnrollmentOrderByInput } from "./EnrollmentOrderByInput";

export type EnrollmentFindManyArgs = {
  where?: EnrollmentWhereInput;
  orderBy?: Array<EnrollmentOrderByInput>;
  skip?: number;
  take?: number;
};
