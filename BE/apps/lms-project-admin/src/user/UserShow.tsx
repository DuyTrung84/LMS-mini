import * as React from "react";

import {
  Show,
  SimpleShowLayout,
  ShowProps,
  DateField,
  TextField,
  ReferenceManyField,
  Datagrid,
  ReferenceField,
  BooleanField,
} from "react-admin";

import { COURSE_TITLE_FIELD } from "../course/CourseTitle";
import { USER_TITLE_FIELD } from "./UserTitle";
import { LESSON_TITLE_FIELD } from "../lesson/LessonTitle";

export const UserShow = (props: ShowProps): React.ReactElement => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <DateField source="createdAt" label="Created At" />
        <TextField label="Email" source="email" />
        <TextField label="First Name" source="firstName" />
        <TextField label="ID" source="id" />
        <TextField label="Last Name" source="lastName" />
        <TextField label="Roles" source="roles" />
        <DateField source="updatedAt" label="Updated At" />
        <TextField label="Username" source="username" />
        <ReferenceManyField
          reference="Enrollment"
          target="studentId"
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
          reference="Progress"
          target="studentId"
          label="Progresses"
        >
          <Datagrid rowClick="show" bulkActionButtons={false}>
            <BooleanField label="completed" source="completed" />
            <TextField label="completedAt" source="completedAt" />
            <DateField source="createdAt" label="Created At" />
            <TextField label="ID" source="id" />
            <ReferenceField
              label="lesson"
              source="lesson.id"
              reference="Lesson"
            >
              <TextField source={LESSON_TITLE_FIELD} />
            </ReferenceField>
            <ReferenceField label="student" source="user.id" reference="User">
              <TextField source={USER_TITLE_FIELD} />
            </ReferenceField>
            <DateField source="updatedAt" label="Updated At" />
          </Datagrid>
        </ReferenceManyField>
        <ReferenceManyField
          reference="Course"
          target="teacherId"
          label="Courses"
        >
          <Datagrid rowClick="show" bulkActionButtons={false}>
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
          </Datagrid>
        </ReferenceManyField>
      </SimpleShowLayout>
    </Show>
  );
};
