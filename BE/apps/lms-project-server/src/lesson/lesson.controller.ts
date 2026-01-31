import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import { LessonService } from "./lesson.service";
import { LessonControllerBase } from "./base/lesson.controller.base";

@swagger.ApiTags("lessons")
@common.Controller("lessons")
export class LessonController extends LessonControllerBase {
  constructor(protected readonly service: LessonService) {
    super(service);
  }
}
