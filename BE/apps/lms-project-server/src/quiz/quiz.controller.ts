import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import { QuizService } from "./quiz.service";
import { Quiz } from "@prisma/client";

@swagger.ApiTags("quizzes")
@common.Controller("quizzes")
export class QuizController {
    constructor(protected readonly service: QuizService) { }

    @common.Post()
    async create(@common.Body() data: any): Promise<Quiz> {
        // Basic implementation - ideally use DTOs
        // Removing 'id' and 'createdAt/updatedAt' if frontend sends them by mistake
        const { id, createdAt, updatedAt, ...rest } = data;
        return this.service.create({
            data: rest,
        });
    }

    @common.Get()
    async findMany(@common.Query() query: any): Promise<Quiz[]> {
        return this.service.findMany({
            where: query
        });
    }

    @common.Get("/:id")
    async findOne(@common.Param("id") id: string): Promise<Quiz | null> {
        return this.service.findOne({
            where: { id },
        });
    }

    @common.Patch("/:id")
    async update(
        @common.Param("id") id: string,
        @common.Body() data: any
    ): Promise<Quiz> {
        const { id: _id, ...rest } = data;
        return this.service.update({
            where: { id },
            data: rest,
        });
    }

    @common.Delete("/:id")
    async delete(@common.Param("id") id: string): Promise<Quiz> {
        return this.service.delete({
            where: { id },
        });
    }
}
