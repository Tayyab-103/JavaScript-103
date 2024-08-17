// import ModalImage from "@/_assets/png/view-template-modal.png";
import FrameImage from "@/_assets/svg/Frame.svg";
import { Box, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import Slide, { SlideProps } from "@mui/material/Slide";
import Image from "next/image";
import * as React from "react";
import { useTranslation } from "react-i18next";
import GlobelBtn from "../button/Button";

const Transition = React.forwardRef<HTMLDivElement, SlideProps>(
  function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  }
);

export default function TransitionsDialog({
  heading,
  description,
  open,
  cancel,
  proceed,
  closeModal = () => { },
  proceedText = "",
  cancelText = "",
}) {
  const { t } = useTranslation();
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => (closeModal ? closeModal() : cancel())}
      aria-describedby="alert-dialog-slide-description"
    >
      <Box
        sx={{
          textAlign: "center",
          padding: "50px 20px 35px",
          backgroundColor: "#f3ecda",
        }}
      >
        <Box
          sx={{
            width: { md: "130px", sm: "100px", xs: "70px" },
            margin: "auto",
          }}
        >
          <Image
            alt="image"
            src={FrameImage}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </Box>
        <Typography
          sx={{
            fontSize: { md: "22px", sm: "21.679px", xs: "15.508px" },
            fontWeight: 700,
            color: "#30422e",
            margin: { md: "20px 0", sm: "15px 0px", xs: "5px" },
          }}
        >
          {heading}
        </Typography>
        <Typography
          sx={{
            fontSize: { md: "16.5px", sm: "16.259px", xs: "11.631px" },
            color: "#30422e",
            width: { md: "500px", sm: "400px" },
          }}
        >
          {description}
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: "15px",
            flexDirection: { sm: "row", xs: "column" },
            justifyContent: "center",
            mt: "20px",
            flexWrap: "wrap",
          }}
        >
          <Box flex={1}>
            <GlobelBtn
              btnText={cancelText ? cancelText : `${t("modals.no")}`}
              bgColor="transparent"
              color="#e1693b"
              border="1px solid #e1693b"
              width="100%"
              onClick={cancel}
            />
          </Box>
          <Box flex={1}>
            <GlobelBtn
              btnText={proceedText ? proceedText : `${t("modals.yes")}`}
              bgColor="#e1693b"
              color="#fff"
              width="100%"
              onClick={proceed}
            />
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
}