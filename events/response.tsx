import { Typography } from "@mui/material";

const RichTextViewer = ({ htmlContent }) => {
  return (
    <Typography
      dangerouslySetInnerHTML={{ __html: "htmlContent" }}
      sx={{ whiteSpace: "pre-line" }}
    />
  );
};

export default RichTextViewer;
