/*
  Warnings:

  - You are about to drop the `inspectiondemande` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `date_accreditation` to the `Directeur_General` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prenom` to the `Directeur_General` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statut` to the `Directeur_General` table without a default value. This is not possible if the table is not empty.
  - Added the required column `demandeId` to the `Inspection` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `inspectiondemande` DROP FOREIGN KEY `inspectionDemande_demandeId_fkey`;

-- DropForeignKey
ALTER TABLE `inspectiondemande` DROP FOREIGN KEY `inspectionDemande_inspectionId_fkey`;

-- AlterTable
ALTER TABLE `directeur_general` ADD COLUMN `date_accreditation` DATETIME(3) NOT NULL,
    ADD COLUMN `prenom` VARCHAR(191) NOT NULL,
    ADD COLUMN `statut` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `inspection` ADD COLUMN `demandeId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `inspectiondemande`;

-- AddForeignKey
ALTER TABLE `Inspection` ADD CONSTRAINT `Inspection_demandeId_fkey` FOREIGN KEY (`demandeId`) REFERENCES `Demande`(`id_demande`) ON DELETE RESTRICT ON UPDATE CASCADE;
