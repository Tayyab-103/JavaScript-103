import { Box, Typography } from "@mui/material";

export default function MultiToolTip({
  content,  // Expecting an array of objects with title and text properties
  position,
  top,
  bottom,
  left,
  right,
  transform = "translate(-35%)",
}) {
  return (
    <Box
      sx={{
        bgcolor: "#fff",
        border: "2px solid #E1683B",
        borderRadius: "4px",
        width: "300px",
        // width: "100%",
        height: "auto",
        position: position,
        top: top,
        bottom: bottom,
        left: left,
        right: right,
        transform: transform,
        boxShadow: "7px 10px 50px rgba(0, 0, 0, 0.25)",
        zIndex: "3",
        padding: "12px",
      }}
    >
      {content.map((item, index) => (
        <Box key={index} >
          <Box sx={{ display: "flex", alignItems: "center"}}>
            <Box
              sx={{
                width: "4px",
                height: "4px",
                bgcolor: "#3E4F3C",
                borderRadius: "50%",
                marginRight: "10px",
              }}
            ></Box>
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: "700",
                color: "#3E4F3C",
              }}
            >
              {item.title}
            </Typography>
          </Box>
          <Typography
            sx={{
              fontSize: "10px",
              fontWeight: 500,
              color: "#3E4F3C",
              marginLeft: "30px",
            }}
          >
            {item.text}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}