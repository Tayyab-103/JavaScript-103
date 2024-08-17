import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import Backdrop from '@mui/material/Backdrop';
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const direction = lang === "ar" ? "rtl" : "ltr";
  const { children, onClose, ...other } = props;
  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      <div dir={direction}>{children}</div>
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomizationDialog({
  children,
  open,
  title,
  handleClose,
  customStyles,
  marginTop
}) {
  return (
    <Box sx={{ bgcolor: "#F3ECDA", maxWidth: "80vw" }}>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        // fullWidth={fullWidth}
        maxWidth={"xl"}
        // style={{ overflowY: "hidden" }}
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500, style: { backgroundColor: 'rgba(48, 66, 46, 0.85)' },
          },
        }}
        sx={{
          ".css-2rbg70-MuiPaper-root-MuiDialog-paper": {
            borderRadius: "4px",
            bgcolor: "#F3ECDA",
            mt:marginTop? marginTop:0
          }
        }}
      >
        <Box className="bg-black" sx={customStyles}>
          <BootstrapDialogTitle
            // id="customized-dialog-title"
            onClose={handleClose}
          >
            {title}
          </BootstrapDialogTitle>
          <DialogContent
            // dividers
            sx={{
              maxHeight: "100vh",
              overflowY: "auto",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {children}
          </DialogContent>
        </Box>
      </BootstrapDialog>
    </Box>
  );
}
