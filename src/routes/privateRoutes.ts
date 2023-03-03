import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { AuthController } from '../controllers/AuthController.js'
import { AuthService } from '../services/AuthService.js'
import { UserController } from '../controllers/UserController.js'
import { UserRepository } from '../repositories/implementations/PrismaUserRepository.js'
import { UserService } from '../services/UserService.js'
import { prisma } from '../utils/prismaSettings.js'
import { PrismaTransactionRepository } from '../repositories/implementations/PrismaTransactionRepository.js'
import { TransactionService } from '../services/TransactionService.js'
import { TransactionController } from '../controllers/TransactionController.js'

export function UserRoutes(app: FastifyInstance, opts: FastifyPluginOptions, done: (err?: Error | undefined) => void) {
  const userRepository = new UserRepository(prisma)
  const userService = new UserService(userRepository)
  const authService = new AuthService(userService)
  const controller = new UserController(userService)
  const authController = new AuthController(authService)
  const transactionRepo = new PrismaTransactionRepository(prisma)
  const transactionService = new TransactionService(transactionRepo)
  const transactionController = new TransactionController(transactionService)

  app.addHook('preHandler', (req, res, next) => authController.authenticate(req, res, next))

  app.get('/api/v1/users', (req, res) => controller.findAll(req, res))
  app.get('/api/v1/users/:id', (req, res) => controller.findById(req, res))
  app.post('/api/v1/users', (req, res) => controller.createUser(req, res))
  app.put('/api/v1/users/:id', (req, res) => controller.editUser(req, res))

  // gains
  app.get('/api/v1/gains/:userId/:date', (req, res) => transactionController.getGainMonth(req, res))
  app.get('/api/v1/gains/:id', (req, res) => transactionController.findGainbyId(req, res))
  app.post('/api/v1/gains', (req, res) => {
    transactionController.createGain(req, res)
  })
  app.put('/api/v1/gains/:id', (req, res) => transactionController.updateGain(req, res))
  app.delete('/api/v1/gains/:id', (req, res) => transactionController.deleteGain(req, res))

  //expenses
  app.post('/api/v1/expenses', (req, res) => transactionController.createExpense(req, res))
  app.put('/api/v1/expenses/:id', (req, res) => transactionController.updateExpense(req, res))
  app.delete('/api/v1/expenses/:id', (req, res) => transactionController.deleteExpense(req, res))
  app.get('/api/v1/expenses/:id', (req, res) => transactionController.findExpenseById(req, res))
  app.get('/api/v1/expenses/:userId/:date', (req, res) => transactionController.getExpenseMonth(req, res))

  // month statistics
  done()
}
