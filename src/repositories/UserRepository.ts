import { UserEntity } from '../entities/User.js'

export interface IUserRepository {
  findByEmail(email: string): Promise<UserEntity>
  findById(id: string): Promise<UserEntity>
  updateUser(user: UserEntity, id: string): Promise<UserEntity>
  createUser(user: UserEntity): Promise<UserEntity>
  deleteUser(id: string): Promise<void>
  findAll(): Promise<UserEntity[]>
}
