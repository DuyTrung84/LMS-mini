import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Prisma, Video } from "@prisma/client";

@Injectable()
export class VideoService {
    constructor(protected readonly prisma: PrismaService) { }

    async create(args: Prisma.VideoCreateArgs): Promise<Video> {
        return this.prisma.video.create(args);
    }

    async findMany(args: Prisma.VideoFindManyArgs): Promise<Video[]> {
        return this.prisma.video.findMany(args);
    }

    async findOne(args: Prisma.VideoFindUniqueArgs): Promise<Video | null> {
        return this.prisma.video.findUnique(args);
    }

    async update(args: Prisma.VideoUpdateArgs): Promise<Video> {
        return this.prisma.video.update(args);
    }

    async delete(args: Prisma.VideoDeleteArgs): Promise<Video> {
        return this.prisma.video.delete(args);
    }
}
