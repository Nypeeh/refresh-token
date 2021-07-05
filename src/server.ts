import express, { json, NextFunction, Request, Response } from 'express'
import 'express-async-errors'

import { routes } from './routes'

const app = express()
const PORT = 3333

app.use(json())

app.use(routes)

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  console.log({
    status: 'error',
    message: err.message,
  })
  return response.json({
    status: 'error',
    message: err.message,
  })
})

app.listen(PORT, () => {
  console.log(`🚀 Server started on ${PORT}`)
})
