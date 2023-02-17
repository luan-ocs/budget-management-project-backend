import { PrismaClient, User } from '@prisma/client'
import { UserEntity, SetDataProps } from '../../entities/User.js'
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

    return new UserEntity(user, false)
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

    return new UserEntity(user, false)
  }
  async updateUser(user: SetDataProps, id: string): Promise<UserEntity> {
    const userEnt = await this.findById(id)

    userEnt.setData(user)

    const updatedData = userEnt.getData()

    await this.repository.update({
      where: {
        id,
      },
      data: updatedData,
    })

    return userEnt
  }
  async createUser(user: User): Promise<UserEntity> {
    const userEnt = new UserEntity(user)

    await this.repository.create({
      data: userEnt.getData(),
    })

    return userEnt
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

    return allUsers.map(user => new UserEntity(user))
  }
}
