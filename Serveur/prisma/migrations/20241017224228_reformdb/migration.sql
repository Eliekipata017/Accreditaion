/*
  Warnings:

  - You are about to alter the column `type_critere` on the `critere` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `VarChar(191)`.
  - You are about to drop the column `statut` on the `etablissement` table. All the data in the column will be lost.
  - You are about to drop the column `id_inspecteur` on the `inspection` table. All the data in the column will be lost.
  - Added the required column `nom` to the `Demande` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `inspection` DROP FOREIGN KEY `Inspection_id_inspecteur_fkey`;

-- AlterTable
ALTER TABLE `critere` MODIFY `type_critere` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `demande` ADD COLUMN `nom` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `etablissement` DROP COLUMN `statut`;

-- AlterTable
ALTER TABLE `inspection` DROP COLUMN `id_inspecteur`;

-- CreateTable
CREATE TABLE `inspectionInspecteur` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `inspectionId` INTEGER NOT NULL,
    `inspecteurId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `inspectionInspecteur` ADD CONSTRAINT `inspectionInspecteur_inspectionId_fkey` FOREIGN KEY (`inspectionId`) REFERENCES `Inspection`(`id_inspection`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inspectionInspecteur` ADD CONSTRAINT `inspectionInspecteur_inspecteurId_fkey` FOREIGN KEY (`inspecteurId`) REFERENCES `Inspecteur`(`id_inspecteur`) ON DELETE RESTRICT ON UPDATE CASCADE;
