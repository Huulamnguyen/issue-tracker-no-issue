/*
  Warnings:

  - You are about to drop the column `orderNumer` on the `Issue` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Issue` DROP COLUMN `orderNumer`,
    ADD COLUMN `orderNumber` VARCHAR(10) NULL;
