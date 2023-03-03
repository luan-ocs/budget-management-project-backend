import { SetDataProps, UserEntity } from '../entities/User.js'
import { IUserRepository } from '../repositories/UserRepository.js'
import { ObjectNotFoundException } from './errors/ObjectNotFoundException.js'

export interface createUserProps {
  name: string
  email: string
  password: string
  birthday: Date | null
  work: string | null
  gender: string | null
}

export class UserService {
  private repository: IUserRepository

  constructor(repository: IUserRepository) {
    this.repository = repository
  }

  async createUser(user: createUserProps): Promise<UserEntity> {
    const userData = {
      ...user,
      createdAt: new Date(),
      isAdmin: false,
    }

    const userEntity = new UserEntity(userData)
    const created = await this.repository.createUser(userEntity)
    return created
  }

  async updateUser(user: SetDataProps, id: string): Promise<UserEntity> {
    const finded = await this.findUserById(id)
    finded.setData(user)

    const updated = await this.repository.updateUser(finded, id)

    return updated
  }

  async deleteUser(id: string): Promise<void> {
    await this.repository.deleteUser(id)
  }

  async findUserById(id: string): Promise<UserEntity> {
    try {
      const finded = await this.repository.findById(id)
      return finded
    } catch (err) {
      throw new ObjectNotFoundException('user', id)
    }
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    try {
      const finded = await this.repository.findByEmail(email)
      return finded
    } catch (err) {
      throw new ObjectNotFoundException('user', email)
    }
  }

  async findAll() {
    const allUsers = await this.repository.findAll()
    return allUsers.map(user => user.getPublicData())
  }
}
