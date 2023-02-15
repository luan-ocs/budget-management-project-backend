import { User } from '@prisma/client'
import { SetDataProps, UserEntity } from 'src/entities/User'
import { AlreadyCreatedException, NotFoundByEmailException, NotFoundByidException } from 'src/repositories/errors/User'
import { IUserRepository } from 'src/repositories/UserRepository'

export class InMemoryUserRepository implements IUserRepository {
  private repository: UserEntity[] = []

  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.repository.find(user => user.getData().email === email)
    if (!user) {
      throw new NotFoundByEmailException(email)
    }

    return user
  }

  async findById(id: string): Promise<UserEntity> {
    const user = await this.repository.find(user => user.getData().id === id)
    if (!user) {
      throw new NotFoundByidException(id, 'User')
    }

    return user
  }

  async updateUser(user: SetDataProps, id: string): Promise<UserEntity> {
    const fromDb = await this.findById(id)

    fromDb.setData(user)

    return fromDb
  }

  async createUser(user: User): Promise<UserEntity> {
    if (this.repository.find(u => u.getData().email === user.email)) {
      throw new AlreadyCreatedException()
    }
    const created = new UserEntity(user)
    await this.repository.push(created)

    return created
  }
  async deleteUser(id: string): Promise<void> {
    const user = await this.findById(id)

    this.repository = this.repository.filter(u => u.getData().id !== user.getData().id)
  }
}
