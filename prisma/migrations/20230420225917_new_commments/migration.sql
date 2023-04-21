/*
  Warnings:

  - The primary key for the `posts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `posts` table. All the data in the column will be lost.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_authorId_fkey";

-- AlterTable
ALTER TABLE "posts" DROP CONSTRAINT "posts_pkey",
DROP COLUMN "id",
ADD COLUMN     "idPost" SERIAL NOT NULL,
ADD CONSTRAINT "posts_pkey" PRIMARY KEY ("idPost");

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "id",
ADD COLUMN     "idUser" SERIAL NOT NULL,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("idUser");

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;
