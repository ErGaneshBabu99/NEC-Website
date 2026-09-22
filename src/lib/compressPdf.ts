import { PDFDocument } from "pdf-lib";

// Best-effort PDF compression: re-saving through pdf-lib with object
// streams enabled strips duplicate/unused objects and re-compresses the
// internal structure. It shrinks most PDFs somewhat — text-heavy CVs
// often drop 20-40% — but can't losslessly shrink already-compressed
// embedded photos much further. Returns the smaller of the two versions,
// so it never makes a file bigger.
export async function compressPdf(file: File): Promise<File> {
  try {
    const bytes = await file.arrayBuffer();
    const pdf = await PDFDocument.load(bytes, { ignoreEncryption: true });
    const compressed = await pdf.save({ useObjectStreams: true });

    if (compressed.byteLength < bytes.byteLength) {
      return new File([compressed], file.name, { type: "application/pdf" });
    }
    return file;
  } catch {
    // Not a PDF pdf-lib can parse (e.g. scanned/corrupt) — return as-is
    // and let the size check downstream decide.
    return file;
  }
}
