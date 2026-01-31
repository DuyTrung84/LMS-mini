import * as React from "react";
import {
  List,
  Datagrid,
  ListProps,
  TextField,
  ReferenceField,
  DateField,
} from "react-admin";
import Pagination from "../Components/Pagination";
import { COURSE_TITLE_FIELD } from "../course/CourseTitle";

export const LessonList = (props: ListProps): React.ReactElement => {
  return (
    <List {...props} title={"Lessons"} perPage={50} pagination={<Pagination />}>
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField label="content" source="content" />
        <ReferenceField label="course" source="course.id" reference="Course">
          <TextField source={COURSE_TITLE_FIELD} />
        </ReferenceField>
        <DateField source="createdAt" label="Created At" />
        <TextField label="ID" source="id" />
        <TextField label="title" source="title" />
        <TextField label="type" source="typeField" />
        <DateField source="updatedAt" label="Updated At" />
        <TextField label="videoUrl" source="videoUrl" />{" "}
      </Datagrid>
    </List>
  );
};
