"use client";
// External libraries and frameworks
import { Box } from "@mui/material";
import Image from "next/image";

// Assets
import Logo from "@/_assets/svg/logo-dashboard.svg";
import BgLogo from "../../../_assets/svg/BgLogo.svg";

// Custom components and modules
import RegisterFreeTrial from "./_components/RegisterFreeTrial";


const RegisterTrialPage = () => {

  return (
    <>
      <Box
        sx={{
          bgcolor: "#f3ecda",
          color: "#3e4f3c",
          minHeight: "100vh",
          height: "100%",
          position: "relative",
        }}
      >
        <Box position={"relative"} zIndex={2}>
          <Box
            sx={{
              bgcolor: "#30422e",
              p: "26px 17px",
            }}
          >
            <Image src={Logo} alt="Logo" />
          </Box>

          <Box
            sx={{
              padding: { sm: "140px 75px 60px", xs: "70px 20px 50px" },
            }}
          >
            <RegisterFreeTrial />
          </Box>
        </Box>
        <Box
          sx={{
            position: "absolute",
            right: "0px",
            bottom: "0px",
            zIndex: 1,
            maxWidth: "600px",
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

export default RegisterTrialPage;
