import { Module } from "@nestjs/common";
import { ProgressModuleBase } from "./base/progress.module.base";
import { ProgressService } from "./progress.service";
import { ProgressController } from "./progress.controller";
import { ProgressResolver } from "./progress.resolver";

@Module({
  imports: [ProgressModuleBase],
  controllers: [ProgressController],
  providers: [ProgressService, ProgressResolver],
  exports: [ProgressService],
})
export class ProgressModule {}
