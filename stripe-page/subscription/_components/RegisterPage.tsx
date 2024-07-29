"use client";
// External libraries and frameworks
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import { signIn, signOut, useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

// Custom components and modules
import BasicPlanCard from "./BasicPlanCard";

// Assets
import facebookIcon from "../../../../../public/facebookIcon.svg";
import googleLogo from "../../../../../public/googleIcon.svg";

// Utility functions or schemas
import { SignupData } from "@/interface/authInterface";
import { signupWithBuy } from "@/store/slices/authSlice";
import { RegisterFormValues } from "@/utils/interface/interface";
import { RegisterFormSchema } from "../../../../schema/registerFormSchema";


const RegisterPage = ({ onClick, selectedTab, handleGoogleLogin }) => {
  const dispatch: any = useDispatch();
  const router = useRouter();
  const { price, category } = router.query;
  const { t } = useTranslation();
  const { data: session } = useSession();
  const validationSchema = RegisterFormSchema();

  const handleSignin = async (e) => {
    e.preventDefault();
    signIn("facebook", {
      callbackUrl: "/stripe-page/subscription",
    });
  };

  const handleSignout = (e) => {
    e.preventDefault();
    signOut();
  };

  const handleSubmit = async (data: SignupData) => {
    dispatch(signupWithBuy(data))
      .unwrap()
      .then(() => {
        onClick(selectedTab + 1)
      })
      .catch((error: any) => {
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
    <Box sx={{ display: "flex", justifyContent: "center", }}>
      <Box
        sx={{ margin: { sm: "0 0 0 70px", xs: "0 20px" }, border: "2px soild green", width: "100%", maxWidth: "1370px" }}
      >
        <Typography variant="h4" sx={{ marginBottom: { sm: "60px", xs: "30px" } }}>
        {t("stripeFlow.registerSection.title")}
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", columnGap: "50px" }}>

          <Box sx={{ maxWidth: { sm: "530px", xs: "100%" }, width: "100%" }}>
            <Box>
              <Typography
                sx={{
                  color: "#30422E", mt: "30px",
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
                  color: "#30422E", mt: "30px",
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
                alignItems: "center"
              }}
            >
              <Box>
                <Divider
                  sx={{
                    backgroundColor: "black",
                    width: { lg: "235px", md: "160px", sm: "235px", xs: "130px" },
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
                    width: { lg: "235px", md: "160px", sm: "235px", xs: "130px" },
                  }}
                  orientation="horizontal"
                />
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
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
                    padding: "20px 0",
                    color: "#30422E",
                    width: "100%",
                    gap: "30px",
                    margin: "30px 0",
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

              <Box>
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: "2px",
                    backgroundColor: "#fff",
                    padding: "20px 0",
                    color: "#30422E",
                    width: "100%",
                    gap: "30px",
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
              sx={{
                width: "260px",
                height: "50px",
                marginTop: "60px",
                bgcolor: "#e1693b",
                "&:hover": {
                  backgroundColor: "#b5522d",
                },
              }}
              onClick={(event) => formik.handleSubmit()}
            >
             {t("stripeFlow.stripePage.btnText")}
            </Button>
          </Box>

          <Box sx={{ margin: "0 35px 35px 0", display: { md: "block", sm: "none", xs: "none" } }}>
            <BasicPlanCard price={price} category={category} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default RegisterPage;
