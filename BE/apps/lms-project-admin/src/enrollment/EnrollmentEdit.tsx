import * as React from "react";
import {
  Edit,
  SimpleForm,
  EditProps,
  ReferenceInput,
  SelectInput,
} from "react-admin";
import { CourseTitle } from "../course/CourseTitle";
import { UserTitle } from "../user/UserTitle";

export const EnrollmentEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <ReferenceInput source="course.id" reference="Course" label="course">
          <SelectInput optionText={CourseTitle} />
        </ReferenceInput>
        <ReferenceInput source="student.id" reference="User" label="student">
          <SelectInput optionText={UserTitle} />
        </ReferenceInput>
      </SimpleForm>
    </Edit>
  );
};
