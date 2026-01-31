import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CourseServiceBase } from "./base/course.service.base";
import { Course, Prisma } from "@prisma/client";

@Injectable()
export class CourseService extends CourseServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  async courses<T extends Prisma.CourseFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.CourseFindManyArgs>
  ): Promise<Course[]> {
    const { select, ...restArgs } = args as any;

    // Force include _count if select is present, otherwise standard include
    const queryArgs: any = {
      ...restArgs,
    };

    if (select) {
      // If select is present, we must remove 'lessonCount' from it because it's calculated
      const { lessonCount, ...restSelect } = select as any;
      queryArgs.select = {
        ...restSelect,
        _count: {
          select: { lessons: true },
        },
      };

      // If only lessonCount was selected, ensure we select id or something to keep object valid
      if (Object.keys(restSelect).length === 0) {
        queryArgs.select.id = true;
      }
    } else {
      queryArgs.include = {
        ...(args.include as any),
        _count: {
          select: { lessons: true },
        },
      };
    }

    const results = await this.prisma.course.findMany(queryArgs);

    return results.map((course: any) => ({
      ...course,
      lessonCount: course._count?.lessons ?? course.lessonCount ?? 0,
    })) as unknown as Course[];
  }
}
