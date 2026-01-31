import * as React from "react";
import {
  Create,
  SimpleForm,
  CreateProps,
  ReferenceInput,
  SelectInput,
} from "react-admin";
import { CourseTitle } from "../course/CourseTitle";
import { UserTitle } from "../user/UserTitle";

export const EnrollmentCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <ReferenceInput source="course.id" reference="Course" label="course">
          <SelectInput optionText={CourseTitle} />
        </ReferenceInput>
        <ReferenceInput source="student.id" reference="User" label="student">
          <SelectInput optionText={UserTitle} />
        </ReferenceInput>
      </SimpleForm>
    </Create>
  );
};
