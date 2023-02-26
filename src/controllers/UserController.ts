import { FastifyReply, FastifyRequest } from 'fastify'
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
    const params = reqParams.parse(req.params)

    try {
      const user = await this.userService.findUserById(params.id)
      const userDTO = user.getPublicData()
      res.send(userDTO)
    } catch (error) {
      const data = GetErrorType(req, error)
      res.status(data.status).send(data)
    }
  }

  async createUser(req: FastifyRequest, res: FastifyReply) {
    try {
      const reqBody = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string(),
        birthday: z.coerce.date().nullable(),
        work: z.string().nullable(),
        gender: z.string().nullable(),
      })

      const body = reqBody.parse(req.body)

      const created = await this.userService.createUser(body)

      res.header('Location', `/users/${created.getData().id}`)

      res.status(201).send(created.getPublicData())
    } catch (err) {
      const data = GetErrorType(req, err)
      res.status(data.status).send(data)
    }
  }

  async editUser(req: FastifyRequest, res: FastifyReply) {
    const reqBody = z.object({
      name: z.string(),
      email: z.string().email(),
      birthdate: z.coerce.date().optional(),
      work: z.string().optional(),
      gender: z.string().optional(),
    })

    const reqParams = z.object({
      id: z.string(),
    })

    try {
      const body = reqBody.parse(req.body)
      const params = reqParams.parse(req.params)

      const user = await this.userService.updateUser(body, params.id)

      res.status(204).send(user.getPublicData())
    } catch (err) {
      const data = GetErrorType(req, err)
      res.status(data.status).send(data)
    }
  }
}
