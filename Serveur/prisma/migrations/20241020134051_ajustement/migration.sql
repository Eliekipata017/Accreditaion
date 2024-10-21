/*
  Warnings:

  - You are about to drop the column `date_accreditation` on the `directeur_general` table. All the data in the column will be lost.
  - You are about to drop the column `prenom` on the `directeur_general` table. All the data in the column will be lost.
  - You are about to drop the column `statut` on the `directeur_general` table. All the data in the column will be lost.
  - Added the required column `type` to the `Inspecteur` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `directeur_general` DROP COLUMN `date_accreditation`,
    DROP COLUMN `prenom`,
    DROP COLUMN `statut`;

-- AlterTable
ALTER TABLE `inspecteur` ADD COLUMN `type` INTEGER NOT NULL;
