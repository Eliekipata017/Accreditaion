-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mar. 22 oct. 2024 à 14:21
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `accreditation_db`
--

-- --------------------------------------------------------

--
-- Structure de la table `compte`
--

CREATE TABLE `compte` (
  `id` int(11) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `directeurGeneralId` int(11) DEFAULT NULL,
  `inspecteurId` int(11) DEFAULT NULL,
  `role` varchar(191) NOT NULL,
  `idAdmin` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `compte`
--

INSERT INTO `compte` (`id`, `email`, `password`, `directeurGeneralId`, `inspecteurId`, `role`, `idAdmin`) VALUES
(2, 'admin@gmail.com', 'admin1234', NULL, NULL, 'admin', 1),
(10, 'eliekipata006@gmail.com', 'insp1234', NULL, 22, 'inspGen', NULL),
(11, 'gamaKalambo@gmail.com', 'gama123', NULL, 23, 'insp', NULL),
(12, 'km@gmail.com', 'slfjsd', NULL, 26, 'insp', NULL),
(13, 'lunda@gmail.com', 'oli1234', NULL, 27, 'insp', NULL);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `compte`
--
ALTER TABLE `compte`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Compte_directeurGeneralId_key` (`directeurGeneralId`),
  ADD UNIQUE KEY `Compte_inspecteurId_key` (`inspecteurId`),
  ADD UNIQUE KEY `Compte_idAdmin_key` (`idAdmin`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `compte`
--
ALTER TABLE `compte`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `compte`
--
ALTER TABLE `compte`
  ADD CONSTRAINT `Compte_directeurGeneralId_fkey` FOREIGN KEY (`directeurGeneralId`) REFERENCES `directeur_general` (`id_directeur`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `Compte_idAdmin_fkey` FOREIGN KEY (`idAdmin`) REFERENCES `admin` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `Compte_inspecteurId_fkey` FOREIGN KEY (`inspecteurId`) REFERENCES `inspecteur` (`id_inspecteur`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
