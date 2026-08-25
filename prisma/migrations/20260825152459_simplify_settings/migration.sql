/*
  Warnings:

  - You are about to drop the column `density` on the `Settings` table. All the data in the column will be lost.
  - You are about to drop the column `lastX` on the `Settings` table. All the data in the column will be lost.
  - You are about to drop the column `lastY` on the `Settings` table. All the data in the column will be lost.
  - You are about to drop the column `lastZoom` on the `Settings` table. All the data in the column will be lost.
  - You are about to drop the column `theme` on the `Settings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Settings" DROP COLUMN "density",
DROP COLUMN "lastX",
DROP COLUMN "lastY",
DROP COLUMN "lastZoom",
DROP COLUMN "theme";
