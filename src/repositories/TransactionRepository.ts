import { MonthEntity } from '../entities/Month.js'
import { ExpenseEntity } from '../entities/Expense.js'
import { GainEntity } from '../entities/Gain.js'

export interface TransactionRepository {
  getGainById(gainid: string): Promise<GainEntity>
  getExpenseById(expenseid: string): Promise<ExpenseEntity>

  createGain(gain: GainEntity): Promise<GainEntity>
  createExpense(expense: ExpenseEntity): Promise<ExpenseEntity>

  deleteGain(gainid: string): Promise<void>
  deleteExpense(expenseid: string): Promise<void>

  updateGain(gain: GainEntity): Promise<GainEntity>
  updateExpense(expense: ExpenseEntity): Promise<ExpenseEntity>

  monthData(date: Date, userid: string): Promise<MonthEntity>
  last2Year(userid: string): Promise<MonthEntity[]>

  getGainByMonth(date: Date, userid: string): Promise<GainEntity[]>
  getExpenseByMonth(date: Date, userid: string): Promise<ExpenseEntity[]>
}
