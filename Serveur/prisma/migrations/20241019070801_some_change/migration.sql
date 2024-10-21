/*
  Warnings:

  - You are about to drop the column `email` on the `inspecteur` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `inspecteur` DROP COLUMN `email`;

-- CreateTable
CREATE TABLE `Compte` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `directeurGeneralId` INTEGER NULL,
    `inspecteurId` INTEGER NULL,

    UNIQUE INDEX `Compte_directeurGeneralId_key`(`directeurGeneralId`),
    UNIQUE INDEX `Compte_inspecteurId_key`(`inspecteurId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Compte` ADD CONSTRAINT `Compte_directeurGeneralId_fkey` FOREIGN KEY (`directeurGeneralId`) REFERENCES `Directeur_General`(`id_directeur`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Compte` ADD CONSTRAINT `Compte_inspecteurId_fkey` FOREIGN KEY (`inspecteurId`) REFERENCES `Inspecteur`(`id_inspecteur`) ON DELETE SET NULL ON UPDATE CASCADE;
