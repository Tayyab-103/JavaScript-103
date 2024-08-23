import { Box, Typography } from "@mui/material";
import Image from "next/image";
import styles from "./AboutUs.module.css"

import StoryImg from "@/__webAssets/webp/about-story.webp"
import { useTranslation } from "react-i18next";
const Story = () => {
  const { t } = useTranslation();
  return (
    <Box sx={{
      display: "flex",
      justifyContent: "center",
      flexDirection: { md: "row", sm: "column-reverse", xs: "column-reverse" },
      alignItems: { md: "center", sm: "center" },
      columnGap: { lg: "120px", md: "80px" },
      margin: { lg: "0 90px 0 145px", md: "0 50px 0 100px", sm: "0 50px", xs: "0 20px 0" },
    }}>
      <Box sx={{ maxWidth: "510px" }}>
        <Typography component="div" sx={{
          display: { md: "block", sm: "none", xs: "none" },
          fontSize: { md: "52px", sm: "44px", xs: "32px" },
          fontWeight: 500,
          marginBottom: "20px",
          fontFamily: "Besley !important"
        }}>
          <h2 className={styles.pureHeadings}> {t("aboutSection.ourStory.title")}</h2>
        </Typography>
        <Typography sx={{ fontSize: "16px", marginTop: { md: "0", sm: "20px", xs: "20px" }, fontFamily: "Avenir" }}>{t("aboutSection.ourStory.description")}</Typography>
        <Typography sx={{ fontSize: "16px", margin: "15px 0", fontFamily: "Avenir" }}>{t("aboutSection.ourStory.discription1")}</Typography>
        <Typography sx={{ fontSize: "16px", fontFamily: "Avenir" }}>{t("aboutSection.ourStory.discription2")}</Typography>
      </Box>
      <Image src={StoryImg} alt="img" className={styles.storyImage} />
      <Typography sx={{ fontSize: { md: "52px", sm: "44px", xs: "32px" }, display: { md: "none", sm: "block", xs: "block" }, fontWeight: 500, marginBottom: "20px", fontFamily: "Besley !important" }}>Our Story...</Typography>
    </Box>
  )
}

export default Story;