-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mar. 29 nov. 2022 à 14:57
-- Version du serveur : 10.4.27-MariaDB
-- Version de PHP : 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `barv1`
--

-- --------------------------------------------------------

--
-- Structure de la table `boissons`
--

CREATE TABLE `boissons` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `degre` float NOT NULL,
  `picture` varchar(255) NOT NULL,
  `categorie` varchar(255) NOT NULL,
  `taillesPrix` varchar(255) NOT NULL,
  `dispo` tinyint(1) NOT NULL,
  `description` text NOT NULL DEFAULT 'Lorem ipsum dolor sit amet, consectetur',
  `created` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `boissons`
--

INSERT INTO `boissons` (`id`, `name`, `degre`, `picture`, `categorie`, `taillesPrix`, `dispo`, `description`, `created`) VALUES
(1, 'Triple Secret des moines', 8.5, 'http://brasserie-goudale.com/wp-content/uploads/2018/05/Triple-fond-7499.jpg', 'Bière', '{\"25cl\":\"3€\",\"50cl\":\"5€\",\"1L\":\"10€\"}', 1, 'Lorem ipsum dolor sit amet, consectetur', '2022-11-26 15:06:20'),
(2, 'Cuvée des trolls', 7, 'https://www.dubuisson.com/wp-content/uploads/2018/06/logo-trolls-1-300x300.png', 'Bière', '{\"25cl\":\"3€\",\"50cl\":\"5€\",\"1L\":\"10€\"}', 1, 'Lorem ipsum dolor sit amet, consectetur', '2022-11-26 15:06:20'),
(3, 'Coca', 0, 'https://logo-marque.com/wp-content/uploads/2020/08/Coca-Cola-Embleme.png', 'Soft', '{\"1L\":\"5€\"}', 1, 'Lorem ipsum dolor sit amet, consectetur', '2022-11-26 15:06:20');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `boissons`
--
ALTER TABLE `boissons`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Boissons_name_unique` (`name`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `boissons`
--
ALTER TABLE `boissons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
