import { UserEntity } from 'src/entities/User'
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

  async updateUser(user: UserEntity, id: string): Promise<UserEntity> {
    await this.findById(id)

    this.repository = this.repository.filter(user => user.getData().id !== id)

    this.repository.push(user)

    return user
  }

  async createUser(userEntity: UserEntity): Promise<UserEntity> {
    const user = userEntity.getData()

    if (this.repository.find(u => u.getData().email === user.email)) {
      throw new AlreadyCreatedException()
    }
    await this.repository.push(userEntity)

    return userEntity
  }
  async deleteUser(id: string): Promise<void> {
    const user = await this.findById(id)

    this.repository = this.repository.filter(u => u.getData().id !== user.getData().id)
  }

  async findAll(): Promise<UserEntity[]> {
    return this.repository
  }
}
