import { Request, Response } from 'express'
import { CreateUserUseCase } from './CreateUserUseCase'

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const { username, name, password } = request.body

    const authenticateUser = new CreateUserUseCase()

    const user = await authenticateUser.execute({
      username,
      name,
      password,
    })

    return response.json(user)
  }
}
