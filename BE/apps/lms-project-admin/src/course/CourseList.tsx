import * as React from "react";
import {
  List,
  Datagrid,
  ListProps,
  DateField,
  TextField,
  ReferenceField,
} from "react-admin";
import Pagination from "../Components/Pagination";
import { USER_TITLE_FIELD } from "../user/UserTitle";

export const CourseList = (props: ListProps): React.ReactElement => {
  return (
    <List {...props} title={"Courses"} perPage={50} pagination={<Pagination />}>
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
        <DateField source="updatedAt" label="Updated At" />{" "}
      </Datagrid>
    </List>
  );
};
