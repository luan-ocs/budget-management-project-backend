import { Expense, Gain } from '@prisma/client'
import { ExpenseEntity } from '../entities/Expense.js'
import { GainEntity } from '../entities/Gain.js'
import { TransactionRepository } from '../repositories/TransactionRepository.js'

export class TransactionService {
  private repository: TransactionRepository

  constructor(repo: TransactionRepository) {
    this.repository = repo
  }

  public async createGain(data: Omit<Gain, 'id'>) {
    const gain = new GainEntity(data)

    const created = await this.repository.createGain(gain)

    return created
  }

  public async createExpense(data: Omit<Expense, 'id'>) {
    const exp = new ExpenseEntity(data)

    const created = await this.repository.createExpense(exp)

    return created
  }

  public async last2Years(userid: string) {
    const last2Years = await this.repository.last2Year(userid)

    const balance = last2Years.reduce((acc, month) => acc + month.totalBalance(), 0)
    const totalGain = last2Years.reduce((acc, month) => acc + month.totalGains(), 0)
    const totalExpenses = last2Years.reduce((acc, month) => acc + month.totalExpenses(), 0)

    return {
      incomes: totalGain,
      expenses: totalExpenses,
      balance: balance,
      months: last2Years,
    }
  }

  public async getGainById(id: string) {
    return await this.repository.getGainById(id)
  }
  public async getExpenseById(id: string) {
    return await this.repository.getExpenseById(id)
  }

  public async deleteGain(id: string) {
    await this.repository.deleteGain(id)
  }

  public async deleteExpense(id: string) {
    await this.repository.deleteExpense(id)
  }

  public async updateGain(gainData: Omit<Gain, 'id'>, id: string) {
    const gain = new GainEntity(gainData, id)

    const updated = await this.repository.updateGain(gain)

    return updated
  }

  public async updateExpense(data: Omit<Expense, 'id'>, id: string) {
    const expense = new ExpenseEntity(data, id)

    const updated = await this.repository.updateExpense(expense)

    return updated
  }

  public async getGainByMonth(date: Date, userid: string) {
    const gains = await this.repository.getGainByMonth(date, userid)
    return gains
  }

  public async getExpenseByMonth(date: Date, userid: string) {
    const expense = await this.repository.getExpenseByMonth(date, userid)

    return expense
  }
}
