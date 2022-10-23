import type { NextApiRequest, NextApiResponse } from 'next'

const records:Array<TUserRecord> = [
  {
    id: 'c1e3e130-9ac9-4703-97ab-c090bf75685b',
    userName: 'admin',
    firstName: 'Fadlun',
    lastName: 'Anaturdasa',
    email: 'f.anaturdasa@gmail.com',
    phoneNumber: '-',
  }
]

function getUsers(req: NextApiRequest, res: NextApiResponse) {
  return res.status(200).json({
    data: records,
    total: records.length,
    page: 1,
  })
}

function postUser(req: NextApiRequest, res: NextApiResponse) {
  const id = `id-${Math.random()}`
  const { 
    userName, 
    firstName,
    lastName,
    email,
    phoneNumber, 
    newPassword,
    confirmNewPassword,
  } = req.body

  const errors = []

  if (newPassword !== confirmNewPassword) {
    errors.push({
      confirmNewPassword: 'Retype Password not match with Password'
    })
  }

  if (errors.length > 0) {
    return res.status(422).json({
      errors,
    })
  }

  records.push({
    id,
    userName,
    firstName,
    lastName,
    email,
    phoneNumber,
  })

  return res.status(200).json(records)
}

export default function usersHandler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case 'GET':
      getUsers(req, res)
      break;
    case 'POST':
      postUser(req, res)
  }
  
  res.setHeader('Allow', ['GET', 'POST'])
  return res.status(405).end(`Method ${method} Not Allowed`)
}