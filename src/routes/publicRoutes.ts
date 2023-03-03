import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { AuthController } from '../controllers/AuthController.js'
import { UserRepository } from '../repositories/implementations/PrismaUserRepository.js'
import { AuthService } from '../services/AuthService.js'
import { UserService } from '../services/UserService.js'
import { prisma } from '../utils/prismaSettings.js'

export function PublicRoutes(
  app: FastifyInstance,
  opts: FastifyPluginOptions,
  done: (err?: Error | undefined) => void,
) {
  const userRepository = new UserRepository(prisma)
  const userService = new UserService(userRepository)
  const authService = new AuthService(userService)
  const controller = new AuthController(authService)

  app.post('/api/v1/auth', (req, res) => controller.login(req, res))
  app.post('/api/v1/register', (req, res) => controller.register(req, res))
  done()
}
