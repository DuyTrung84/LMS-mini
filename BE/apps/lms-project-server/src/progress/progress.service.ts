import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { ProgressServiceBase } from "./base/progress.service.base";

@Injectable()
export class ProgressService extends ProgressServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
