import * as Yup from 'yup';

export const initialValues = {
  userName: '',
  password: '',
};

export const validationSchema = Yup.object().shape({
  userName: Yup.string()
    .max(50, "Username can't more than 50 characters")
    .required("Username required"),
  password: Yup.string()
    .max(50, "Password can't more than 50 characters")
    .required("Password required")
});