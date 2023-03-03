import { User } from '@prisma/client'
import { UserEntity } from 'src/entities/User'
import { PasswordsNotMatchException } from 'src/entities/errors/User'

describe('Entity: User', () => {
  const data = {
    name: 'John Doe',
    email: 'john.doe@gmail.com',
    password: 'password123',
    createdAt: new Date(),
  } as User

  it('should be able to create a new user', () => {
    const user = new UserEntity(data)

    const returnedData = user.getData()
    expect(user).toBeTruthy()
    expect(returnedData.name).toBe(data.name)
    expect(returnedData.email).toBe(data.email)
  })

  it('should be able to hash password, and not return same password that created', () => {
    const user = new UserEntity(data)

    const returnedData = user.getData()

    expect(returnedData.password).not.toBe(data.password)
  })

  it("shouldn't be able to change password if password is incorrect", () => {
    const user = new UserEntity(data)

    expect(() => user.setPassword('abc', 'abc')).toThrow(new PasswordsNotMatchException())
  })

  it('should be able to change password if password is correct', () => {
    const user = new UserEntity(data)

    const oldhash = user.getData().password

    user.setPassword('abc', data.password)

    const newData = user.getData()

    expect(newData.password).not.toBe(oldhash)
  })

  it('should be able to modify data of user', () => {
    const user = new UserEntity(data)

    const updatedData = {
      name: 'test',
      email: 'test@email.com',
      work: 'test',
      birthday: new Date(),
    }

    user.setData(updatedData)

    const newData = user.getData()

    expect(newData.name).toBe(updatedData.name)
    expect(newData.email).toBe(updatedData.email)
    expect(newData.work).toBe(updatedData.work)
    expect(newData.birthday).toBe(updatedData.birthday)
  })

  it('should be able to create a user with existing id', () => {
    const user = new UserEntity(data, '123abc')

    expect(user.getData().id).toBe('123abc')
  })
})
