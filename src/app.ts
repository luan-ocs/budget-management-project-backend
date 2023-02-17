import Fastify from 'fastify'
import cors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import dotenv from 'dotenv'
import { registerRoutes } from './routes/registerRoutes.js'

dotenv.config()

export const app = Fastify()

app.register(fastifyJwt, { secret: process.env.AUTH_SECRET as string })
app.register(cors)

registerRoutes(app)

const port = Number(process.env.PORT) || 3333
// eslint-disable-next-line
app.listen({ port: port, host: '::' }).then(() => console.log('server running on port 3333'))
