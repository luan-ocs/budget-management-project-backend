import { JwtService } from './JwtService.js'
import { createUserProps, UserService } from './UserService.js'

export class AuthService {
  private UserService: UserService

  constructor(userService: UserService) {
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

  async register(req: createUserProps) {
    const user = await this.UserService.createUser(req)

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
