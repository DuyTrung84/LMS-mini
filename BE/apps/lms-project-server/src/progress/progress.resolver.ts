import * as graphql from "@nestjs/graphql";
import { ProgressResolverBase } from "./base/progress.resolver.base";
import { Progress } from "./base/Progress";
import { ProgressService } from "./progress.service";

@graphql.Resolver(() => Progress)
export class ProgressResolver extends ProgressResolverBase {
  constructor(protected readonly service: ProgressService) {
    super(service);
  }
}
