import { Expense } from '@prisma/client'
import crypto from 'node:crypto'

export class ExpenseEntity {
  private data: Expense

  constructor(data: Omit<Expense, 'id'>, id: string) {
    const expenseData = { ...data, id: id || crypto.randomUUID() }
    this.data = expenseData
  }

  getValue() {
    return this.data.value
  }

  getData() {
    return this.data
  }
}
