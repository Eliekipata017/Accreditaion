/*
  Warnings:

  - You are about to alter the column `statut` on the `demande` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(3))` to `Int`.
  - You are about to alter the column `statut` on the `etablissement` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(2))` to `Int`.
  - You are about to alter the column `statut` on the `inspecteur` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `Int`.

*/
-- AlterTable
ALTER TABLE `demande` MODIFY `statut` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `etablissement` MODIFY `statut` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `inspecteur` MODIFY `statut` INTEGER NOT NULL;
