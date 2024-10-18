-- CreateTable
CREATE TABLE `Chef_Etablissement` (
    `id_chef` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_chef`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Critere` (
    `id_critere` INTEGER NOT NULL AUTO_INCREMENT,
    `nom_critere` VARCHAR(191) NOT NULL,
    `type_critere` ENUM('SECURITE', 'HYGIENE', 'QUALITE') NOT NULL,

    PRIMARY KEY (`id_critere`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Demande` (
    `id_demande` INTEGER NOT NULL AUTO_INCREMENT,
    `date_demande` DATETIME(3) NOT NULL,
    `nom_etablissement` VARCHAR(191) NOT NULL,
    `adresse` VARCHAR(191) NOT NULL,
    `type_etablissement` ENUM('HOPITAL', 'CLINIQUE', 'LABORATOIRE') NOT NULL,
    `statut` ENUM('EN_ATTENTE', 'VALIDE', 'REFUSE') NOT NULL,
    `id_inspection` INTEGER NULL,
    `email` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_demande`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Etablissement` (
    `id_etablissement` INTEGER NOT NULL AUTO_INCREMENT,
    `nom_etablissement` VARCHAR(191) NOT NULL,
    `type_etablissement` ENUM('HOPITAL', 'CLINIQUE', 'LABORATOIRE') NOT NULL,
    `adresse` VARCHAR(191) NOT NULL,
    `statut` ENUM('EN_ATTENTE', 'VALIDE', 'REFUSE') NOT NULL,
    `chefId` INTEGER NOT NULL,

    PRIMARY KEY (`id_etablissement`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Inspecteur` (
    `id_inspecteur` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `prenom` VARCHAR(191) NOT NULL,
    `statut` ENUM('EN_ATTENTE', 'VALIDE', 'REFUSE') NOT NULL,

    PRIMARY KEY (`id_inspecteur`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Inspection` (
    `id_inspection` INTEGER NOT NULL AUTO_INCREMENT,
    `date_inspection` DATETIME(3) NOT NULL,
    `type_inspection` VARCHAR(191) NOT NULL,
    `statut` ENUM('EN_ATTENTE', 'VALIDE', 'REFUSE') NOT NULL,
    `id_etablissement` INTEGER NOT NULL,
    `id_inspecteur` INTEGER NOT NULL,
    `id_directeur` INTEGER NULL,

    PRIMARY KEY (`id_inspection`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Evaluation` (
    `id_evaluation` INTEGER NOT NULL AUTO_INCREMENT,
    `note` INTEGER NOT NULL,
    `observation` VARCHAR(191) NOT NULL,
    `recommandation` VARCHAR(191) NOT NULL,
    `id_inspection` INTEGER NOT NULL,

    PRIMARY KEY (`id_evaluation`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Paiement` (
    `id_paiement` INTEGER NOT NULL AUTO_INCREMENT,
    `montant` DECIMAL(65, 30) NOT NULL,
    `statut` ENUM('EN_ATTENTE', 'VALIDE', 'REFUSE') NOT NULL,
    `date_paiement` DATETIME(3) NOT NULL,
    `id_etablissement` INTEGER NOT NULL,

    PRIMARY KEY (`id_paiement`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Directeur_General` (
    `id_directeur` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `prenom` VARCHAR(191) NOT NULL,
    `statut` ENUM('EN_ATTENTE', 'VALIDE', 'REFUSE') NOT NULL,
    `date_accreditation` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_directeur`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Demande` ADD CONSTRAINT `Demande_id_inspection_fkey` FOREIGN KEY (`id_inspection`) REFERENCES `Inspection`(`id_inspection`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Etablissement` ADD CONSTRAINT `Etablissement_chefId_fkey` FOREIGN KEY (`chefId`) REFERENCES `Chef_Etablissement`(`id_chef`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inspection` ADD CONSTRAINT `Inspection_id_etablissement_fkey` FOREIGN KEY (`id_etablissement`) REFERENCES `Etablissement`(`id_etablissement`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inspection` ADD CONSTRAINT `Inspection_id_inspecteur_fkey` FOREIGN KEY (`id_inspecteur`) REFERENCES `Inspecteur`(`id_inspecteur`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inspection` ADD CONSTRAINT `Inspection_id_directeur_fkey` FOREIGN KEY (`id_directeur`) REFERENCES `Directeur_General`(`id_directeur`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Evaluation` ADD CONSTRAINT `Evaluation_id_inspection_fkey` FOREIGN KEY (`id_inspection`) REFERENCES `Inspection`(`id_inspection`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Paiement` ADD CONSTRAINT `Paiement_id_etablissement_fkey` FOREIGN KEY (`id_etablissement`) REFERENCES `Etablissement`(`id_etablissement`) ON DELETE RESTRICT ON UPDATE CASCADE;
