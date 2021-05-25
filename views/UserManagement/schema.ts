import * as Yup from 'yup';

export interface PropsInterface {
  isNew: boolean;
  id?: string;
};

export interface UserRecordInterface {
  id: string;
  fullName: string;
  userName: string;
  email: string;
  phoneNumber: string;
}

export const initialValues = {
  firstName: '',
  lastName: '',
  userName: '',
  email: '',
  phoneNumber: '',
}

export const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .max(50, "First Name can't more than 50 characters")
    .required("First Name required"),
  lastName: Yup.string(),
  userName: Yup.string()
    .max(50, "Username can't more than 50 characters")
    .required("Username required"),
  email: Yup.string()
    .max(50, "Email can't more than 50 characters")
    .required("Email required")
    .email("Invalid Email format"),
  phoneNumber: Yup.string(),
});