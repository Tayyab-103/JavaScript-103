"use client";
// External libraries and frameworks
import { Box, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import Image from "next/image";
import Link from 'next/link';
import { useRouter } from "next/router";
import { useState } from "react";
import { useTranslation } from "react-i18next";

// UI components from custom components
import Button from "@/__webComponents/button/Button";

// Assets
import BgLogo from "@/_assets/svg/BgLogo.svg";
import Logo from "@/_assets/svg/logo-dashboard.svg";

// Next.js specific component
import Head from "next/head";

const StripePage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [userType, setUserType] = useState("myself");
  const [paymentType, setPaymentType] = useState("buynow");
  const [showSecondForm, setShowSecondForm] = useState(false);

  const handleContinue = () => {
    if (userType === "gift-of-someone-else") {
      router.push("/stripe-page/gift-subscription");
    } else {
      setShowSecondForm(true);
    }
  };
  const handleContinueNext = () => {
    if (paymentType === "free-trial") {
      router.push("/stripe-page/register-free-trial");
    } else {
      localStorage.setItem("paymentType", paymentType);
      router.push("/stripe-page/subscription");
    }
  };

  return (
    <>
      <Head>
        <title>Stripe Pages Flow</title>
        <meta name="description" content="stripe Pages flow" />
      </Head>

      <Box
        sx={{
          bgcolor: "#f3ecda",
          color: "#3e4f3c",
          height: "100vh",
          position: "relative",
        }}
      >
        <Box position={"relative"} zIndex={2}>
          <Box
            sx={{
              bgcolor: "#30422e",
              display: "flex",
              alignItems: "center",
              color: "white",
              padding: "26px 0 26px 17px",
            }}
          >
            <Link href={"./"}>
              <Image src={Logo} alt="Logo" />
            </Link>
          </Box>

          <Box
            sx={{
              margin: {
                md: "100px 0 0 100px",
                sm: "100px 0 0 20px",
                xs: "60px 20px 0 ",
              },
              maxWidth: "600px",
            }}
          >
            <FormControl sx={{ display: showSecondForm ? "none" : "block" }}>
              <Typography sx={{ color: "#30422E", fontSize: "30px" }}>
                {t("stripeFlow.stripePage.title")}
              </Typography>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
              >
                <Box
                  sx={{
                    backgroundColor: "white",
                    margin: { sm: "70px 0 30px", xs: "50px 0 15px" },
                    height: "68px",
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid black",
                    borderRadius: "4px",
                  }}
                >
                  <FormControlLabel
                    value={t("stripeFlow.stripePage.title")}
                    control={
                      <Radio
                        sx={{
                          "&.Mui-checked .MuiSvgIcon-root": {
                            fill: "#30422E",
                          },
                        }}
                      />
                    }
                    label={t("stripeFlow.stripePage.mySelf")}
                    sx={{
                      marginLeft: "10px",
                      width: "100%",
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    backgroundColor: "white",
                    height: "68px",
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid black",
                    borderRadius: "4px",
                  }}
                >
                  <FormControlLabel
                    value="gift-of-someone-else"
                    control={
                      <Radio
                        sx={{
                          "&.Mui-checked .MuiSvgIcon-root": {
                            fill: "#30422E",
                          },
                        }}
                      />
                    }
                    label={t("stripeFlow.stripePage.giftForSomeoneElse")}
                    sx={{ marginLeft: "10px", width: "100%" }}
                  />
                </Box>
              </RadioGroup>
              {userType && (
                <Box
                  sx={{
                    marginTop: { sm: "40px", xs: "20px" },
                    width: { sm: "300px", xs: "100%" },
                  }}
                >
                  <Button
                    width="100%"
                    height="50px"
                    backgroundColor="#E1693B"
                    title={t("stripeFlow.stripePage.btnText")}
                    bgHover="#B5522D"
                    onClick={handleContinue}
                    img1={undefined}
                    img2={undefined}
                    borderRadius={undefined}
                  />
                </Box>
              )}
            </FormControl>

            {showSecondForm && (
              <FormControl sx={{ display: "block" }}>
                <Typography sx={{ color: "#30422E", fontSize: "30px" }}>
                  {t("stripeFlow.stripePage.preference")}
                </Typography>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  value={paymentType}
                  onChange={(e) => setPaymentType(e.target.value)}
                >
                  <Box
                    sx={{
                      backgroundColor: "white",
                      margin: { sm: "70px 0 30px", xs: "50px 0 15px" },
                      height: "68px",
                      display: "flex",
                      alignItems: "center",
                      border: "1px solid black",
                      borderRadius: "4px",
                    }}
                  >
                    <FormControlLabel
                      value="buynow"
                      control={
                        <Radio
                          sx={{
                            "&.Mui-checked .MuiSvgIcon-root": {
                              fill: "#30422E",
                            },
                          }}
                        />
                      }
                      label={t("stripeFlow.stripePage.buyNow")}
                      sx={{ marginLeft: "10px", width: "100%" }}
                    />
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: "white",
                      height: "68px",
                      display: "flex",
                      alignItems: "center",
                      border: "1px solid black",
                      borderRadius: "4px",
                    }}
                  >
                    <FormControlLabel
                      value="free-trial"
                      control={
                        <Radio
                          sx={{
                            "&.Mui-checked .MuiSvgIcon-root": {
                              fill: "#30422E",
                            },
                          }}
                        />
                      }
                      label={t("stripeFlow.stripePage.freeTrial")}
                      sx={{ marginLeft: "10px", width: "100%" }}
                    />
                  </Box>
                </RadioGroup>

                <Box
                  sx={{
                    marginTop: { sm: "40px", xs: "20px" },
                    width: { sm: "300px", xs: "100%" },
                  }}
                >
                  <Button
                    width="100%"
                    height="50px"
                    backgroundColor="#E1693B"
                    title={t("stripeFlow.stripePage.btnText")}
                    bgHover="#B5522D"
                    onClick={handleContinueNext}
                    img1={undefined}
                    img2={undefined}
                    borderRadius={undefined}
                  />
                </Box>
              </FormControl>
            )}
          </Box>
        </Box>
        <Box
          sx={{
            position: "absolute",
            right: "0px",
            bottom: "0px",
            zIndex: 1,
            maxWidth: "740px",
            width: "100%",
          }}
        >
          <Image
            src={BgLogo}
            alt="Giving Tree Logo"
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default StripePage;
