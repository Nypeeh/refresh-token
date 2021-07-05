import { client } from '../../prisma/client'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { GenerateRefreshToken } from '../../provider/GenerateRefreshToken'
import { GenerateTokenProvider } from '../../provider/GenerateTokenProvider'

interface IRequest {
  username: string
  password: string
}

export class AuthenticateUserUseCase {
  async execute({ username, password }: IRequest) {
    if (!username) throw new Error('field username is missing')
    if (!password) throw new Error('field password is missing')

    const userExists = await client.user.findFirst({
      where: { username },
    })
    if (!userExists) {
      throw new Error('Username or Password incorrect')
    }

    const passwordMatch = await compare(password, userExists.password)

    if (!passwordMatch) {
      throw new Error('Username or Password incorrect')
    }

    delete userExists.password

    await client.refreshToken.deleteMany({
      where: {
        userId: userExists.id,
      },
    })

    const generateTokenProvider = new GenerateTokenProvider()
    const token = await generateTokenProvider.execute(userExists.id)
    const generateRefreshToken = new GenerateRefreshToken()
    const refreshToken = await generateRefreshToken.execute(userExists.id)

    return { token, refreshToken }
  }
}
