import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import { ProgressService } from "./progress.service";
import { ProgressControllerBase } from "./base/progress.controller.base";

@swagger.ApiTags("progresses")
@common.Controller("progresses")
export class ProgressController extends ProgressControllerBase {
  constructor(protected readonly service: ProgressService) {
    super(service);
  }
}
