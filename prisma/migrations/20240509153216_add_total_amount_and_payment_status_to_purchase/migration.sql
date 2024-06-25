/*
  Warnings:

  - You are about to drop the column `address` on the `Purchase` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `Purchase` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Purchase` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `Purchase` table. All the data in the column will be lost.
  - You are about to drop the column `ticketType` on the `Purchase` table. All the data in the column will be lost.
  - Added the required column `paymentMethod` to the `Purchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `raffleType` to the `Purchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Purchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Purchase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Purchase` DROP COLUMN `address`,
    DROP COLUMN `city`,
    DROP COLUMN `email`,
    DROP COLUMN `fullName`,
    DROP COLUMN `ticketType`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `paymentMethod` VARCHAR(191) NOT NULL,
    ADD COLUMN `paymentStatus` VARCHAR(191) NOT NULL DEFAULT 'pending',
    ADD COLUMN `raffleType` VARCHAR(191) NOT NULL,
    ADD COLUMN `totalAmount` DOUBLE NOT NULL DEFAULT 0.0,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `SelectedNumber` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `purchaseId` INTEGER NOT NULL,
    `number` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Purchase` ADD CONSTRAINT `Purchase_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SelectedNumber` ADD CONSTRAINT `SelectedNumber_purchaseId_fkey` FOREIGN KEY (`purchaseId`) REFERENCES `Purchase`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
