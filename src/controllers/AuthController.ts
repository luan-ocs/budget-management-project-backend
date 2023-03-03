import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify'
import { AuthService } from '../services/AuthService.js'
import { z } from 'zod'

export class AuthController {
  private service: AuthService

  constructor(service: AuthService) {
    this.service = service
  }

  async register(req: FastifyRequest, res: FastifyReply) {
    const reqBody = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string(),
      birthday: z.coerce.date().nullable(),
      work: z.string().nullable(),
      gender: z.string().nullable(),
    })

    const body = reqBody.parse(req.body)

    const payload = await this.service.register(body)

    res.status(201).send(payload)
  }

  async login(req: FastifyRequest, res: FastifyReply) {
    const reqBody = z.object({
      email: z.string().email(),
      password: z.string(),
    })

    const body = reqBody.parse(req.body)

    const payload = await this.service.login(body)

    res.status(200).send(payload)
  }

  async authenticate(req: FastifyRequest, res: FastifyReply, next: HookHandlerDoneFunction) {
    try {
      await req.jwtVerify()
      next()
    } catch (err) {
      res.send(err)
    }
  }
}
