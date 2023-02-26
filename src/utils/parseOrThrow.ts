import { InvalidParamException } from '../controllers/errors/InvalidParamException.js'
import { AnyZodObject } from 'zod'

export function parseOrThrow<T>(parse: AnyZodObject, value: unknown) {
  try {
    return parse.parse(value) as T
  } catch (error) {
    throw new InvalidParamException()
  }
}
