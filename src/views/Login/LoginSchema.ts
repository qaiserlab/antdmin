import * as Yup from 'yup'

export const initialValues = {
  username: '',
  password: '',
}

export const validationSchema = Yup.object().shape({
  username: Yup.string()
    .max(100, "Username can't more than 100 characters")
    .required("Username required"),
  password: Yup.string()
    .max(100, "Password can't more than 100 characters")
    .required("Password required")
})