import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { CourseModule } from "./course/course.module";
import { LessonModule } from "./lesson/lesson.module";
import { EnrollmentModule } from "./enrollment/enrollment.module";
import { ProgressModule } from "./progress/progress.module";
import { HealthModule } from "./health/health.module";
import { QuizModule } from "./quiz/quiz.module";
import { QuestionModule } from "./question/question.module";
import { VideoModule } from "./video/video.module";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./auth/auth.module";
import { SecretsManagerModule } from "./providers/secrets/secretsManager.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { ServeStaticOptionsService } from "./serveStaticOptions.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import * as nestAccessControl from "nest-access-control";
import { roles } from "./app.roles";

@Module({
  controllers: [],
  imports: [
    UserModule,
    CourseModule,
    LessonModule,
    EnrollmentModule,
    EnrollmentModule,
    ProgressModule,
    QuizModule,
    QuestionModule,
    VideoModule,
    HealthModule,
    PrismaModule,
    AuthModule,
    nestAccessControl.AccessControlModule.forRoles(roles),
    SecretsManagerModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRootAsync({
      useClass: ServeStaticOptionsService,
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: (configService: ConfigService) => {
        const playground = configService.get("GRAPHQL_PLAYGROUND");
        const introspection = configService.get("GRAPHQL_INTROSPECTION");
        return {
          autoSchemaFile: "schema.graphql",
          sortSchema: true,
          playground,
          introspection: playground || introspection,
        };
      },
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
  ],
  providers: [],
})
export class AppModule { }
