export class InvalidParamException extends Error {
  constructor() {
    super(`Invalid param, or missing some parameter`)
    this.name = 'InvalidParamException'
  }
}
