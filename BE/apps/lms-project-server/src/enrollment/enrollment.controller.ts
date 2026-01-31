import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import { EnrollmentService } from "./enrollment.service";
import { EnrollmentControllerBase } from "./base/enrollment.controller.base";

@swagger.ApiTags("enrollments")
@common.Controller("enrollments")
export class EnrollmentController extends EnrollmentControllerBase {
  constructor(protected readonly service: EnrollmentService) {
    super(service);
  }
}
