import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Quiz, Prisma } from "@prisma/client";

@Injectable()
export class QuizService {
    constructor(protected readonly prisma: PrismaService) { }

    async create<T extends Prisma.QuizCreateArgs>(
        args: Prisma.SelectSubset<T, Prisma.QuizCreateArgs>
    ): Promise<Quiz> {
        return this.prisma.quiz.create<T>(args);
    }

    async findMany<T extends Prisma.QuizFindManyArgs>(
        args: Prisma.SelectSubset<T, Prisma.QuizFindManyArgs>
    ): Promise<Quiz[]> {
        return this.prisma.quiz.findMany(args) as unknown as Quiz[];
    }

    async findOne<T extends Prisma.QuizFindUniqueArgs>(
        args: Prisma.SelectSubset<T, Prisma.QuizFindUniqueArgs>
    ): Promise<Quiz | null> {
        return this.prisma.quiz.findUnique(args);
    }

    async update<T extends Prisma.QuizUpdateArgs>(
        args: Prisma.SelectSubset<T, Prisma.QuizUpdateArgs>
    ): Promise<Quiz> {
        return this.prisma.quiz.update<T>(args);
    }

    async delete<T extends Prisma.QuizDeleteArgs>(
        args: Prisma.SelectSubset<T, Prisma.QuizDeleteArgs>
    ): Promise<Quiz> {
        return this.prisma.quiz.delete(args);
    }
}
