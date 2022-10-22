import type { NextApiRequest, NextApiResponse } from 'next'

export default function v1Handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  if (method === 'GET') {
    return res.status(200).json({ 
      APP_NAME: process.env.APP_NAME,
      APP_VERSION: process.env.APP_VERSION,
      APP_HOST: process.env.APP_HOST,
      API_HOST: process.env.API_HOST,
    })
  }
  
  res.setHeader('Allow', ['GET'])
  return res.status(405).end(`Method ${method} Not Allowed`)
}