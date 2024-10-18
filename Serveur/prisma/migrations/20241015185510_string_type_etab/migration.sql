/*
  Warnings:

  - You are about to alter the column `type_etablissement` on the `demande` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(6))` to `VarChar(191)`.
  - You are about to alter the column `statut` on the `directeur_general` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(3))` to `VarChar(191)`.
  - You are about to alter the column `type_etablissement` on the `etablissement` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `VarChar(191)`.
  - You are about to alter the column `statut` on the `inspection` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(5))` to `VarChar(191)`.
  - You are about to alter the column `statut` on the `paiement` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(2))` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `demande` MODIFY `type_etablissement` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `directeur_general` MODIFY `statut` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `etablissement` MODIFY `type_etablissement` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `inspection` MODIFY `statut` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `paiement` MODIFY `statut` VARCHAR(191) NOT NULL;
