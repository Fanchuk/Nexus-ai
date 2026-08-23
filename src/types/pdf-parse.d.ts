declare module "pdf-parse/lib/pdf-parse.js" {
  type PdfOptions = { pagerender?: (page: unknown) => Promise<string> };
  type PdfResult = { numpages: number; text: string };
  export default function pdf(data: Buffer, options?: PdfOptions): Promise<PdfResult>;
}