import { Box, Typography } from "@mui/material";
import PrimaryHeading from "../headings/PrimaryHeading";
import FlowerLine from "@/__webAssets/pngs/full-style.png"
import Image from "next/image";
import styles from "../ComponentsStyles.module.css"
import CustomizedAccordions from "./Accordion";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const Experience = () => {
  const { t } = useTranslation();
  return (
    <Box sx={{ margin: { lg: '150px 0  100px', md: "170px 0 130px" }, display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Box sx={{ textAlign: "center", width: "100%" }}>
        <PrimaryHeading lineWidth="180px" lineHeight="60px" mdDirection="column" showStyle={false} 
        // heading="Get a Feel for LifeScript’s" marked="Features" />
        heading={t("landingPage.featureSection.title")}marked={t("landingPage.featureSection.subTitle")} />
        <Image src={FlowerLine} alt="logo" className={styles.fullStyle} loading="lazy" />
      </Box>

      <Box sx={{
        margin: { lg: "120px 60px 120px 130px", md: "100px 40px 70px 70px" }, display: "flex", justifyContent: "center",
        columnGap: { lg: "140px", md: "70px" }, alignItems: "center"
      }}>
        <CustomizedAccordions />
      </Box>
      <Link href='/features'>
        <Typography sx={{
          fontSize: "18px", border: "1px solid #30422E", borderRadius: "4px", padding: "10px 25px 7px", fontFamily: "Avenir"
        }}
          className={styles.seeMorebtn}
        >{t("landingPage.featureSection.btnText")} 
        </Typography>
      </Link>
    </Box >
  )
}

export default Experience;
