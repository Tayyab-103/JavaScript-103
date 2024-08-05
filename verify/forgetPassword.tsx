import { Box, Grid, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";

import { ForgetPass } from "@/interface/authInterface";
import { forgetPassword } from "@/store/slices/authSlice";
import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";
import Carousel2 from "../../../public/carousel.png";
import Carousel1 from "../../../public/carousel1.png";
import Carousel3 from "../../../public/carousel3.png";
import Logo from "@/_assets/svg/lifeScript-logo.svg";
import Carousel from "../../components/authComponent/Carousel";

const ForgetPassword = () => {
  const [sentFailed, setSentFailed] = useState(false);
  const dispatch: any = useDispatch();
  const router = useRouter();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      email: "",
      type: "password",
    },
    onSubmit: async (data: ForgetPass) => {
      setSentFailed(false);
      dispatch(forgetPassword(data))
        .unwrap()
        .then(() => {
          toast.success(t("ForgetPassword.emailSentSuccessfully"));
          router.push(`/verify/forgetPasswordLink?email=${data.email}`);
        })
        .catch((error: any) => {
          setSentFailed(true);
        });
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required(t("ForgetPassword.emailRequired")),
    }),
  });
  const carouselItems = [
    { path: Carousel1, alt: "Login Image" },
    { path: Carousel2, alt: "Signup Image" },
    { path: Carousel3, alt: "Signup Image" },
  ];

  return (
    <Grid
      sx={{
        display: "grid",
        backgroundColor: "#FFF7EA",
        alignItems: "center",
        gridTemplateColumns: {
          md: "repeat(2, minmax(0, 1fr))",
          xs: "repeat(1, minmax(0, 1fr))",
        },
        gap: "1rem",
        p: "20px",
        height: "100dvh",
        overflowY: "scroll",
        color: "#000",
      }}
    >
      <Box sx={{ height: "auto", display: { md: "block", xs: "none" } }}>
        <Carousel items={carouselItems} />
      </Box>
      <Box
        sx={{
          maxWidth: "500px",
          width: "100%",
          margin: "0 auto",
        }}
      >
        <Box textAlign={"center"}>
          <Image src={Logo} width={320} alt="Logo Image" />
          <Typography
            sx={{ color: "#30422E", fontSize: "30px", marginTop: "50px" }}
          >
            {t("ForgetPassword.forgotPassword?")}
          </Typography>
        </Box>
        <Box sx={{ marginTop: "70px" }}>
          <Box sx={{ marginBottom: "14px" }}>
            <Typography
              sx={{ marginTop: "23px", color: "#30422E", fontSize: "21px" }}
            >
              {t("ForgetPassword.enterEmail")}
            </Typography>
            <Typography
              sx={{
                marginTop: "34px",
                fontSize: "21px",
                color: "#30422E"
              }}
            >
              {t("ForgetPassword.email")}
            </Typography>
            <TextField
              variant="outlined"
              name="email"
              placeholder={t("ForgetPassword.enter-email")}
              value={formik.values.email}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              sx={{
                marginTop: "15px",
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "white",
                  borderRadius: "2px", 
                },
                width: "100%",
              }}
            />
          </Box>
          {formik.touched.email && formik.errors.email && (
            <span style={{ color: "red" }}>{formik.errors.email}</span>
          )}
          {sentFailed && (
            <Box sx={{ mt: 2 }}>
              <Typography sx={{ color: "red" }}>
                {t("ForgetPassword.userNotFound")}
              </Typography>
            </Box>
          )}

          <Box
            sx={{
              justifyContent: "center",
              textAlign: "center",
              marginTop: "60px",
            }}
          >
            <Button
              variant="contained"
              onClick={(event) => formik.handleSubmit()}
              type="submit"
              sx={{
                borderRadius: "2px",
                backgroundColor: "#30422E",
                color: "white",
                width: "300px",
                padding: "15px",
                "&:hover": {
                  backgroundColor: "#186F65",
                },
                textTransform: "Capitalize",
              }}
            >
              {t("ForgetPassword.continue")}
            </Button>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

export default ForgetPassword;
