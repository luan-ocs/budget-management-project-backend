export class ObjectNotFoundException extends Error {
  constructor(name: string, id: string) {
    super(`Object ${name} was not found: ${id}`)
    this.name = 'ObjectNotFoundException'
  }
}
