interface TUserRecord {
  id: string
  firstName: string
  lastName: string
  fullName?: string
  username: string
  password: string
  email: string
  roleId: number
  role: TRoleRecord
  phoneNumber?: string
  createdAt?: string
  updatedAt?: string
}
