-- AlterTable
ALTER TABLE "Prompt" ADD COLUMN     "cardId" TEXT;

-- AddForeignKey
ALTER TABLE "Prompt" ADD CONSTRAINT "Prompt_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE CASCADE ON UPDATE CASCADE;
