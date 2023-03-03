import { PrismaClient } from '@prisma/client'
import { UserEntity } from '../../entities/User.js'
import { IUserRepository } from '../../repositories/UserRepository.js'
import { NotFoundByEmailException, NotFoundByidException } from '../../repositories/errors/User.js'

export class UserRepository implements IUserRepository {
  private client: PrismaClient
  private repository

  constructor(client: PrismaClient) {
    this.client = client
    this.repository = client.user
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.repository.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      throw new NotFoundByEmailException(email)
    }

    return new UserEntity(user, user.id)
  }

  async findById(id: string): Promise<UserEntity> {
    const user = await this.repository.findUnique({
      where: {
        id,
      },
    })

    if (!user) {
      throw new NotFoundByidException(id, 'User')
    }

    return new UserEntity(user, user.id)
  }
  async updateUser(user: UserEntity, id: string): Promise<UserEntity> {
    await this.findById(id)
    const updatedData = user.getData()

    await this.repository.update({
      where: {
        id,
      },
      data: updatedData,
    })

    return user
  }
  async createUser(user: UserEntity): Promise<UserEntity> {
    const created = await this.repository.create({
      data: user.getData(),
    })

    const returnUser = new UserEntity(created, created.id)

    return returnUser
  }
  async deleteUser(id: string): Promise<void> {
    await this.repository.delete({
      where: {
        id,
      },
    })
  }

  async findAll(): Promise<UserEntity[]> {
    const allUsers = await this.repository.findMany()

    return allUsers.map(user => new UserEntity(user, user.id))
  }
}
