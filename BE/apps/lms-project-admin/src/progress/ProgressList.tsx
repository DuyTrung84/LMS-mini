import * as React from "react";

import {
  List,
  Datagrid,
  ListProps,
  BooleanField,
  TextField,
  DateField,
  ReferenceField,
} from "react-admin";

import Pagination from "../Components/Pagination";
import { LESSON_TITLE_FIELD } from "../lesson/LessonTitle";
import { USER_TITLE_FIELD } from "../user/UserTitle";

export const ProgressList = (props: ListProps): React.ReactElement => {
  return (
    <List
      {...props}
      title={"Progresses"}
      perPage={50}
      pagination={<Pagination />}
    >
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <BooleanField label="completed" source="completed" />
        <TextField label="completedAt" source="completedAt" />
        <DateField source="createdAt" label="Created At" />
        <TextField label="ID" source="id" />
        <ReferenceField label="lesson" source="lesson.id" reference="Lesson">
          <TextField source={LESSON_TITLE_FIELD} />
        </ReferenceField>
        <ReferenceField label="student" source="user.id" reference="User">
          <TextField source={USER_TITLE_FIELD} />
        </ReferenceField>
        <DateField source="updatedAt" label="Updated At" />{" "}
      </Datagrid>
    </List>
  );
};
