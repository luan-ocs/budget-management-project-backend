import { PrismaClient } from '@prisma/client'
import { jest } from '@jest/globals'
import { mockDeep, DeepMockProxy } from 'jest-mock-extended'
import { prisma } from 'src/utils/prismaSettings'

const deepMock = mockDeep<PrismaClient>()

jest.mock('src/utils/prismaSettings', () => ({
  __esModule: true,

  default: deepMock,
}))

afterAll(() => {
  jest.deepUnmock('src/utils/prismaSettings')
})
export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>
