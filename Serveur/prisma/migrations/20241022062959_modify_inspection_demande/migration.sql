/*
  Warnings:

  - You are about to drop the column `id_inspection` on the `demande` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `demande` DROP FOREIGN KEY `Demande_id_inspection_fkey`;

-- AlterTable
ALTER TABLE `demande` DROP COLUMN `id_inspection`;

-- CreateTable
CREATE TABLE `inspectionDemande` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `inspectionId` INTEGER NOT NULL,
    `demandeId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `inspectionDemande` ADD CONSTRAINT `inspectionDemande_inspectionId_fkey` FOREIGN KEY (`inspectionId`) REFERENCES `Inspection`(`id_inspection`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inspectionDemande` ADD CONSTRAINT `inspectionDemande_demandeId_fkey` FOREIGN KEY (`demandeId`) REFERENCES `Demande`(`id_demande`) ON DELETE RESTRICT ON UPDATE CASCADE;
