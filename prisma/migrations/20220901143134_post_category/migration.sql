/*
  Warnings:

  - The primary key for the `PostCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `PostCategory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PostCategory" DROP CONSTRAINT "PostCategory_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "PostCategory_pkey" PRIMARY KEY ("postId", "categoryId");
