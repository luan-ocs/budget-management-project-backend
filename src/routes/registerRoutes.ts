import { FastifyInstance } from 'fastify'
import { PublicRoutes } from './publicRoutes.js'
import { UserRoutes } from './UserRoutes.js'

export function registerRoutes(app: FastifyInstance) {
  app.register(UserRoutes)
  app.register(PublicRoutes)
}
