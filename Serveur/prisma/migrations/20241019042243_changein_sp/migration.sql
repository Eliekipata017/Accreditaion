/*
  Warnings:

  - You are about to drop the column `id_etablissement` on the `inspection` table. All the data in the column will be lost.
  - You are about to drop the `paiement` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `inspection` DROP FOREIGN KEY `Inspection_id_etablissement_fkey`;

-- DropForeignKey
ALTER TABLE `paiement` DROP FOREIGN KEY `Paiement_id_etablissement_fkey`;

-- AlterTable
ALTER TABLE `inspection` DROP COLUMN `id_etablissement`;

-- DropTable
DROP TABLE `paiement`;
