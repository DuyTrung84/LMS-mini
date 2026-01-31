import * as React from "react";

import {
  Show,
  SimpleShowLayout,
  ShowProps,
  DateField,
  TextField,
  ReferenceField,
  ReferenceManyField,
  Datagrid,
} from "react-admin";

import { COURSE_TITLE_FIELD } from "./CourseTitle";
import { USER_TITLE_FIELD } from "../user/UserTitle";

export const CourseShow = (props: ShowProps): React.ReactElement => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <DateField source="createdAt" label="Created At" />
        <TextField label="description" source="description" />
        <TextField label="endDate" source="endDate" />
        <TextField label="ID" source="id" />
        <TextField label="startDate" source="startDate" />
        <ReferenceField label="teacher" source="user.id" reference="User">
          <TextField source={USER_TITLE_FIELD} />
        </ReferenceField>
        <TextField label="title" source="title" />
        <DateField source="updatedAt" label="Updated At" />
        <ReferenceManyField
          reference="Enrollment"
          target="courseId"
          label="Enrollments"
        >
          <Datagrid rowClick="show" bulkActionButtons={false}>
            <ReferenceField
              label="course"
              source="course.id"
              reference="Course"
            >
              <TextField source={COURSE_TITLE_FIELD} />
            </ReferenceField>
            <DateField source="createdAt" label="Created At" />
            <TextField label="ID" source="id" />
            <ReferenceField label="student" source="user.id" reference="User">
              <TextField source={USER_TITLE_FIELD} />
            </ReferenceField>
            <DateField source="updatedAt" label="Updated At" />
          </Datagrid>
        </ReferenceManyField>
        <ReferenceManyField
          reference="Lesson"
          target="courseId"
          label="Lessons"
        >
          <Datagrid rowClick="show" bulkActionButtons={false}>
            <TextField label="content" source="content" />
            <ReferenceField
              label="course"
              source="course.id"
              reference="Course"
            >
              <TextField source={COURSE_TITLE_FIELD} />
            </ReferenceField>
            <DateField source="createdAt" label="Created At" />
            <TextField label="ID" source="id" />
            <TextField label="title" source="title" />
            <TextField label="type" source="typeField" />
            <DateField source="updatedAt" label="Updated At" />
            <TextField label="videoUrl" source="videoUrl" />
          </Datagrid>
        </ReferenceManyField>
      </SimpleShowLayout>
    </Show>
  );
};
