"use client";
import Logo from "@/_assets/svg/lifeScript-logo.svg";
import { verifyEmail } from "@/store/slices/authSlice";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Box, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";
import Carousel2 from "../../../public/carousel.png";
import Carousel1 from "../../../public/carousel1.png";
import Carousel3 from "../../../public/carousel3.png";
import Carousel from "./Carousel";



const CryptoJS = require("crypto-js");

const EmailVerification = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [otp, setOtp] = useState("");
  const dispatch: any = useDispatch();
  const { t } = useTranslation();

  function handleVerifyEmail(pass: any) {
    dispatch(verifyEmail({ email: pass.email, otp: pass.otp, password: pass.password }))

      .unwrap()
      .then((res) => {
        toast.success(t("Verify.emailVerifiedSuccessfully"));
        router.push(`/_auth/Auth`);
      })
      .catch((error: any) => {
        toast.error(error || t("Verify.failedVerifyEmail"));
      });
  }

  function getTokenFromURL(url: any) {
    var queryString = url.split("?")[1];
    var params = new URLSearchParams(queryString);
    return params.get("token");
  }
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const toggleCPasswordVisibility = () => {
    setShowCPassword((prevShowPassword) => !prevShowPassword);
  };

  const router = useRouter();
  const currentUrl = router.asPath;
  const token = getTokenFromURL(currentUrl);
  const ciphertext = token?.replace(/ /g, "+");


  useEffect(() => {
    if (ciphertext) {
      const bytes = CryptoJS.AES.decrypt(ciphertext, "No_Key_Found");
      const originalText = bytes.toString(CryptoJS.enc.Utf8);
      const decryptedData = JSON.parse(originalText);

      setUserEmail(decryptedData.email);
      setOtp(decryptedData.otp);
    }
  }, [ciphertext]);
  const carouselItems = [
    { path: Carousel1, alt: 'Login Image' },
    { path: Carousel2, alt: 'Signup Image' },
    { path: Carousel3, alt: 'Signup Image' },

  ];

  const formik = useFormik({
    initialValues: {
      email: userEmail,
      password: "",
      confirmPassword: "",
      otp: otp
    },
    onSubmit: async (data: any) => {

      const newData = {
        email: userEmail,
        password: data.password,
        otp: otp
      }

      handleVerifyEmail(newData)
    },
    validationSchema: Yup.object({
      password: Yup.string()
      .min(8, t("signup-page.passwordLength"))
      .matches(/[!@#$%^&*(),.?":{}|<>]/, t("signup-page.passwordSpecialChar"))
      .matches(/\d/, t("signup-page.passwordNumber"))
      .required(t("signup-page.passwordRequired")),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], t("signup-page.passwordsMustMatch"))
        .min(8,t("signup-page.passwordSpecialChar"))
        .required(t("signup-page.passwordRequired"))
    }),
  });

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
        minHeight: "100vh",
        p: "20px",
        boxSizing: "border-box",
        color: "#000",
      }}
    >
      <Box sx={{ height: "auto", display: { md: "block", xs: "none" } }}>
        <Carousel items={carouselItems} />
      </Box>
      <Box
        sx={{
          maxWidth: "460px",
          margin: "50px auto",
          minWidth: "280px",
          width: "100%",
          marginX: { sx: "0 35px" },
        }}
      >
        <Box textAlign={"center"}>
          <Image src={Logo} width={320} alt="Logo Image" />
          <Typography
            sx={{ color: "#30422E", fontSize: "30px", marginTop: "50px" }}
          >
            Set Password
          </Typography>
          <Typography
            sx={{ color: "#30422E", fontSize: "20px", marginTop: "10px" }}
          >
            Secure your account with a strong password.
          </Typography>
        </Box>
        <form onSubmit={formik.handleBlur} style={{ marginTop: "70px" }}>
          <Box>
            <Typography
              sx={{
                marginRight: "300px",
                marginTop: "56px",
                color: "#30422E",
                fontSize: { xs: 12, sm: 14, md: 16, lg: 16 },
              }}
            >
              {t("Verify.email")}
            </Typography>
            <TextField
              variant="outlined"
              name="email"
              value={userEmail}
              disabled
              sx={{
                marginTop: "15px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "2px",
                },
                width: "100%",
              }}
            />
          </Box>
          <Box>
            <Typography
              sx={{
                marginTop: "24px",
                color: "#30422E",
                fontSize: { xs: 12, sm: 14, md: 16, lg: 16 },
              }}
            >
              {t("signup-page.password")}
            </Typography>
            <TextField
        sx={{
          margin: "10px 0",
          "& .MuiOutlinedInput-root": {
            borderRadius: "2px",
            backgroundColor: "white",
          },
          width: "100%",
        }}
        placeholder="Enter your password"
        name="password"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.password}
        type={showPassword ? "text" : "password"}
        variant="outlined"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={togglePasswordVisibility} edge="end">
                {showPassword ? (
                  <VisibilityOffIcon />
                ) : (
                  <VisibilityIcon />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={
          formik.touched.password && formik.errors.password
            ? String(formik.errors.password)
            : ''
        }
      />
        
          </Box>
          <Box>
            <Typography
              sx={{
                marginTop: "24px",
                color: "#30422E",
                fontSize: { xs: 12, sm: 14, md: 16, lg: 16 },
              }}
            >
              Confirm Password
            </Typography>
            <TextField
              sx={{
                margin: "10px 0",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "2px",
                  backgroundColor: "white",
                },
                width: "100%",
              }}
              placeholder={"Re-Enter the password"}
              name="confirmPassword"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type={showCPassword ? "text" : "password"}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={toggleCPasswordVisibility} edge="end">
                      {showCPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? String(formik.errors.confirmPassword)
                  : ''
              }
            />
          </Box>
          <Box
            sx={{
              justifyContent: "center",
              textAlign: "center",
              marginTop: "70px",
            }}
          >
            <Button
              variant="contained"
              onClick={(event) => {

                formik.handleSubmit()
              }}
              sx={{
                borderRadius: "2px",
                padding: "10px 0",
                backgroundColor: "#30422E",
                color: "white",
                width: "310px",
                marginTop: "20px",
                "&:hover": {
                  backgroundColor: "#374b34",
                },
                textTransform: "none",
              }}
            >
              {t("Verify.letsBegin")}{" "}
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default EmailVerification;
