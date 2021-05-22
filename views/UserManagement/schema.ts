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