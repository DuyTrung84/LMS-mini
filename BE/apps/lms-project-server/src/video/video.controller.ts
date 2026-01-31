import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { VideoService } from "./video.service";
import { Prisma, Video } from "@prisma/client";
import { DefaultAuthGuard } from "../auth/defaultAuth.guard";

@swagger.ApiTags("videos")
@common.Controller("videos")
export class VideoController {
    constructor(
        protected readonly service: VideoService
    ) { }

    @common.UseGuards(DefaultAuthGuard, nestAccessControl.ACGuard)
    @common.Post()
    @nestAccessControl.UseRoles({
        resource: "Video",
        action: "create",
        possession: "any",
    })
    async create(@common.Body() data: any): Promise<Video> {
        // Basic DTO handling, assuming data comes in correct structure
        // We should validate, but for speed we'll trust the FE sends correct data matching Prisma types
        return this.service.create({
            data: {
                title: data.title,
                url: data.url,
                duration: data.duration,
                lesson: data.lesson ? { connect: data.lesson } : undefined
            },
        });
    }

    @common.UseGuards(DefaultAuthGuard, nestAccessControl.ACGuard)
    @common.Get()
    @nestAccessControl.UseRoles({
        resource: "Video",
        action: "read",
        possession: "any",
    })
    async findMany(@common.Req() request: any): Promise<Video[]> {
        const args = request.query;
        return this.service.findMany({
            where: {
                lessonId: args.lessonId ? String(args.lessonId) : undefined
            }
        });
    }

    @common.Get("/:id")
    async findOne(@common.Param("id") id: string): Promise<Video | null> {
        return this.service.findOne({
            where: { id },
        });
    }

    @common.Patch("/:id")
    async update(
        @common.Param("id") id: string,
        @common.Body() data: any
    ): Promise<Video> {
        return this.service.update({
            where: { id },
            data: {
                title: data.title,
                url: data.url,
                duration: data.duration
            },
        });
    }

    @common.Delete("/:id")
    async delete(@common.Param("id") id: string): Promise<Video> {
        return this.service.delete({
            where: { id },
        });
    }
}
