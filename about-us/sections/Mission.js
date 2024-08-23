'use client'

import PrimaryHeading from "@/__webComponents/headings/PrimaryHeading";
import { Box, Typography } from "@mui/material";
import styles from "./AboutUs.module.css"
import LeftStyle from "@/__webAssets/pngs/left-style2.png"
import RightStyle from "@/__webAssets/pngs/right-style2.png"
import { useTranslation } from "react-i18next";
const Mission = () => {
  const { t } = useTranslation();
  return (
    <Box sx={{ margin: { md: "50px 150px 80px", sm: "50px 0px 100px", xs: "40px 20px 50px" }, }}>
      <PrimaryHeading heading={t("aboutSection.ourMission.title")} marked={t("aboutSection.ourMission.subtitle")} showStyle={true} left={LeftStyle} right={RightStyle} />
      <Typography component="div" sx={{
        fontSize: "16px", textAlign: "center",
        margin: { md: "65px 30px 0", sm: "40px 30px 0", xs: "30px 0 0" },
        paddingBottom: "40px",
        borderBottom: "1px solid #E1683B",
        fontFamily: "Avenir"
      }}>
        <h3 className={styles.pureHeadings}>{t("aboutSection.ourMission.description")}</h3>
      </Typography>
    </Box>
  )
}

export default Mission;