import { Router } from 'express'

const router = Router()

router.get('/api/customers', (req, res) => {
  const authToken = req.headers.authorization
  const [, payload = ''] = authToken.split('.')
  const payloadJson = Buffer.from(payload, 'base64').toString()

  const data = JSON.parse(payloadJson || 'null')

  res.send([
    {
      name: 'customer',
      ...data
    }
  ])
})

export { router }
