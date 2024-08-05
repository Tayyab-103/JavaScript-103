import { LoginData } from "@/interface/authInterface";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import * as Yup from "yup";
import Forget from "../../../public/ForgetPasswod.svg";
import Logo from "../../../public/logo.svg";
import Carousel from "../../components/authComponent/Carousel";
import Carousel1 from "../../../public/carousel1.png";
import Carousel2 from "../../../public/carousel.png";
import Carousel3 from "../../../public/carousel3.png";

const ForgetPasswordLink = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();
  const { email } = router.query;
  const { t } = useTranslation();

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleRememberMeChange = (event: any) => {
    setRememberMe(event.target.checked);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (data: LoginData) => {

    },
    validationSchema: Yup.object({
      email: Yup.string().email().required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
  });
  const carouselItems = [
    { path: Carousel1, alt: "Login Image" },
    { path: Carousel2, alt: "Signup Image" },
    { path: Carousel3, alt: "Signup Image" },

    // Add more images as needed
  ];

  return (
    <Box
      sx={{
        display: "grid",
        alignItems: "center",
        gridTemplateColumns: {
          md: "repeat(2, minmax(0, 1fr))",
          xs: "repeat(1, minmax(0, 1fr))",
        },
        gap: "1rem",
        backgroundColor: "#FFF7EA",
        height: "100dvh",
        p: "20px",
        boxSizing: "border-box",
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
          <Image src={Logo} width={223} height={165} alt="Logo Image" />
          <Typography
            sx={{ color: "#000000", fontSize: "30px", marginTop: "40px" }}
          >
            {t("ForgetPassswordLink.forgotPassword")}
          </Typography>
        </Box>
        <Box sx={{ marginTop: "100px" }}>
          <Box>
            <Typography
              sx={{
                color: "#5B5B5B",
                fontSize: "21px",
                justifyContent: "left",
              }}
            >
              {t("ForgetPassswordLink.resetPassword")} <br />
              {email}. {t("ForgetPassswordLink.clickLink")}
              <br /> {t("ForgetPassswordLink.reset")}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ForgetPasswordLink;
