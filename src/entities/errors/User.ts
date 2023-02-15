export class PasswordsNotMatchException extends Error {
  constructor() {
    super()
    this.message = 'Passwords not match'
  }
}
