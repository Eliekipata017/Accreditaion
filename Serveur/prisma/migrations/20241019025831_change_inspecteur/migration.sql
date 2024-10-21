/*
  Warnings:

  - You are about to drop the column `prenom` on the `inspecteur` table. All the data in the column will be lost.
  - You are about to drop the column `statut` on the `inspecteur` table. All the data in the column will be lost.
  - Added the required column `email` to the `Inspecteur` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `inspecteur` DROP COLUMN `prenom`,
    DROP COLUMN `statut`,
    ADD COLUMN `email` VARCHAR(191) NOT NULL;
