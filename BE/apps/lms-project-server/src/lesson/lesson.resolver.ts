import * as graphql from "@nestjs/graphql";
import { LessonResolverBase } from "./base/lesson.resolver.base";
import { Lesson } from "./base/Lesson";
import { LessonService } from "./lesson.service";

@graphql.Resolver(() => Lesson)
export class LessonResolver extends LessonResolverBase {
  constructor(protected readonly service: LessonService) {
    super(service);
  }
}
