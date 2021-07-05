import { Request, Response } from 'express'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

export class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body

    const authenticateUser = new AuthenticateUserUseCase()

    const { token, refreshToken } = await authenticateUser.execute({
      username,
      password,
    })

    return response.json({ token, refreshToken })
  }
}
