import { ExpenseCategory, GainCategory } from '@prisma/client'
import { ExpenseEntity } from './Expense.js'
import { GainEntity } from './Gain.js'

export class MonthEntity {
  private gains: GainEntity[] = []
  private expenses: ExpenseEntity[] = []

  constructor(gains: GainEntity[], expenses: ExpenseEntity[]) {
    this.gains = gains
    this.expenses = expenses
  }

  public totalGains(): number {
    return this.gains.reduce((prev, next) => prev + next.getValue(), 0)
  }

  public totalExpenses(): number {
    return this.expenses.reduce((prev, next) => prev + next.getValue(), 0)
  }

  public totalBalance(): number {
    return this.totalGains() - this.totalExpenses()
  }

  public gainbyCategory() {
    return this.gains.reduce(
      (prev, next) => prev.set(next.getData().category, (prev.get(next.getData().category) || 0) + next.getValue()),
      new Map<GainCategory, number>(),
    )
  }

  public expenseByCategory() {
    return this.expenses.reduce(
      (prev, next) => prev.set(next.getData().category, (prev.get(next.getData().category) || 0) + next.getValue()),
      new Map<ExpenseCategory, number>(),
    )
  }
}
