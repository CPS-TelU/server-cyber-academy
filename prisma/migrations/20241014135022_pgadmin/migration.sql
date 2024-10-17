/*
  Warnings:

  - You are about to drop the column `closedAt` on the `Submission` table. All the data in the column will be lost.
  - You are about to drop the column `file` on the `Submission` table. All the data in the column will be lost.
  - You are about to drop the column `openedAt` on the `Submission` table. All the data in the column will be lost.
  - Added the required column `uploadedAt` to the `Submission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Certification" ADD COLUMN     "grade" SMALLINT,
ADD COLUMN     "status" VARCHAR,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "admin_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Submission" DROP COLUMN "closedAt",
DROP COLUMN "file",
DROP COLUMN "openedAt",
ADD COLUMN     "status" VARCHAR,
ADD COLUMN     "taskId" BIGINT,
ADD COLUMN     "uploadedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "user_id" DROP NOT NULL,
ALTER COLUMN "admin_id" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Group" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "groupName" TEXT DEFAULT '',
    "user_ids" INTEGER,
    "task_ids" BIGINT,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" BIGSERIAL NOT NULL,
    "openedAt" TIMESTAMP(6) NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "closedAt" TIMESTAMP(6),
    "file" TEXT NOT NULL,
    "module" VARCHAR,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_task_ids_fkey" FOREIGN KEY ("task_ids") REFERENCES "Task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_user_ids_fkey" FOREIGN KEY ("user_ids") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
