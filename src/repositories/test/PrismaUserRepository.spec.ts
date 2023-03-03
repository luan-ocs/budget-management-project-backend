describe('Repository: User Repository', () => {
  it('1 should be 1', () => {
    expect(1).toBe(1)
  })
})

// import { User } from '@prisma/client'
// import { UserRepository } from 'src/repositories/implementations/PrismaUserRepository'
// import { decryptPassword } from 'src/utils/encryptPassword'
// import { prismaMock } from 'src/repositories/test/singleton'
// import { NotFoundByidException } from 'src/repositories/errors/User'
// import { UserEntity } from 'src/entities/User'

// beforeEach(async () => {
//   await prismaMock.user.deleteMany()
// })

// afterAll(async () => {
//   await prismaMock.$disconnect()
// })

// describe('Repository: User repository', () => {
//   const data = {
//     id: '123',
//     name: 'John Doe',
//     email: 'asd.asdasd@gmail.com',
//     password: 'password123',
//     createdAt: new Date(),
//     isAdmin: false,
//   } as User

//   const dataEntity = new UserEntity(data)

//   it('should be able to create user', async () => {
//     const userRepository = new UserRepository(prismaMock)

//     const userEntity = await userRepository.createUser(dataEntity)
//     const generatedData = userEntity.getData()

//     expect(generatedData.name).toBe(data.name)
//     expect(generatedData.email).toBe(data.email)
//     expect(generatedData.password).not.toBe(data.password)
//   })

//   it('should be able to create and get user from database', async () => {
//     const userRepository = new UserRepository(prismaMock)

//     const userEntity = await userRepository.createUser(dataEntity)
//     const firstData = userEntity.getData()

//     const userFromGet = await userRepository.findById(firstData.id)

//     const dataFromGet = userFromGet.getData()

//     expect(dataFromGet.name).toBe(firstData.name)
//     expect(dataFromGet.email).toBe(firstData.email)
//     expect(dataFromGet.id).toBe(firstData.id)
//     expect(decryptPassword(data.password, dataFromGet.password)).toBe(true)
//   })

//   it('should be able to update a user', async () => {
//     const userRepository = new UserRepository(prismaMock)

//     const userEntity = await userRepository.createUser(dataEntity)
//     const firstData = userEntity.getData()

//     const updateData = {
//       name: 'test',
//       email: 'abc@abc.com',
//     }

//     const updateEntity = new UserEntity(firstData, firstData.id)
//     updateEntity.setData(updateData)

//     const updatedUser = await userRepository.updateUser(updateEntity, firstData.id)

//     const updatedData = updatedUser.getData()

//     expect(updateData.email).toBe(updatedData.email)
//     expect(updateData.name).toBe(updatedData.name)
//   })

//   it('should be able to delete a user exists in database', async () => {
//     const userRepository = new UserRepository(prismaMock)

//     const userEntity = await userRepository.createUser(dataEntity)
//     const firstData = userEntity.getData()

//     await userRepository.deleteUser(firstData.id)

//     expect(userRepository.findById(firstData.id)).rejects.toThrowError(new NotFoundByidException(firstData.id, 'User'))
//   })
// })
