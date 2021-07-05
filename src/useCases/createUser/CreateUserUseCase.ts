import { client } from '../../prisma/client'
import { hash } from 'bcryptjs'

interface IUserRequest {
  name: string
  username: string
  password: string
}

export class CreateUserUseCase {
  async execute({ name, username, password }: IUserRequest) {
    if (!name) throw new Error('field name is missing')
    if (!username) throw new Error('field username is missing')
    if (!password) throw new Error('field password is missing')

    const userAlreadyExists = await client.user.findFirst({
      where: {
        username,
      },
    })

    if (userAlreadyExists) {
      throw new Error('User already exists')
    }

    const hashedPassword = await hash(password, 8)

    const user = await client.user.create({
      data: {
        name,
        username,
        password: hashedPassword,
      },
    })

    delete user.password

    return user
  }
}
