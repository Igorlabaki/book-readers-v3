/*
  Warnings:

  - Added the required column `updatedAt` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `posts` ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
