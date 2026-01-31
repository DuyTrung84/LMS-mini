import { BooleanNullableFilter } from "../../util/BooleanNullableFilter";
import { DateTimeNullableFilter } from "../../util/DateTimeNullableFilter";
import { StringFilter } from "../../util/StringFilter";
import { LessonWhereUniqueInput } from "../lesson/LessonWhereUniqueInput";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type ProgressWhereInput = {
  completed?: BooleanNullableFilter;
  completedAt?: DateTimeNullableFilter;
  id?: StringFilter;
  lesson?: LessonWhereUniqueInput;
  student?: UserWhereUniqueInput;
};
