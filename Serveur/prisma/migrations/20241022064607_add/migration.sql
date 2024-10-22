/*
  Warnings:

  - Added the required column `inspecteurId` to the `inspectionDemande` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `inspectiondemande` ADD COLUMN `inspecteurId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `inspectionDemande` ADD CONSTRAINT `inspectionDemande_inspecteurId_fkey` FOREIGN KEY (`inspecteurId`) REFERENCES `Inspecteur`(`id_inspecteur`) ON DELETE RESTRICT ON UPDATE CASCADE;
