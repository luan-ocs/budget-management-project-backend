import { InMemoryUserRepository } from 'src/repositories/implementations/InMemoryUserRepository'
import { UserService } from 'src/services/UserService'
import { createRandomUser } from 'src/utils/randomUser'
import crypto from 'node:crypto'
import { NotFoundByidException } from 'src/repositories/errors/User'

describe('Service: User Service', () => {
  it('should be able to create a user', async () => {
    const service = new UserService(new InMemoryUserRepository())

    const mockUser = createRandomUser(crypto.randomUUID())

    const created = await service.createUser(mockUser)
    const createdData = created.getData()

    expect(createdData.email).toBe(mockUser.email)
    expect(createdData.password).not.toBe(mockUser.password)
    expect(createdData.name).toBe(mockUser.name)
  })

  it('should be able to update a user', async () => {
    const service = new UserService(new InMemoryUserRepository())

    const mockUser = createRandomUser(crypto.randomUUID())

    const created = await service.createUser(mockUser)
    const createdData = created.getData()

    const toTestObj = { ...createdData }

    const toUpdate = {
      name: 'test',
      email: 'test@example.com',
    }

    const updated = await service.updateUser(toUpdate, created.getData().id)
    const updatedData = updated.getData()

    expect(toTestObj.name).not.toBe(updatedData.name)
    expect(toTestObj.email).not.toBe(updatedData.email)
    expect(toTestObj.password).toBe(updatedData.password)
  })

  it('should be able to delete a user', async () => {
    const service = new UserService(new InMemoryUserRepository())

    const mockUser = createRandomUser(crypto.randomUUID())

    const created = await service.createUser(mockUser)
    const createdData = created.getData()

    await service.deleteUser(createdData.id)

    const error = new NotFoundByidException(createdData.id, 'User')

    expect(service.findUserById(createdData.id)).rejects.toThrowError(error)
  })

  it('should be able to get an user by id', async () => {
    const service = new UserService(new InMemoryUserRepository())

    const mockUser = createRandomUser(crypto.randomUUID())

    const created = await service.createUser(mockUser)
    const createdData = created.getData()

    const gettedUser = await service.findUserById(createdData.id)

    const testData = gettedUser.getData()

    expect(testData).toStrictEqual(createdData)
  })
})
