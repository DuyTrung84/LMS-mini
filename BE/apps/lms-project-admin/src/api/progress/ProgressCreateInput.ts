import { LessonWhereUniqueInput } from "../lesson/LessonWhereUniqueInput";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type ProgressCreateInput = {
  completed?: boolean | null;
  completedAt?: Date | null;
  lesson?: LessonWhereUniqueInput | null;
  student?: UserWhereUniqueInput | null;
};
