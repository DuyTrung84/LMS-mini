import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import { QuestionService } from "./question.service";
import { Question } from "@prisma/client";

@swagger.ApiTags("questions")
@common.Controller("questions")
export class QuestionController {
    constructor(protected readonly service: QuestionService) { }

    @common.Post()
    async create(@common.Body() data: any): Promise<Question> {
        const { id, createdAt, updatedAt, ...rest } = data;
        return this.service.create({
            data: rest,
        });
    }

    @common.Get()
    async findMany(@common.Query() query: any): Promise<Question[]> {
        return this.service.findMany({
            where: query
        });
    }

    @common.Get("/:id")
    async findOne(@common.Param("id") id: string): Promise<Question | null> {
        return this.service.findOne({
            where: { id },
        });
    }

    @common.Patch("/:id")
    async update(
        @common.Param("id") id: string,
        @common.Body() data: any
    ): Promise<Question> {
        const { id: _id, ...rest } = data;
        return this.service.update({
            where: { id },
            data: rest,
        });
    }

    @common.Delete("/:id")
    async delete(@common.Param("id") id: string): Promise<Question> {
        return this.service.delete({
            where: { id },
        });
    }
}
