-- CreateEnum
CREATE TYPE "FileKind" AS ENUM ('DOCUMENT', 'IMAGE', 'DATA');

-- CreateEnum
CREATE TYPE "FileStatus" AS ENUM ('PROCESSING', 'INDEXED', 'ERROR');

-- CreateTable
CREATE TABLE "File" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "mime" TEXT NOT NULL,
    "kind" "FileKind" NOT NULL,
    "status" "FileStatus" NOT NULL DEFAULT 'INDEXED',
    "pages" INTEGER,
    "text" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
