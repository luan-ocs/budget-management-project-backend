import { User } from '@prisma/client'
import { decryptPassword, encryptPassword } from '../utils/encryptPassword.js'
import { PasswordsNotMatchException } from '../entities/errors/User.js'

export interface SetDataProps {
  name?: string
  email?: string
  birthday?: Date | null
  work?: string | null
  gender?: string | null
}

export class UserEntity {
  private data: User

  public constructor(data: User, encryptPassword: boolean = true) {
    this.data = { ...data }

    if (encryptPassword) {
      this.encryptPassword()
    }
  }

  public getData(): User {
    return this.data
  }

  public comparePassword(password: string): boolean {
    return decryptPassword(password, this.data.password)
  }

  public encryptPassword() {
    const password = encryptPassword(this.data.password)
    this.data.password = password
  }

  public setData(data: SetDataProps) {
    const { email, name, birthday, work, gender } = data

    this.data.email = email || this.data.email
    this.data.name = name || this.data.name
    this.data.work = work || this.data.work
    this.data.gender = gender || this.data.gender
    this.data.birthday = birthday || this.data.birthday
  }

  public setPassword(password: string, lastPassword: string) {
    const isSame = this.comparePassword(lastPassword)

    if (isSame) {
      const newPassword = encryptPassword(password)
      this.data.password = newPassword
    } else {
      throw new PasswordsNotMatchException()
    }
  }

  public getPublicData() {
    const publicData = { ...this.data }
    Reflect.deleteProperty(publicData, 'password')

    return publicData
  }
}
