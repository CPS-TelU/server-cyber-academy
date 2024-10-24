/*
  Warnings:

  - You are about to drop the column `user_id` on the `groups` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "groups" DROP CONSTRAINT "groups_user_id_fkey";

-- AlterTable
ALTER TABLE "groups" DROP COLUMN "user_id";

-- CreateTable
CREATE TABLE "_GroupToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_GroupToUser_AB_unique" ON "_GroupToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_GroupToUser_B_index" ON "_GroupToUser"("B");

-- AddForeignKey
ALTER TABLE "_GroupToUser" ADD CONSTRAINT "_GroupToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupToUser" ADD CONSTRAINT "_GroupToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
