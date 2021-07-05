import { sign } from 'jsonwebtoken'

export class GenerateTokenProvider {
  async execute(userId: string) {
    const token = sign({}, '4ea6a383f65075a99cb2294a9aa8e177f6ca94e7', {
      subject: userId,
      expiresIn: '20s',
    })

    return token
  }
}
