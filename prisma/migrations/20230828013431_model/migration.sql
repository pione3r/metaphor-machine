/*
  Warnings:

  - You are about to drop the `Sentence` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Sentence`;

-- CreateTable
CREATE TABLE `Noun` (
    `id` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
