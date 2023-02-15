import { PrismaClient } from '@prisma/client'
import { jest } from '@jest/globals'
import { mockDeep, DeepMockProxy } from 'jest-mock-extended'
import { prisma } from 'src/utils/prismaSettings'

const deepMock = mockDeep<PrismaClient>()

jest.mock('src/utils/prismaSettings', () => ({
  __esModule: true,

  default: deepMock,
}))

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>
