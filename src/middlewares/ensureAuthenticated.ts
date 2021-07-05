import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

interface IToken {
  sub: string
}
export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authToken = request.headers.authorization

  if (!authToken) {
    throw new Error('Token JWT is missing')
  }

  const [, token] = authToken.split(' ')

  try {
    const { sub } = verify(
      token,
      '4ea6a383f65075a99cb2294a9aa8e177f6ca94e7',
    ) as IToken

    request.user = {
      id: sub,
    }

    return next()
  } catch (error) {
    throw new Error('Invalid Token JWT')
  }
}
