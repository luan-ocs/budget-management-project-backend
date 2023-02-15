export class NotFoundByidException extends Error {
  constructor(id: string, type: string) {
    super()
    this.message = `${type} not found, id: ${id}`
  }
}

export class NotFoundByEmailException extends Error {
  constructor(email: string) {
    super()
    this.message = `User with email: ${email} was not found`
  }
}
