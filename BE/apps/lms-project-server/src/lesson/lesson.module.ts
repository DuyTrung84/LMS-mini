import { Module } from "@nestjs/common";
import { LessonModuleBase } from "./base/lesson.module.base";
import { LessonService } from "./lesson.service";
import { LessonController } from "./lesson.controller";
import { LessonResolver } from "./lesson.resolver";

@Module({
  imports: [LessonModuleBase],
  controllers: [LessonController],
  providers: [LessonService, LessonResolver],
  exports: [LessonService],
})
export class LessonModule {}
