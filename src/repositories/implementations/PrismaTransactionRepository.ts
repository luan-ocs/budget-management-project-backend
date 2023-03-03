import { PrismaClient } from '@prisma/client'
import dayjs from 'dayjs'
import { ExpenseEntity } from '../../entities/Expense.js'
import { GainEntity } from '../../entities/Gain.js'
import { MonthEntity } from '../../entities/Month.js'
import { TransactionRepository } from '../TransactionRepository.js'

export class PrismaTransactionRepository implements TransactionRepository {
  private gainRepo
  private expenseRepo

  constructor(client: PrismaClient) {
    this.gainRepo = client.gain
    this.expenseRepo = client.expense
  }

  async getGainById(gainid: string): Promise<GainEntity> {
    const gain = await this.gainRepo.findUnique({
      where: {
        id: gainid,
      },
    })

    if (!gain) {
      throw new Error('gain not found')
    }

    return new GainEntity(gain, gain.id)
  }

  async getExpenseById(expenseid: string): Promise<ExpenseEntity> {
    const expense = await this.expenseRepo.findUnique({
      where: {
        id: expenseid,
      },
    })

    if (!expense) {
      throw new Error('expense not found')
    }

    return new ExpenseEntity(expense, expense.id)
  }

  async createGain(gain: GainEntity): Promise<GainEntity> {
    const created = await this.gainRepo.create({
      data: gain.getData(),
    })

    return new GainEntity(created, created.id)
  }
  async createExpense(expense: ExpenseEntity): Promise<ExpenseEntity> {
    const created = await this.expenseRepo.create({
      data: expense.getData(),
    })

    return new ExpenseEntity(created, created.id)
  }

  async deleteGain(gainid: string): Promise<void> {
    await this.gainRepo.delete({
      where: {
        id: gainid,
      },
    })
  }
  async deleteExpense(expenseid: string): Promise<void> {
    await this.expenseRepo.delete({
      where: {
        id: expenseid,
      },
    })
  }

  async updateGain(gain: GainEntity): Promise<GainEntity> {
    const data = gain.getData()

    await this.getExpenseById(data.id)

    const updated = await this.gainRepo.update({
      data: data,
      where: {
        id: data.id,
      },
    })

    return new GainEntity(updated, updated.id)
  }

  async updateExpense(expense: ExpenseEntity): Promise<ExpenseEntity> {
    const data = expense.getData()

    await this.getExpenseById(data.id)

    const updated = await this.expenseRepo.update({
      data: data,
      where: {
        id: data.id,
      },
    })

    return new ExpenseEntity(updated, updated.id)
  }

  async monthData(date: Date, userid: string): Promise<MonthEntity> {
    const parsedDate = dayjs(date)
    const firstdayofmonth = parsedDate.startOf('month').toDate()
    const lastDayOfmonth = parsedDate.endOf('month').toDate()

    const gains = await this.gainRepo
      .findMany({
        where: {
          userId: userid,
          at: {
            lte: lastDayOfmonth,
            gte: firstdayofmonth,
          },
        },
      })
      .then(gainArr => gainArr.map(gain => new GainEntity(gain, gain.id)))

    const expenses = await this.expenseRepo
      .findMany({
        where: {
          userId: userid,
          at: {
            lte: lastDayOfmonth,
            gte: firstdayofmonth,
          },
        },
      })
      .then(exp => exp.map(exp => new ExpenseEntity(exp, exp.id)))

    return new MonthEntity(gains, expenses)
  }
  async last2Year(userid: string): Promise<MonthEntity[]> {
    const parsedDate = dayjs().startOf('month')

    let last2YearDate = parsedDate.subtract(2, 'year')

    const months: MonthEntity[] = []

    while (last2YearDate.isBefore(parsedDate)) {
      const monthData = await this.monthData(last2YearDate.toDate(), userid)
      months.push(monthData)

      last2YearDate = last2YearDate.add(1, 'month')
    }

    return months
  }

  async getGainByMonth(date: Date, userid: string) {
    const startofMonth = dayjs(date).startOf('month').toDate()
    const endOfMonth = dayjs(date).endOf('month').toDate()

    const gains = await this.gainRepo.findMany({
      where: {
        userId: userid,
        at: {
          lte: endOfMonth,
          gte: startofMonth,
        },
      },
    })

    return gains.map(g => new GainEntity(g, g.id))
  }

  async getExpenseByMonth(date: Date, userid: string) {
    const startofMonth = dayjs(date).startOf('month').toDate()
    const endOfMonth = dayjs(date).endOf('month').toDate()

    const expenses = await this.expenseRepo.findMany({
      where: {
        userId: userid,
        at: {
          lte: endOfMonth,
          gte: startofMonth,
        },
      },
    })

    return expenses.map(expense => new ExpenseEntity(expense, expense.id))
  }
}
