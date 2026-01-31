import * as React from "react";

import {
  Edit,
  SimpleForm,
  EditProps,
  TextInput,
  DateTimeInput,
  ReferenceArrayInput,
  SelectArrayInput,
  ReferenceInput,
  SelectInput,
} from "react-admin";

import { EnrollmentTitle } from "../enrollment/EnrollmentTitle";
import { LessonTitle } from "../lesson/LessonTitle";
import { UserTitle } from "../user/UserTitle";

export const CourseEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput label="description" multiline source="description" />
        <DateTimeInput label="endDate" source="endDate" />
        <ReferenceArrayInput source="enrollments" reference="Enrollment">
          <SelectArrayInput
            optionText={EnrollmentTitle}
            parse={(value: any) => value && value.map((v: any) => ({ id: v }))}
            format={(value: any) => value && value.map((v: any) => v.id)}
          />
        </ReferenceArrayInput>
        <ReferenceArrayInput source="lessons" reference="Lesson">
          <SelectArrayInput
            optionText={LessonTitle}
            parse={(value: any) => value && value.map((v: any) => ({ id: v }))}
            format={(value: any) => value && value.map((v: any) => v.id)}
          />
        </ReferenceArrayInput>
        <DateTimeInput label="startDate" source="startDate" />
        <ReferenceInput source="teacher.id" reference="User" label="teacher">
          <SelectInput optionText={UserTitle} />
        </ReferenceInput>
        <TextInput label="title" source="title" />
      </SimpleForm>
    </Edit>
  );
};
