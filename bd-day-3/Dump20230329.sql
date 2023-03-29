CREATE DATABASE  IF NOT EXISTS `netflix` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `netflix`;
-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: netflix
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `actors`
--

DROP TABLE IF EXISTS `actors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `actors` (
  `isActor` int NOT NULL AUTO_INCREMENT,
  `name_` varchar(45) NOT NULL,
  `lastname` varchar(45) NOT NULL,
  `country` varchar(45) NOT NULL,
  `birthday` date DEFAULT NULL,
  PRIMARY KEY (`isActor`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actors`
--

LOCK TABLES `actors` WRITE;
/*!40000 ALTER TABLE `actors` DISABLE KEYS */;
INSERT INTO `actors` VALUES (1,'Tom','Hanks','Estados Unidos','1956-06-09'),(2,'Roberto','Benigni','Italia','1952-10-27'),(3,'John','Travolta','Estados Unidos','1954-02-18');
/*!40000 ALTER TABLE `actors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movies`
--

DROP TABLE IF EXISTS `movies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `gender` varchar(45) NOT NULL,
  `image` varchar(1000) NOT NULL,
  `category` varchar(45) NOT NULL,
  `yearDate` smallint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movies`
--

LOCK TABLES `movies` WRITE;
/*!40000 ALTER TABLE `movies` DISABLE KEYS */;
INSERT INTO `movies` VALUES (1,'Pulp Fiction','Crimen','https://pics.filmaffinity.com/pulp_fiction-210382116-large.jpg','Top 10',1994),(2,'La vita è bella','Comedia','https://pics.filmaffinity.com/la_vita_e_bella-646167341-mmed.jpg','Top 10',1997),(3,'Forrest Gump','Comedia','https://pics.filmaffinity.com/forrest_gump-212765827-mmed.jpg','Top 10',1994);
/*!40000 ALTER TABLE `movies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rel_movies_actors`
--

DROP TABLE IF EXISTS `rel_movies_actors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rel_movies_actors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `FKidActor` int NOT NULL,
  `FKidMovie` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKidActor` (`FKidActor`),
  KEY `FKidMovie` (`FKidMovie`),
  CONSTRAINT `rel_movies_actors_ibfk_1` FOREIGN KEY (`FKidActor`) REFERENCES `actors` (`isActor`),
  CONSTRAINT `rel_movies_actors_ibfk_2` FOREIGN KEY (`FKidMovie`) REFERENCES `movies` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rel_movies_actors`
--

LOCK TABLES `rel_movies_actors` WRITE;
/*!40000 ALTER TABLE `rel_movies_actors` DISABLE KEYS */;
INSERT INTO `rel_movies_actors` VALUES (1,1,3),(2,2,2),(3,3,1);
/*!40000 ALTER TABLE `rel_movies_actors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rel_movies_users`
--

DROP TABLE IF EXISTS `rel_movies_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rel_movies_users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `FKidUser` int NOT NULL,
  `FKidMovie` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKidUser` (`FKidUser`),
  KEY `FKidMovie` (`FKidMovie`),
  CONSTRAINT `rel_movies_users_ibfk_1` FOREIGN KEY (`FKidUser`) REFERENCES `users` (`idUSer`),
  CONSTRAINT `rel_movies_users_ibfk_2` FOREIGN KEY (`FKidMovie`) REFERENCES `movies` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rel_movies_users`
--

LOCK TABLES `rel_movies_users` WRITE;
/*!40000 ALTER TABLE `rel_movies_users` DISABLE KEYS */;
INSERT INTO `rel_movies_users` VALUES (10,1,1),(11,1,2),(12,3,2);
/*!40000 ALTER TABLE `rel_movies_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `idUSer` int NOT NULL AUTO_INCREMENT,
  `user_` varchar(45) NOT NULL,
  `password_` varchar(45) NOT NULL,
  `name_` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `plan_details` varchar(45) NOT NULL,
  PRIMARY KEY (`idUSer`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'laura_dev','laura','Laura','laura@gmail.com','Standard'),(3,'ester_dev','ester','Ester','ester@gmail.com','Standard');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-29 11:22:04
