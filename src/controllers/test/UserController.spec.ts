import Fastify from 'fastify'
import { InMemoryUserRepository } from 'src/repositories/implementations/InMemoryUserRepository'
import { UserService } from 'src/services/UserService'
import { createRandomUser } from 'src/utils/randomUser'
import { UserController } from '../UserController.js'

describe('Controller: User Controller', () => {
  it('should be able to get all users in the list', async () => {
    const repository = new InMemoryUserRepository()
    const service = new UserService(repository)
    const controller = new UserController(service)
    const randomUser = createRandomUser()
    await service.createUser(randomUser)

    const server = Fastify()

    server.get('/users', (req, res) => controller.findAll(req, res))

    const response = await server.inject({
      method: 'GET',
      path: '/users',
    })

    const body = JSON.parse(response.body)

    expect(body[0].email).toBe(randomUser.email)
  })

  it("shouldn't be able to get a user by id if user not exist", async () => {
    const repository = new InMemoryUserRepository()
    const service = new UserService(repository)
    const controller = new UserController(service)
    const randomUser = createRandomUser()
    await service.createUser(randomUser)

    const server = Fastify()

    server.get('/users/:id', (req, res) => controller.findById(req, res))

    const response = await server.inject({
      method: 'GET',
      path: '/users/abc',
    })

    const body = JSON.parse(response.body)

    expect(body.status).toBe(404)
    expect(body.message).toBe('Object user was not found: abc')
  })

  it('should be able to create a user', async () => {
    const repository = new InMemoryUserRepository()
    const service = new UserService(repository)
    const controller = new UserController(service)
    const randomUser = createRandomUser()

    const server = Fastify()

    server.post('/users', (req, res) => controller.createUser(req, res))

    const response = await server
      .inject()
      .post('/users')
      .body({
        ...randomUser,
      })

    const userReturned = JSON.parse(response.body)

    expect(userReturned.name).toBe(randomUser.name)
    expect(userReturned.email).toBe(randomUser.email)
    expect(userReturned.password).not.toBe(randomUser.password)
    expect(userReturned.gender).toBe(randomUser.gender)
    expect(userReturned.work).toBe(randomUser.work)
  })
})
