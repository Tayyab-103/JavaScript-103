import { LoginData } from "@/interface/authInterface";
import { googleLogin, login } from "@/store/slices/authSlice";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Box, Divider, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { useGoogleLogin } from "@react-oauth/google";
import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";
import googleLogo from "../../../public/googleIcon.svg";
import facebookIcon from "../../../public/facebookIcon.svg";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPasswordClicked, setIsForgotPasswordClicked] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch: any = useDispatch();
  const router = useRouter();
  const [loginFailed, setLoginFailed] = useState(false);
  const { t } = useTranslation();

  const handleSignin = async (e) => {
    e.preventDefault();
    signIn("facebook", {
      callbackUrl: "/_auth/fb-redirecting",
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleRememberMeChange = (event: any) => {
    setRememberMe(event.target.checked);
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => handleGoogleLoginSuccess(tokenResponse),
    onError: () => handleGoogleLoginFailure(),
  });

  const handleGoogleLoginSuccess = (e: any) => {
    dispatch(googleLogin({ credential: e.access_token, type: "login" }))
      .unwrap()
      .then((res) => {
        toast.success(t("login-page.loggedIn"));
        router.push(`/getStarted?userName=${res?.name}`);
      })
      .catch((error: any) => {
        toast.error(error.message);
      });
  };

  const handleGoogleLoginFailure = () => {
    toast.error(t("login-page.failedSignupGoogle"));
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (data: LoginData) => {
      setLoginFailed(false);
      setLoading(true);
      dispatch(login(data))
        .unwrap()
        .then((res) => {
          toast.success(t("login-page.loggedIn"));
          // setLoading(false);
          router.push(`/getStarted?userName=${res?.name}`); //here it leades to get started
          // router.push(`/dashboard/Questionnaire?userName=${res?.name}`); //here it leades to get started
        })
        .catch((error: any) => {
          setLoginFailed(true);
          setLoading(false);
        });
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required(t("login-page.emailRequired")),
      password: Yup.string()
        .min(8, t("login-page.passwordLength"))
        .required(t("login-page.passwordRequired")),
    }),
  });

  return (
    <Box sx={{ display: "flex", justifyContent: "center", color: "#000" }}>
      <Box
        sx={{
          maxWidth: "460px",
          margin: "0 auto",
          minWidth: "280px",
          width: "100%",
          marginX: { sx: "0 35px" },
        }}
      >
        <Box sx={{ textAlign: "center", m: "50px 0 30px", color: "#30422E" }}>
          <Typography sx={{ fontSize: "38px", fontWeight: 700 }}>
            {t("login-page.loginToYourAccount")}
          </Typography>
          <Typography>{t("login-page.continueToYourTrip")}</Typography>
        </Box>
        <Box>
          <Box>
            <Typography
              sx={{
                // marginRight: "300px",
                color: "#30422E",
                fontSize: { xs: 12, sm: 14, md: 16, lg: 16 },
              }}
            >
              {t("login-page.email")}
            </Typography>
            <TextField
              variant="outlined"
              placeholder={t("login-page.enter-email")}
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              sx={{
                m: "10px 0",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "2px",
                  backgroundColor: "white",
                },
                width: "100%",
                // width: "460px",
              }}
            />
          </Box>
          {formik.touched.email && formik.errors.email && (
            <span style={{ color: "red" }}>{formik.errors.email}</span>
          )}
        </Box>
        <Box>
          <Box>
            <Typography
              sx={{
                marginTop: "24px",
                color: "#30422E",
                fontSize: { xs: 12, sm: 14, md: 16, lg: 16 },
              }}
            >
              {t("login-page.password")}
            </Typography>
            <TextField
              sx={{
                m: "10px 0",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "2px", // Adjust the border radius as needed
                  backgroundColor: "white",
                  border: "1px solid #30422E",
                },
                width: "100%",
              }}
              placeholder={t("login-page.enter-password")}
              type={showPassword ? "text" : "password"}
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
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
            />
          </Box>
          {formik.touched.password && formik.errors.password && (
            <span
              style={{
                color: "red",
              }}
            >
              {formik.errors.password}
            </span>
          )}
          {loginFailed && (
            <Box sx={{ marginTop: "10px" }}>
              <Typography sx={{ color: "red" }}>
                {t("login-page.IncorrectEmail")}
              </Typography>
            </Box>
          )}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "10px",
            }}
          >
            <Box
              sx={{ cursor: "pointer" }}
              onClick={(event: any) => router.push("/verify/forgetPassword")}
            >
              <Typography
                sx={{
                  color: "#30422E",
                  fontSize: { xs: 12, sm: 14, md: 16 },
                }}
              >
                {t("login-page.forget-password")}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ justifyContent: "start", textAlign: "center" }}>
          <Button
            variant="contained"
            onClick={(event) => formik.handleSubmit()}
            type="submit"
            sx={{
              borderRadius: "2px",
              backgroundColor: "#30422E",
              padding: "10px 0",
              color: "white",
              width: { md: "60%", sm: "70%", xs: "70%" },
              marginTop: { xs: "60px", sm: "30px" },
              "&:hover": {
                backgroundColor: "#374b34",
              },
              textTransform: "capitalize",
            }}
          >
            {t("login-page.login")}
          </Button>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <Box>
              <Divider
                sx={{
                  marginTop: "10px",

                  backgroundColor: "black",
                  width: "115px",
                }}
                orientation="horizontal"
              />
            </Box>
            <Box>
              <Typography sx={{ marginLeft: "10px", color: "#0000006B" }}>
                {t("login-page.login-with")}
              </Typography>
            </Box>
            <Box>
              <Divider
                sx={{
                  marginTop: "10px",
                  marginLeft: "10px",
                  backgroundColor: "black",
                  width: "115px",
                }}
                orientation="horizontal"
              />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "center",
          }}
        >
          <Box sx={{ width: { md: "60%", sm: "70%", xs: "70%" } }}>
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
                gap: "10px",
                marginTop: { xs: "20px" },
                "&:hover": {
                  backgroundColor: "white",
                },
                textTransform: "capitalize",
              }}
            >
              <Image src={googleLogo} alt="Google Logo" />
              <Typography> {t("login-page.loginWithGoogle")}</Typography>
            </Button>
            <Button
              variant="contained"
              // type="submit"
              sx={{
                borderRadius: "2px",
                backgroundColor: "#fff",
                padding: "10px 0",
                color: "#30422E",
                width: "100%",
                gap: "15px",
                m: "20px 0 10px",
                "&:hover": {
                  backgroundColor: "white",
                },
                textTransform: "capitalize",
              }}
              onClick={handleSignin}
            >
              <Image src={facebookIcon} alt="Facebook Logo" />
              <Typography>{t("login-page.loginWithFaceBook")}</Typography>
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            mt: "20px",
            fontSize: "16px",
            textAlign: "center",
            color: "#30422E",
          }}
        >
          {t("login-page.not-member")}
          <a
            style={{
              textDecoration: "underline",
              cursor: "pointer",
              marginLeft: "8px",
            }}
            onClick={() => {
              router.push("/stripe-page");
            }}
          >
            {t("login-page.register-now")}
          </a>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
