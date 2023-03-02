import { Expense, Gain } from '@prisma/client'
import { ExpenseEntity } from 'src/entities/Expense'
import { GainEntity } from 'src/entities/Gain.js'
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
      balance,
      totalGain,
      totalExpenses,
      months: last2Years,
    }
  }
}
