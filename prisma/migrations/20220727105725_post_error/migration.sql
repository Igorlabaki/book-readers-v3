/*
  Warnings:

  - Made the column `post_id` on table `Notifications` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Notifications` MODIFY `post_id` VARCHAR(191) NOT NULL;
