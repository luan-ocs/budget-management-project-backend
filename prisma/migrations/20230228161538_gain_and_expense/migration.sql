-- CreateEnum
CREATE TYPE "GainCategory" AS ENUM ('SALARIO', 'INVESTIMENTOS', 'FREELANCE', 'ALUGUEL', 'OUTROS');

-- CreateEnum
CREATE TYPE "ExpenseCategory" AS ENUM ('MORADIA', 'ALIMENTACAO', 'TRANSPORTE', 'PESSOAL', 'DIVIDAS');

-- CreateTable
CREATE TABLE "gains" (
    "name" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "gains_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expenses" (
    "name" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "expenses_pkey" PRIMARY KEY ("id")
);
