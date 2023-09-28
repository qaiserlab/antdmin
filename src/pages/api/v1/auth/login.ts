import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'

export default function loginHandler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  if (method === 'POST') {
    const API_KEY:string = process.env.API_KEY
    const { username, password } = req.body

    const userInfo:TUserRecord = {
      id: 'c1e3e130-9ac9-4703-97ab-c090bf75685b',
      userName: 'admin',
      firstName: 'Fadlun',
      lastName: 'Anaturdasa',
      email: 'f.anaturdasa@gmail.com',
      phoneNumber: '-',
    }

    if (username === 'admin' && password === 'admin') {
      const accessToken = jwt.sign(
        userInfo, 
        API_KEY, 
        { expiresIn: '3h' }
      )

      const refreshToken = jwt.sign(
        { key: `${Math.random()}.${API_KEY}` }, 
        API_KEY, 
        { expiresIn: '5h' }
      )

      return res.status(200).json({ 
        accessToken,
        refreshToken,
       })
    }

    return res.status(500).json({ 
      error: 'Invalid Username/Password'
     })
  }
  
  res.setHeader('Allow', ['POST'])
  return res.status(405).end(`Method ${method} Not Allowed`)
}