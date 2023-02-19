import { User } from '@prisma/client'
import { SetDataProps, UserEntity } from 'src/entities/User'
import { IUserRepository } from '../repositories/UserRepository.js'
import { ObjectNotFoundException } from './errors/ObjectNotFoundException.js'

/**
 *
 *
  interface createUserProps {

  name: string,
  email: string,
  password: string;
}
 *
 */

export class UserService {
  private repository: IUserRepository

  constructor(repository: IUserRepository) {
    this.repository = repository
  }

  async createUser(user: User): Promise<UserEntity> {
    const created = await this.repository.createUser(user)
    return created
  }

  async updateUser(user: SetDataProps, id: string): Promise<UserEntity> {
    const updated = await this.repository.updateUser(user, id)

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
