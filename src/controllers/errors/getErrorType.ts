import { FastifyRequest } from 'fastify'
import { ZodError } from 'zod'
import { StandardError } from './StandardError.js'

export function GetErrorType(req: FastifyRequest, error: unknown) {
  if (!(error instanceof Error)) {
    return StandardError.UnknownException(req)
  }

  if (error instanceof ZodError) {
    return StandardError.MissingParamException(req, error)
  }

  switch (error?.name) {
    case 'InvalidParamException':
      return StandardError.InvalidParamException(req, error)
    case 'ObjectNotFoundException':
      return StandardError.ObjectNotFoundException(req, error)
    default:
      return StandardError.UnknownException(req)
  }
}
