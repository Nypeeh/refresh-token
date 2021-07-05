import { Request, Response } from 'express'
import { RefreshTokenUserUseCase } from './RefreshTokenUserUseCase'

export class RefreshTokenUserController {
  async handle(request: Request, response: Response) {
    const { refresh_token } = request.body

    const refreshTokenUser = new RefreshTokenUserUseCase()
    const token = await refreshTokenUser.execute(refresh_token)

    return response.json(token)
  }
}
