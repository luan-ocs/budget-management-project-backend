import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { AuthController } from '../controllers/AuthController.js'
import { AuthService } from '../services/AuthService.js'
import { UserController } from '../controllers/UserController.js'
import { UserRepository } from '../repositories/implementations/PrismaUserRepository.js'
import { UserService } from '../services/UserService.js'
import { prisma } from '../utils/prismaSettings.js'

export function UserRoutes(app: FastifyInstance, opts: FastifyPluginOptions, done: (err?: Error | undefined) => void) {
  const userRepository = new UserRepository(prisma)
  const userService = new UserService(userRepository)
  const authService = new AuthService(userService)
  const controller = new UserController(userService)
  const authController = new AuthController(authService)

  app.addHook('preHandler', (req, res, next) => authController.authenticate(req, res, next))

  app.get('/users', (req, res) => controller.findAll(req, res))
  app.get('/users/:id', (req, res) => controller.findById(req, res))
  app.post('/users', (req, res) => controller.createUser(req, res))
  app.put('/users/:id', (req, res) => controller.editUser(req, res))
  done()
}
