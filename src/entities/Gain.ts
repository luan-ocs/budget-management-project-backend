import { Gain } from '@prisma/client'
import crypto from 'node:crypto'

export class GainEntity {
  private data: Gain

  constructor(data: Omit<Gain, 'id'>, id: string) {
    const gainData = { ...data, id: id || crypto.randomUUID() }
    this.data = gainData
  }

  getValue() {
    return this.data.value
  }

  getData() {
    return this.data
  }
}
