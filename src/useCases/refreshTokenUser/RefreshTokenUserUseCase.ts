import { client } from '../../prisma/client'
import { GenerateTokenProvider } from '../../provider/GenerateTokenProvider'
import dayjs from 'dayjs'
import { GenerateRefreshToken } from '../../provider/GenerateRefreshToken'

export class RefreshTokenUserUseCase {
  async execute(refresh_token: string) {
    const refreshToken = await client.refreshToken.findFirst({
      where: {
        id: refresh_token,
      },
    })

    if (!refreshToken) {
      throw new Error('Refresh token invalid')
    }

    const refreshTokenExpired = dayjs().isAfter(
      dayjs.unix(refreshToken.expiresIn),
    )

    const generateTokenProvider = new GenerateTokenProvider()
    const token = await generateTokenProvider.execute(refreshToken.userId)

    if (refreshTokenExpired) {
      await client.refreshToken.delete({ where: { id: refreshToken.id } })

      const generateRefreshToken = new GenerateRefreshToken()
      const newRefreshToken = await generateRefreshToken.execute(
        refreshToken.userId,
      )

      return { token, refreshToken: newRefreshToken }
    }

    return { token }
  }
}
