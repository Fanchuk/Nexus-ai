import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/session";

const f = createUploadthing();

const DOCX = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

export const fileRouter = {
  document: f({
    pdf: { maxFileSize: "16MB" },
    text: { maxFileSize: "16MB" },
    [DOCX]: { maxFileSize: "16MB" },
  })
    .middleware(async () => {
      const user = await getUser();
      if (!user) throw new UploadThingError("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const created = await prisma.file.create({
        data: {
          userId: metadata.userId,
          name: file.name,
          key: file.key,
          url: file.ufsUrl ?? file.url,
          size: file.size,
          mime: file.type,
          kind: "DOCUMENT",
          status: "PROCESSING",
        },
      });

      return { fileId: created.id };
    }),
} satisfies FileRouter;

export type AppFileRouter = typeof fileRouter;