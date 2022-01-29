import * as Yup from 'yup'

export interface TProps {
  isNew: boolean
  id?: string
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
  newPassword: Yup.string()
    .max(50, "New Password can't more than 50 characters")
    .required("New Password required"),
  confirmNewPassword: Yup.string()
    .max(50, "Confirm New Password can't more than 50 characters")
    .required("Confirm New Password required"),
  phoneNumber: Yup.string(),
})