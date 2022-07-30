/*
  Warnings:

  - You are about to drop the column `user_id` on the `Notifications` table. All the data in the column will be lost.
  - Added the required column `userAction_id` to the `Notifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userNotification_id` to the `Notifications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Notifications` DROP COLUMN `user_id`,
    ADD COLUMN `userAction_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `userNotification_id` VARCHAR(191) NOT NULL;
