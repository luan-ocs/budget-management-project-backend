import { JwtService } from './JwtService.js'
import { UserService } from './UserService.js'

export class AuthService {
  private JwtService: JwtService
  private UserService: UserService

  constructor(jwtService: JwtService, userService: UserService) {
    this.JwtService = jwtService
    this.UserService = userService
  }

  async login(req: LoginReq) {
    const user = await this.UserService.findUserByEmail(req.email)

    const isSame = user.comparePassword(req.password)

    if (!isSame) {
      throw new Error('Usuário ou senha Incorreto')
    }

    return {
      ...user.getPublicData(),
      token: JwtService.generateJwt(user),
    }
  }
}

type LoginReq = {
  email: string
  password: string
}
