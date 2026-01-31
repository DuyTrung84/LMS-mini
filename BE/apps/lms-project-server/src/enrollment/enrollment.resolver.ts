import * as graphql from "@nestjs/graphql";
import { EnrollmentResolverBase } from "./base/enrollment.resolver.base";
import { Enrollment } from "./base/Enrollment";
import { EnrollmentService } from "./enrollment.service";

@graphql.Resolver(() => Enrollment)
export class EnrollmentResolver extends EnrollmentResolverBase {
  constructor(protected readonly service: EnrollmentService) {
    super(service);
  }
}
