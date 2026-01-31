import * as React from "react";

import {
  Show,
  SimpleShowLayout,
  ShowProps,
  TextField,
  ReferenceField,
  DateField,
  ReferenceManyField,
  Datagrid,
  BooleanField,
} from "react-admin";

import { LESSON_TITLE_FIELD } from "./LessonTitle";
import { USER_TITLE_FIELD } from "../user/UserTitle";
import { COURSE_TITLE_FIELD } from "../course/CourseTitle";

export const LessonShow = (props: ShowProps): React.ReactElement => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <TextField label="content" source="content" />
        <ReferenceField label="course" source="course.id" reference="Course">
          <TextField source={COURSE_TITLE_FIELD} />
        </ReferenceField>
        <DateField source="createdAt" label="Created At" />
        <TextField label="ID" source="id" />
        <TextField label="title" source="title" />
        <TextField label="type" source="typeField" />
        <DateField source="updatedAt" label="Updated At" />
        <TextField label="videoUrl" source="videoUrl" />
        <ReferenceManyField
          reference="Progress"
          target="lessonId"
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
      </SimpleShowLayout>
    </Show>
  );
};
