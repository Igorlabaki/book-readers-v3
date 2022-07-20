/*
  Warnings:

  - You are about to drop the column `currentlyReading` on the `userBooks` table. All the data in the column will be lost.
  - You are about to drop the column `wantRead` on the `userBooks` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[google]` on the table `books` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `listType` to the `userBooks` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `books_title_key` ON `books`;

-- AlterTable
ALTER TABLE `userBooks` DROP COLUMN `currentlyReading`,
    DROP COLUMN `wantRead`,
    ADD COLUMN `listType` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `books_google_key` ON `books`(`google`);
