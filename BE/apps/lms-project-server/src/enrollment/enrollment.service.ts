import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { EnrollmentServiceBase } from "./base/enrollment.service.base";

@Injectable()
export class EnrollmentService extends EnrollmentServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
