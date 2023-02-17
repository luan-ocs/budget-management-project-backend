import { FastifyInstance } from 'fastify'
import { UserRoutes } from './UserRoutes.js'

export function registerRoutes(app: FastifyInstance) {
  app.register(UserRoutes)
}
