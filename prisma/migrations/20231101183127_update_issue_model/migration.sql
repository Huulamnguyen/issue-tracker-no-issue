/*
  Warnings:

  - A unique constraint covering the columns `[customerEmail]` on the table `Issue` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Issue` ADD COLUMN `category` ENUM('SHIPPING', 'DISCOUNT', 'ORDER', 'HOURS', 'ADDRESS', 'REFUND', 'MISSING', 'DAMAGE', 'RETURN', 'WARRANTY', 'OTHER') NOT NULL DEFAULT 'OTHER',
    ADD COLUMN `customerEmail` VARCHAR(191) NULL,
    ADD COLUMN `orderNumer` VARCHAR(10) NULL;

-- AlterTable
ALTER TABLE `Question` MODIFY `category` ENUM('SHIPPING', 'DISCOUNT', 'ORDER', 'HOURS', 'ADDRESS', 'REFUND', 'MISSING', 'DAMAGE', 'RETURN', 'WARRANTY', 'OTHER') NOT NULL DEFAULT 'OTHER';

-- CreateIndex
CREATE UNIQUE INDEX `Issue_customerEmail_key` ON `Issue`(`customerEmail`);
