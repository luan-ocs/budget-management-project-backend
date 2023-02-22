import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { UserController } from '../controllers/UserController.js'
import { UserRepository } from '../repositories/implementations/PrismaUserRepository.js'
import { UserService } from '../services/UserService.js'
import { prisma } from '../utils/prismaSettings.js'

export function UserRoutes(app: FastifyInstance, opts: FastifyPluginOptions, done: (err?: Error | undefined) => void) {
  const service = new UserService(new UserRepository(prisma))
  const controller = new UserController(service)

  app.get('/users', (req, res) => controller.findAll(req, res))
  app.get('/users/:id', (req, res) => controller.findById(req, res))
  app.post('/users', (req, res) => controller.createUser(req, res))
  done()
}
