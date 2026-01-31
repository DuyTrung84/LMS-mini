import * as React from "react";
import {
  List,
  Datagrid,
  ListProps,
  ReferenceField,
  TextField,
  DateField,
} from "react-admin";
import Pagination from "../Components/Pagination";
import { COURSE_TITLE_FIELD } from "../course/CourseTitle";
import { USER_TITLE_FIELD } from "../user/UserTitle";

export const EnrollmentList = (props: ListProps): React.ReactElement => {
  return (
    <List
      {...props}
      title={"Enrollments"}
      perPage={50}
      pagination={<Pagination />}
    >
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <ReferenceField label="course" source="course.id" reference="Course">
          <TextField source={COURSE_TITLE_FIELD} />
        </ReferenceField>
        <DateField source="createdAt" label="Created At" />
        <TextField label="ID" source="id" />
        <ReferenceField label="student" source="user.id" reference="User">
          <TextField source={USER_TITLE_FIELD} />
        </ReferenceField>
        <DateField source="updatedAt" label="Updated At" />{" "}
      </Datagrid>
    </List>
  );
};
