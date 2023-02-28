/*
  Warnings:

  - Added the required column `category` to the `expenses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `gains` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "expenses" ADD COLUMN     "category" "ExpenseCategory" NOT NULL;

-- AlterTable
ALTER TABLE "gains" ADD COLUMN     "category" "GainCategory" NOT NULL;
