CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE "Chunk" (
    "id" TEXT NOT NULL,
    "fileId" TEXT NOT NULL,
    "page" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "embedding" vector(768),

    CONSTRAINT "Chunk_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "Chunk_fileId_idx" ON "Chunk"("fileId");

CREATE INDEX "Chunk_embedding_idx" ON "Chunk"
USING hnsw ("embedding" vector_cosine_ops);

ALTER TABLE "Chunk" ADD CONSTRAINT "Chunk_fileId_fkey"
FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE CASCADE ON UPDATE CASCADE;