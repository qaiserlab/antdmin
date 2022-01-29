import { Api } from '@helpers/Api'

export default async function forwardApi(req: any, res: any) {
  const api = new Api(`${process.env.API_HOST}/v1`)

  if (req.method === 'GET' && !req.query.action) {
    res.status(200).json({ 
      APP_NAME: process.env.APP_NAME,
      APP_CODE: process.env.APP_CODE,
      APP_VERSION: process.env.APP_VERSION,
      APP_HOST: process.env.APP_HOST,
      API_HOST: process.env.API_HOST,
    })
  }
  else {
    const action = req.query.action
    let response:any
    
    if (!action) {
      return res.status(400).json({ 
        code: 400, 
        message: 'Bad request',
      })
    }

    if (req.headers.authorization) {
      api.setAccessToken(req.headers.authorization)
    }

    switch (req.method) {
      case 'GET':
        response = await api.get(action, req.query)
        break
      case 'DELETE':
        response = await api.del(action, req.query)
        break
      case 'POST':
        response = await api.post(action, req.body)
        break
      case 'PUT':
        response = await api.put(action, req.body)
    }
    
    const result = await response.json()
    return res.status(result.code).json(result)
  }
}