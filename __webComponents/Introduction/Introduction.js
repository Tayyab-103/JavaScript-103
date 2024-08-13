'use client'

import NavBar from "@/__webComponents/navBar/NavBar";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import styles from "../ComponentsStyles.module.css"
import Logo from "@/__webAssets/svgs/lifescript-life-story-book-logo.svg"
import Line from "@/__webAssets/svgs/line-orange.svg"

const FeaturesIntroduction = ({ heading, keyWorld, subHeading = false, width = "100%" }) => {

  return (
    <Box sx={{ height: { lg: "700px", sm: "100vh", xs: "100vh" }, position: "relative" }}
      className={styles.features}
    >
      <NavBar color="#F3ECDA" logo={Logo} />
      <Box sx={{
        textAlign: 'center', position: "absolute", top: "50%", left: "50%",
        maxWidth: { xs: "340px", sm: "1200px" },
        transform: "translate(-50%,-50%)"
      }}
        width={width}
      >
        <Typography sx={{
          fontSize: { md: "55px", sm: "44px", xs: "32px" },
          padding: "0 20px",
          fontWeight: 500,
          margin: { md: " 0 auto 30px", sx: "20px", xs: "0px" },
          color: "#F3ECDA",
          fontFamily: "Besley !important",
        }}
          variant="h1"
        >
          {heading}{" "}
          <span className={styles.lineBox}>
            {keyWorld}
            <Image src={Line} alt="img" className={styles.line} />
          </span>
        </Typography>
      </Box>
    </Box >
  )
}

export default FeaturesIntroduction;