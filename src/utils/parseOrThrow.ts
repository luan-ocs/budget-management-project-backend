import { InvalidParamException } from 'src/controllers/errors/InvalidParamException'
import { AnyZodObject } from 'zod'

export function parseOrThrow(parse: AnyZodObject, value: unknown) {
  try {
    return parse.parse(value)
  } catch (error) {
    throw new InvalidParamException()
  }
}
