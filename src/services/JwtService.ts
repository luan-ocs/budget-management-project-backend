import { app } from '../app.js'
import { UserEntity } from '../entities/User.js'

export class JwtService {
  static generateJwt(entity: UserEntity) {
    const userData = entity.getPublicData()

    const iat = Date.now() / 1000

    const exp = iat + 60 * 60 * 24 * 3

    const payload = {
      ...userData,
      iat,
      exp,
    }

    return app.jwt.sign(payload)
  }

  static decodeJwt(jwt: string) {
    return app.jwt.decode(jwt) as UserEntity['getPublicData']
  }
}
