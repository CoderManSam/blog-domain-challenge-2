-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_replyId_fkey";

-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "replyId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_replyId_fkey" FOREIGN KEY ("replyId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
