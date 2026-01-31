import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Question, Prisma } from "@prisma/client";

@Injectable()
export class QuestionService {
    constructor(protected readonly prisma: PrismaService) { }

    async create<T extends Prisma.QuestionCreateArgs>(
        args: Prisma.SelectSubset<T, Prisma.QuestionCreateArgs>
    ): Promise<Question> {
        return this.prisma.question.create<T>(args);
    }

    async findMany<T extends Prisma.QuestionFindManyArgs>(
        args: Prisma.SelectSubset<T, Prisma.QuestionFindManyArgs>
    ): Promise<Question[]> {
        return this.prisma.question.findMany(args) as unknown as Question[];
    }

    async findOne<T extends Prisma.QuestionFindUniqueArgs>(
        args: Prisma.SelectSubset<T, Prisma.QuestionFindUniqueArgs>
    ): Promise<Question | null> {
        return this.prisma.question.findUnique(args);
    }

    async update<T extends Prisma.QuestionUpdateArgs>(
        args: Prisma.SelectSubset<T, Prisma.QuestionUpdateArgs>
    ): Promise<Question> {
        return this.prisma.question.update<T>(args);
    }

    async delete<T extends Prisma.QuestionDeleteArgs>(
        args: Prisma.SelectSubset<T, Prisma.QuestionDeleteArgs>
    ): Promise<Question> {
        return this.prisma.question.delete(args);
    }
}
