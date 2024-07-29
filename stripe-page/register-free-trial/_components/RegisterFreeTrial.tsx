"use client";
// External libraries and frameworks
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useGoogleLogin } from "@react-oauth/google";
import { useFormik } from "formik";
import { signIn, signOut, useSession } from "next-auth/react";

// Custom components and modules
import PaymentProcessingModal from '../../subscription/_components/Modal';

// Assets
import facebookIcon from "../../../../../public/facebookIcon.svg";
import googleLogo from "../../../../../public/googleIcon.svg";

// Utility functions or helpers
import { RegisterFormValues } from "@/utils/interface/interface";
import { RegisterFormSchema } from "../../../../schema/registerFormSchema";

// Interfaces and Redux actions
import { SignupData } from "@/interface/authInterface";
import { googleSignup, signup } from "@/store/slices/authSlice";

const RegisterFreeTrial = () => {
  const dispatch: any = useDispatch();
  const { t } = useTranslation();
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const { data: session } = useSession();
  const validationSchema = RegisterFormSchema();

  const handleSignin = async (e) => {
    e.preventDefault();
    signIn("facebook", {
      callbackUrl: `/stripe-page/sso-redirecting`,
    });
  };

  const handleSignout = (e) => {
    e.preventDefault();
    signOut();
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => handleGoogleLoginSuccess(tokenResponse),
    onError: () => handleGoogleLoginFailure(),
  });

  const handleGoogleLoginSuccess = (e) => {
    dispatch(googleSignup({ credential: e.access_token, type: "register" }))
      .unwrap()
      .then((res) => {
        toast.success(t("signup-page.signedUpSuccessfully"));
        router.push(`/getStarted/getTitle?userName=${res?.name}`);
      })
      .catch(() => {
        toast.error(t("stripeFlow.registerSection.userExist"));
      });
  };

  const handleGoogleLoginFailure = () => {
    toast.error(t("signup-page.failedSignupGoogle"));
  };

  const handleSubmit = async (data: SignupData) => {
    dispatch(signup(data))
      .unwrap()
      .then(() => {
        // toast.success(t("signup-page.verificationEmailSent"));
        setTimeout(() => {
          setOpenModal(true);
        }, 1000);
        localStorage.clear();
        setTimeout(() => {
          // const name = localStorage.getItem("username");
          // router.push(`/getStarted?userName=${name}`);
          router.push(`/`)
        }, 7000);
      })
      .catch((error) => {
        toast.error(error?.message || t("signup-page.failedSignup"));
      });
  };

  const formik = useFormik<RegisterFormValues>({
    initialValues: {
      email: "",
      name: "",
    },
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
  });

  return (

    <>
      <Box
        sx={{ border: "2px soild green", width: "100%" }}
      >
        <Typography variant="h4" sx={{ marginBottom: "60px" }}>
          {t("stripeFlow.registerSection.title")}
        </Typography>

        <Box sx={{ maxWidth: "600px", width: "100%" }}>
          <Box>
            <Typography
              sx={{
                color: "#30422E",
                fontSize: { xs: 12, sm: 14, md: 16, lg: 16 },
              }}
            >
              {t("stripeFlow.registerSection.name")}
            </Typography>
            <TextField
              variant="outlined"
              placeholder={t("stripeFlow.registerSection.namePlaceholder")}
              name="name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              sx={{
                marginBottom: "10px",
                width: "100%",
                bgcolor: "white",
              }}
            />
          </Box>
          {formik.touched.name && formik.errors.name && (
            <span style={{ color: "red" }}>{formik.errors.name}</span>
          )}

          <Box>
            <Typography
              sx={{
                color: "#30422E",
                mt: "30px",
                fontSize: { xs: 12, sm: 14, md: 16, lg: 16 },
              }}
            >
              {t("stripeFlow.registerSection.email")}
            </Typography>
            <TextField
              variant="outlined"
              placeholder={t("stripeFlow.registerSection.emailPlaceholder")}
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              sx={{
                marginBottom: "10px",
                width: "100%",
                bgcolor: "white",
              }}
            />
          </Box>
          {formik.touched.email && formik.errors.email && (
            <span style={{ color: "red" }}>{formik.errors.email}</span>
          )}

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: "30px"
            }}
          >
            <Box>
              <Divider
                sx={{
                  backgroundColor: "black",
                  width: { md: "270px", sm: "210px", xs: "130px" },
                }}
                orientation="horizontal"
              />
            </Box>
            <Box>
              <Typography sx={{ margin: "0 20px", color: "#0000006B" }}>
                {"or"}
              </Typography>
            </Box>
            <Box>
              <Divider
                sx={{
                  backgroundColor: "black",
                  width: { md: "270px", sm: "210px", xs: "130px" },
                }}
                orientation="horizontal"
              />
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              justifyContent: "center",
            }}
          >
            <Box>
              <Button
                variant="contained"
                type="submit"
                onClick={() => handleGoogleLogin()}
                sx={{
                  borderRadius: "2px",
                  backgroundColor: "#fff",
                  padding: "10px 0",
                  color: "#30422E",
                  width: "100%",
                  height: "60px",
                  gap: "30px",
                  marginTop: { xs: "20px" },
                  "&:hover": {
                    backgroundColor: "white",
                  },
                  textTransform: "capitalize",
                }}
              >
                <Image
                  src={googleLogo}
                  alt="Google Logo"
                />
                <Typography>{t("stripeFlow.registerSection.google")}</Typography>
              </Button>
            </Box>

            {/* Login With Facebook */}
            <Box>
              <Button
                variant="contained"
                sx={{
                  borderRadius: "2px",
                  backgroundColor: "#fff",
                  padding: "10px 0",
                  color: "#30422E",
                  width: "100%",
                  height: "60px",
                  gap: "30px",
                  marginTop: { xs: "20px" },
                  "&:hover": {
                    backgroundColor: "white",
                  },
                  textTransform: "capitalize",
                }}
                onClick={handleSignin}
              >
                <Image
                  src={facebookIcon}
                  alt="Facebook Logo"
                />
                <Typography>{t("stripeFlow.registerSection.facebook")}</Typography>
              </Button>
            </Box>
          </Box>

          <Button
            variant="contained"
            color="primary"
            onClick={(event) => formik.handleSubmit()}
            type="submit"
            sx={{
              width: "260px",
              marginTop: "60px",
              height: "50px",
              bgcolor: "#e1693b",
              "&:hover": {
                backgroundColor: "#b5522d",
              },
            }}
          >
            {t("stripeFlow.registerSection.btnText")}
          </Button>
        </Box>
      </Box>

      <PaymentProcessingModal
        openModal={openModal}
        selectedTab={"verify"}
        handleClose={() => setOpenModal(true)} stripeSucceed={undefined} stripeFailed={undefined} />

    </>

  );
};

export default RegisterFreeTrial;
