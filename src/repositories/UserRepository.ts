import { User } from '@prisma/client'
import { SetDataProps, UserEntity } from 'src/entities/User'

export interface IUserRepository {
  findByEmail(email: string): Promise<UserEntity>
  findById(id: string): Promise<UserEntity>
  updateUser(user: SetDataProps, id: string): Promise<UserEntity>
  createUser(user: User): Promise<UserEntity>
  deleteUser(id: string): Promise<void>
}
