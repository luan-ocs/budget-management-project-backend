import { FastifyRequest } from 'fastify'
import { StandardError } from './StandardError.js'

export function GetErrorType(req: FastifyRequest, error: unknown) {
  if (!(error instanceof Error)) {
    return StandardError.UnknownException(req)
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
