-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: docker-yml-db-1:3306
-- Waktu pembuatan: 23 Agu 2023 pada 15.48
-- Versi server: 10.8.3-MariaDB-1:10.8.3+maria~jammy
-- Versi PHP: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_msib_sugity_db_3`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `task`
--

CREATE TABLE `task` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `items` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `task`
--

INSERT INTO `task` (`id`, `user_id`, `items`, `createdAt`, `updatedAt`) VALUES
(2, 7, 'Dua tiga task', '2023-08-21 04:42:06', '2023-08-23 15:31:49'),
(5, 7, 'Belajar Koding', '2023-08-23 15:26:14', '2023-08-23 15:26:14'),
(6, 7, 'Belajar Desain', '2023-08-23 15:26:20', '2023-08-23 15:26:20'),
(7, 7, 'Belajar Video Editing', '2023-08-23 15:26:25', '2023-08-23 15:26:25'),
(8, 2, 'Ini task punya Ade yang ke 1', '2023-08-23 15:43:14', '2023-08-23 15:44:27'),
(9, 2, 'Ini task punya Ade yang ke 2', '2023-08-23 15:43:26', '2023-08-23 15:43:26'),
(10, 2, 'Ini task punya Ade yang ke 3', '2023-08-23 15:43:31', '2023-08-23 15:43:31');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `nama`, `username`, `password`) VALUES
(2, 'ade sandi', 'ade', '$2b$10$CPnN.KwKZrqoanZcQ8grOu3FjU6kaJ2NcLzId8aWA5A61QcJSQ1K6'),
(7, 'ado setiawan', 'ado', '$2b$10$4CR6Nr5RewBeBKu9MBaAC.hZlp9IMv1qsTstyd5tMoRpEUNgURTEW'),
(8, 'Rizal Ramali', 'rizal', '$2b$10$KjFrN5VDAbN/smVMKa9eT.x2rMZO6r8LoDuvjiJvz7DnY5buaUu.S');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `task`
--
ALTER TABLE `task`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
