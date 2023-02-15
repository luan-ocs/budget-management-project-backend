import { User } from '@prisma/client'
import { decryptPassword, encryptPassword } from 'src/utils/encryptPassword'
import { PasswordsNotMatchException } from 'src/entities/Errors/User'

export interface SetDataProps {
  name?: string
  email?: string
  birthday?: Date
  work?: string
  gender?: string
}

export class UserEntity {
  private data: User

  public constructor(data: User) {
    const password = encryptPassword(data.password)
    this.data = { ...data }
    this.data.password = password
  }

  public getData(): User {
    return this.data
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
    const isSame = decryptPassword(lastPassword, this.data.password)

    if (isSame) {
      const newPassword = encryptPassword(password)
      this.data.password = newPassword
    } else {
      throw new PasswordsNotMatchException()
    }
  }
}
