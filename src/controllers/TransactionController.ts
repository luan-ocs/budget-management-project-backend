import { ExpenseCategory, GainCategory } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { TransactionService } from '../services/TransactionService.js'
import { GetErrorType } from './errors/getErrorType.js'

export class TransactionController {
  private service: TransactionService

  constructor(service: TransactionService) {
    this.service = service
  }

  async findGainbyId(req: FastifyRequest, res: FastifyReply) {
    const reqParams = z.object({
      id: z.string(),
    })

    const param = reqParams.parse(req.params)

    try {
      const gain = await this.service.getGainById(param.id)
      res.send(gain.getData())
    } catch (error) {
      const data = GetErrorType(req, error)
      res.status(data.status).send(data)
    }
  }

  async findExpenseById(req: FastifyRequest, res: FastifyReply) {
    const reqParams = z.object({
      id: z.string(),
    })

    const param = reqParams.parse(req.params)

    try {
      const exp = await this.service.getExpenseById(param.id)
      res.send(exp.getData())
    } catch (error) {
      const data = GetErrorType(req, error)
      res.status(data.status).send(data)
    }
  }

  async createGain(req: FastifyRequest, res: FastifyReply) {
    try {
      const reqBody = z.object({
        name: z.string(),
        at: z.coerce.date(),
        value: z.number(),
        category: z.nativeEnum(GainCategory),
        userId: z.string(),
      })

      const body = reqBody.parse(req.body)

      const created = await this.service.createGain(body)

      res.header('Location', `/gains/${created.getData().id}`)
      res.status(201).send(created.getData())
    } catch (error) {
      const data = GetErrorType(req, error)
      res.status(data.status).send(data)
    }
  }

  async createExpense(req: FastifyRequest, res: FastifyReply) {
    try {
      const reqBody = z.object({
        name: z.string(),
        at: z.coerce.date(),
        value: z.number(),
        category: z.nativeEnum(ExpenseCategory),
        userId: z.string(),
      })

      const body = reqBody.parse(req.body)

      const created = await this.service.createExpense(body)

      res.header('Location', `/expense/${created.getData().id}`)
      res.status(201).send(created.getData())
    } catch (error) {
      const data = GetErrorType(req, error)
      res.status(data.status).send(data)
    }
  }

  async deleteGain(req: FastifyRequest, res: FastifyReply) {
    const reqParams = z.object({
      id: z.string(),
    })

    const params = reqParams.parse(req.params)

    try {
      await this.service.deleteGain(params.id)

      res.status(204).send()
    } catch (err) {
      const data = GetErrorType(req, err)
      res.status(data.status).send(data)
    }
  }

  async deleteExpense(req: FastifyRequest, res: FastifyReply) {
    const reqParams = z.object({
      id: z.string(),
    })

    const params = reqParams.parse(req.params)

    try {
      await this.service.deleteExpense(params.id)

      res.status(204).send()
    } catch (err) {
      const data = GetErrorType(req, err)
      res.status(data.status).send(data)
    }
  }

  async updateGain(req: FastifyRequest, res: FastifyReply) {
    const reqParams = z.object({
      id: z.string(),
    })

    const reqBody = z.object({
      name: z.string(),
      at: z.coerce.date(),
      value: z.number(),
      category: z.nativeEnum(GainCategory),
      userId: z.string(),
    })

    try {
      const params = reqParams.parse(req.params)
      const body = reqBody.parse(req.body)

      const gain = await this.service.updateGain(body, params.id)

      res.status(204).send(gain.getData())
    } catch (err) {
      const data = GetErrorType(req, err)
      res.status(data.status).send(data)
    }
  }

  async updateExpense(req: FastifyRequest, res: FastifyReply) {
    const reqParams = z.object({
      id: z.string(),
    })

    const reqBody = z.object({
      name: z.string(),
      at: z.coerce.date(),
      value: z.number(),
      category: z.nativeEnum(ExpenseCategory),
      userId: z.string(),
    })

    try {
      const params = reqParams.parse(req.params)
      const body = reqBody.parse(req.body)

      const expense = await this.service.updateExpense(body, params.id)

      res.status(204).send(expense.getData())
    } catch (err) {
      const data = GetErrorType(req, err)
      res.status(data.status).send(data)
    }
  }

  async getGainMonth(req: FastifyRequest, res: FastifyReply) {
    const reqParams = z.object({
      date: z.coerce.date(),
      userId: z.string(),
    })

    const params = reqParams.parse(req.params)

    const gains = await this.service.getGainByMonth(params.date, params.userId)

    res.send(gains.map(gain => gain.getData()))
  }

  async getExpenseMonth(req: FastifyRequest, res: FastifyReply) {
    const reqParams = z.object({
      date: z.coerce.date(),
      userId: z.string(),
    })

    const params = reqParams.parse(req.params)

    const gains = await this.service.getExpenseByMonth(params.date, params.userId)

    res.send(gains)
  }
}
