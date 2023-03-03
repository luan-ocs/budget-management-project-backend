import { InMemoryUserRepository } from 'src/repositories/implementations/InMemoryUserRepository'
import { UserService } from 'src/services/UserService'
import { createRandomUser } from 'src/utils/randomUser'
import { ObjectNotFoundException } from 'src/services/errors/ObjectNotFoundException'
// import { test } from 'jest'

describe('Service: User Service', () => {
  it('should be able to create a user', async () => {
    const service = new UserService(new InMemoryUserRepository())

    const mockUser = createRandomUser()

    const created = await service.createUser(mockUser)
    const createdData = created.getData()

    expect(createdData.email).toBe(mockUser.email)
    expect(createdData.password).not.toBe(mockUser.password)
    expect(createdData.name).toBe(mockUser.name)
  })

  it('should be able to update a user', async () => {
    const service = new UserService(new InMemoryUserRepository())

    const mockUser = createRandomUser()

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

    const mockUser = createRandomUser()

    const created = await service.createUser(mockUser)
    const createdData = created.getData()

    await service.deleteUser(createdData.id)

    const error = new ObjectNotFoundException('user', createdData.id)

    expect(service.findUserById(createdData.id)).rejects.toThrowError(error)
  })

  it('should be able to get an user by id', async () => {
    const service = new UserService(new InMemoryUserRepository())

    const mockUser = createRandomUser()

    const created = await service.createUser(mockUser)
    const createdData = created.getData()

    const gettedUser = await service.findUserById(createdData.id)

    const testData = gettedUser.getData()

    expect(testData).toStrictEqual(createdData)
  })

  it('should be able to get a user by email', async () => {
    const service = new UserService(new InMemoryUserRepository())

    const mockUser = createRandomUser()

    const created = await service.createUser(mockUser)
    const createdData = created.getData()

    const gettedUser = await service.findUserByEmail(createdData.email)

    const testData = gettedUser.getData()

    expect(testData).toStrictEqual(createdData)
  })

  it('should be able to return all users in database', async () => {
    const service = new UserService(new InMemoryUserRepository())

    const mockUser = createRandomUser()

    const created = await service.createUser(mockUser)
    const createdData = created.getData()

    const allUsers = await service.findAll()
    expect(createdData.email).toBe(allUsers[0].email)
  })

  it.todo('should be able to modify a password of a created user')

  it("shouldn't get a user that id not exist", async () => {
    const service = new UserService(new InMemoryUserRepository())

    const mockUser = createRandomUser()

    await service.createUser(mockUser)

    expect(service.findUserById('123abc')).rejects.toThrowError(new ObjectNotFoundException('user', '123abc'))
  })

  it.todo("shouldn't be able to modify a password if last password is incorrect")
})
