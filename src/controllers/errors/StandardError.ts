import { FastifyRequest } from 'fastify'
import { ObjectNotFoundException } from 'src/services/errors/ObjectNotFoundException.js'
import { ZodError } from 'zod'
import { InvalidParamException } from './InvalidParamException.js'

export class StandardError {
  public message: string
  public timestamp: Date
  public path: string
  public status: number

  constructor(message: string, timestamp: Date, path: string, status: number) {
    this.message = message
    this.timestamp = timestamp
    this.path = path
    this.status = status
  }

  static InvalidParamException(req: FastifyRequest, error: InvalidParamException): StandardError {
    const data = new StandardError(error.message, new Date(), req.routerPath, 400)
    return data
  }

  static UnknownException(req: FastifyRequest) {
    const data = new StandardError('Unknown error', new Date(), req.routerPath, 500)

    return data
  }

  static ObjectNotFoundException(req: FastifyRequest, error: ObjectNotFoundException) {
    const data = new StandardError(error.message, new Date(), req.routerPath, 404)

    return data
  }

  static MissingParamException(req: FastifyRequest, error: ZodError) {
    const data = new StandardError(error.message, new Date(), req.routerPath, 400)

    return data
  }
}
