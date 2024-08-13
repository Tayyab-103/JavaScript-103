import { Box } from "@mui/material";
import Image from "next/image";

const Input = ({ width, height, backgroundColor, fontSize, placeHolder, img }) => {

  const inputStyles = {
    border: "none",
    outline: "none",
    backgroundColor: "transparent",
    color: "#3e4f3c",
    height: "55px",
    width: "100%",
    fontSize: "18px"
  };

  return <Box sx={{
    borderRadius: "2px",
    padding: "0 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#F5F5F5",
  }}
    height="55px"
    width="100%"
  >

    <input
      style={inputStyles}
      placeholder={placeHolder}
    />
    {img && <Image src={img} alt="icon" />}
  </Box >
}

export default Input;