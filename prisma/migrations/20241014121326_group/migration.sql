-- AlterTable
ALTER TABLE "Certification" ADD COLUMN     "grade" SMALLINT,
ADD COLUMN     "status" VARCHAR,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "admin_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Submission" ADD COLUMN     "description" TEXT,
ADD COLUMN     "module" VARCHAR,
ADD COLUMN     "taskId" BIGINT,
ADD COLUMN     "title" VARCHAR,
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
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "taskName" TEXT,
    "description" TEXT,
    "groupId" BIGINT,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_task_ids_fkey" FOREIGN KEY ("task_ids") REFERENCES "Task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_user_ids_fkey" FOREIGN KEY ("user_ids") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
