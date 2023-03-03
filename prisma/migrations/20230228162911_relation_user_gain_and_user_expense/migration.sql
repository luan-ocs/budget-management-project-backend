/*
  Warnings:

  - Added the required column `userId` to the `expenses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `gains` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "expenses" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "gains" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "gains" ADD CONSTRAINT "gains_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
