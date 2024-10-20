/*
  Warnings:

  - You are about to drop the column `userId` on the `groups` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "groups" DROP CONSTRAINT "groups_userId_fkey";

-- AlterTable
ALTER TABLE "groups" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "group_id" INTEGER;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE SET NULL ON UPDATE CASCADE;
