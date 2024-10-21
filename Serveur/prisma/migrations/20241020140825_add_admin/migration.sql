/*
  Warnings:

  - A unique constraint covering the columns `[idAdmin]` on the table `Compte` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `compte` ADD COLUMN `idAdmin` INTEGER NULL;

-- CreateTable
CREATE TABLE `Admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Compte_idAdmin_key` ON `Compte`(`idAdmin`);

-- AddForeignKey
ALTER TABLE `Compte` ADD CONSTRAINT `Compte_idAdmin_fkey` FOREIGN KEY (`idAdmin`) REFERENCES `Admin`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
