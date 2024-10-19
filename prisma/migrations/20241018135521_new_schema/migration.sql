/*
  Warnings:

  - You are about to drop the column `question_id` on the `answers` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `answers` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `groups` table. All the data in the column will be lost.
  - You are about to drop the column `link` on the `moduls` table. All the data in the column will be lost.
  - You are about to drop the column `topic_id` on the `questions` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `questions` table. All the data in the column will be lost.
  - You are about to drop the column `group_id` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `taskName` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `topics` table. All the data in the column will be lost.
  - Added the required column `questionId` to the `answers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `answers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `file` to the `moduls` table without a default value. This is not possible if the table is not empty.
  - Added the required column `topicId` to the `questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `opened_at` to the `tasks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `tasks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `topics` table without a default value. This is not possible if the table is not empty.
  - Made the column `password` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `github` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `year` on the `users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "answers" DROP CONSTRAINT "answers_question_id_fkey";

-- DropForeignKey
ALTER TABLE "answers" DROP CONSTRAINT "answers_user_id_fkey";

-- DropForeignKey
ALTER TABLE "groups" DROP CONSTRAINT "groups_user_id_fkey";

-- DropForeignKey
ALTER TABLE "questions" DROP CONSTRAINT "questions_topic_id_fkey";

-- DropForeignKey
ALTER TABLE "questions" DROP CONSTRAINT "questions_user_id_fkey";

-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_group_id_fkey";

-- DropForeignKey
ALTER TABLE "topics" DROP CONSTRAINT "topics_user_id_fkey";

-- AlterTable
ALTER TABLE "answers" DROP COLUMN "question_id",
DROP COLUMN "user_id",
ADD COLUMN     "questionId" TEXT NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "groups" DROP COLUMN "user_id";

-- AlterTable
ALTER TABLE "moduls" DROP COLUMN "link",
ADD COLUMN     "closed_at" TIMESTAMP(6),
ADD COLUMN     "file" TEXT NOT NULL,
ADD COLUMN     "opened_at" TIMESTAMP(6),
ALTER COLUMN "user_id" DROP NOT NULL,
ALTER COLUMN "admin_id" DROP NOT NULL,
ALTER COLUMN "status" DROP NOT NULL;

-- AlterTable
ALTER TABLE "questions" DROP COLUMN "topic_id",
DROP COLUMN "user_id",
ADD COLUMN     "topicId" TEXT NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "submisions" ADD COLUMN     "created_at" TIMESTAMP(6),
ADD COLUMN     "grade" SMALLINT,
ADD COLUMN     "status" TEXT,
ALTER COLUMN "submitted" DROP NOT NULL,
ALTER COLUMN "group_id" DROP NOT NULL,
ALTER COLUMN "task_id" DROP NOT NULL,
ALTER COLUMN "user_id" DROP NOT NULL,
ALTER COLUMN "admin_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "group_id",
DROP COLUMN "taskName",
ADD COLUMN     "closed_at" TIMESTAMP(6),
ADD COLUMN     "file" TEXT,
ADD COLUMN     "groupId" INTEGER,
ADD COLUMN     "module" VARCHAR,
ADD COLUMN     "opened_at" TIMESTAMP(6) NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "topics" DROP COLUMN "user_id",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "group_id" INTEGER,
ALTER COLUMN "password" SET NOT NULL,
ALTER COLUMN "github" SET NOT NULL,
DROP COLUMN "year",
ADD COLUMN     "year" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "topics" ADD CONSTRAINT "topics_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "topics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
