import { FastifyReply, FastifyRequest } from 'fastify'
import { parseOrThrow } from '../utils/parseOrThrow.js'
import { z } from 'zod'
import { UserService } from '../services/UserService.js'
import { GetErrorType } from './errors/getErrorType.js'

export class UserController {
  private userService

  constructor(service: UserService) {
    this.userService = service
  }

  async findAll(req: FastifyRequest, res: FastifyReply) {
    const allUsers = await this.userService.findAll()

    return res.send(allUsers)
  }

  async findById(req: FastifyRequest, res: FastifyReply) {
    const reqParams = z.object({
      id: z.string(),
    })
    const params = parseOrThrow(reqParams, req.params)

    try {
      const user = await this.userService.findUserById(params.id)
      const userDTO = user.getPublicData()
      res.send(userDTO)
    } catch (error) {
      const data = GetErrorType(req, error)
      res.status(data.status).send(data)
    }
  }
}
