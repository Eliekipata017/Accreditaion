/*
  Warnings:

  - You are about to drop the column `inspecteurId` on the `inspectiondemande` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `inspectiondemande` DROP FOREIGN KEY `inspectionDemande_inspecteurId_fkey`;

-- AlterTable
ALTER TABLE `inspectiondemande` DROP COLUMN `inspecteurId`;
