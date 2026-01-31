import * as React from "react";

import {
  Create,
  SimpleForm,
  CreateProps,
  BooleanInput,
  DateTimeInput,
  ReferenceInput,
  SelectInput,
} from "react-admin";

import { LessonTitle } from "../lesson/LessonTitle";
import { UserTitle } from "../user/UserTitle";

export const ProgressCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <BooleanInput label="completed" source="completed" />
        <DateTimeInput label="completedAt" source="completedAt" />
        <ReferenceInput source="lesson.id" reference="Lesson" label="lesson">
          <SelectInput optionText={LessonTitle} />
        </ReferenceInput>
        <ReferenceInput source="student.id" reference="User" label="student">
          <SelectInput optionText={UserTitle} />
        </ReferenceInput>
      </SimpleForm>
    </Create>
  );
};
