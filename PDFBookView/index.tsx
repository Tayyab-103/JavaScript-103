import { lazy, Suspense } from "react";

const PDFViewer = lazy(() => import("./view"));

const PdfPage = () => {
  const pdfUrl =
    "https://res.cloudinary.com/dm3wjnhkv/image/upload/v1703831627/thelifescript/dyz9gggtcx4aju0dhn8k.pdf";

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <PDFViewer pdfUrl={pdfUrl} />
      </Suspense>
    </div>
  );
};

export default PdfPage;
