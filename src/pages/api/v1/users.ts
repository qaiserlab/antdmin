import type { NextApiRequest, NextApiResponse } from 'next'

export default function usersHandler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  if (method === 'GET') {
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

    return res.status(200).json({
      data: records,
      total: records.length,
      page: 1,
    })
  }
  
  res.setHeader('Allow', ['GET'])
  return res.status(405).end(`Method ${method} Not Allowed`)
}