import { User } from '@prisma/client'
import { InMemoryUserRepository } from 'src/repositories/implementations/InMemoryUserRepository'
import { decryptPassword } from 'src/utils/encryptPassword'
import { NotFoundByidException } from 'src/repositories/errors/User'
import { UserEntity } from 'src/entities/User'

describe('Repository: In Memory User repository', () => {
  const data = {
    name: 'John Doe',
    email: 'asd.asdasd@gmail.com',
    password: 'password123',
    createdAt: new Date(),
    isAdmin: false,
  } as User

  const dataEntity = new UserEntity(data)

  it('should be able to create user', async () => {
    const repository = new InMemoryUserRepository()

    const userEntity = await repository.createUser(dataEntity)
    const generatedData = userEntity.getData()

    expect(generatedData.name).toBe(data.name)
    expect(generatedData.email).toBe(data.email)
    expect(generatedData.password).not.toBe(data.password)
  })

  it('should be able to create and get user from database', async () => {
    const repository = new InMemoryUserRepository()

    const userEntity = await repository.createUser(dataEntity)
    const firstData = userEntity.getData()

    const userFromGet = await repository.findById(firstData.id)

    const dataFromGet = userFromGet.getData()

    expect(dataFromGet.name).toBe(firstData.name)
    expect(dataFromGet.email).toBe(firstData.email)
    expect(dataFromGet.id).toBe(firstData.id)
    expect(decryptPassword(data.password, dataFromGet.password)).toBe(true)
  })

  it('should be able to update a user', async () => {
    const repository = new InMemoryUserRepository()

    const userEntity = await repository.createUser(dataEntity)
    const firstData = userEntity.getData()

    const updateData = {
      name: 'test',
      email: 'abc@abc.com',
    }

    const updateEntity = new UserEntity(firstData, firstData.id)
    updateEntity.setData(updateData)

    const updatedUser = await repository.updateUser(updateEntity, firstData.id)

    const updatedData = updatedUser.getData()

    expect(updateData.email).toBe(updatedData.email)
    expect(updateData.name).toBe(updatedData.name)
  })

  it('should be able to delete a user exists in database', async () => {
    const repository = new InMemoryUserRepository()

    const userEntity = await repository.createUser(dataEntity)
    const firstData = userEntity.getData()

    await repository.deleteUser(firstData.id)

    expect(repository.findById(firstData.id)).rejects.toThrowError(new NotFoundByidException(firstData.id, 'User'))
  })
})
