import * as React from "react";

import {
  Edit,
  SimpleForm,
  EditProps,
  TextInput,
  ReferenceInput,
  SelectInput,
  ReferenceArrayInput,
  SelectArrayInput,
} from "react-admin";

import { CourseTitle } from "../course/CourseTitle";
import { ProgressTitle } from "../progress/ProgressTitle";

export const LessonEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput label="content" source="content" />
        <ReferenceInput source="course.id" reference="Course" label="course">
          <SelectInput optionText={CourseTitle} />
        </ReferenceInput>
        <ReferenceArrayInput source="progresses" reference="Progress">
          <SelectArrayInput
            optionText={ProgressTitle}
            parse={(value: any) => value && value.map((v: any) => ({ id: v }))}
            format={(value: any) => value && value.map((v: any) => v.id)}
          />
        </ReferenceArrayInput>
        <TextInput label="title" source="title" />
        <TextInput label="type" source="typeField" />
        <TextInput label="videoUrl" source="videoUrl" />
      </SimpleForm>
    </Edit>
  );
};
