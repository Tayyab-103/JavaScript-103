import { Box, Typography } from "@mui/material";
import styles from "./Pricing.module.css"
import PrimaryHeading from "@/__webComponents/headings/PrimaryHeading";
import Image from "next/image";

import RightStyle from "@/__webAssets/pngs/right-style2.png"
import LeftStyle from "@/__webAssets/pngs/left-style2.png"
import Yes from "@/__webAssets/svgs/tick.svg"
import No from "@/__webAssets/svgs/cross.svg"
import { useTranslation } from "react-i18next";

const PricingDetails = ({ heading, cardsDetail, marked }) => {


  return (
    <Box>
      <PrimaryHeading heading={heading} marked={marked} showStyle={true} direction="column" removeStyleMbl={true} left={LeftStyle} right={RightStyle} />
      <Box sx={{ margin: { lg: "100px 0", md: "100px 20px", sm: "100px 0", xs: "70px 0 0" }, display: "flex", justifyContent: "center", flexDirection: { md: "row", sm: "column", xs: "column" }, alignItems: "center", columnGap: "16px" }}>
        {cardsDetail.map((item, index) => <DetailCard
          key={index}
          header={item.header}
          bgColor={item.bgColor}
          sCase={item.sCase}
          logo={item.logo}
          title={item.title}
          alt={item.alt}
          points={item.data}
        />)}
      </Box>
    </Box >
  )
}

export default PricingDetails;

function DetailCard({ header, logo = false, alt, title, points, bgColor, sCase }) {
  const { t } = useTranslation();

  return (
    <Box sx={{
      maxWidth: { lg: "405px", md: "320px", sm: "405px", xs: "325px" },
      marginBottom: { md: "0", sm: "50px", xs: "50px" },
      width: "100%",
      bgcolor: "#F4F4F4",
      borderRadius: "8px"
    }}>
      <Box sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "75px",
        textAlign: "center",
        fontSize: "20px",
        color: "#fff",
        fontFamily: "Avenir8",
        borderRadius: "8px 8px 0 0"
      }}
        bgcolor={bgColor}>
        {header}
        {logo && <Image src={logo} alt={alt} title={title} width={170} />}
      </Box>
      <Box
        sx={{ padding: { sm: "10px 20px", xs: "10px 10px 10px 20px" } }}
        className={styles.cardBorder}
      >
        {points.map((item, index) => <Box
          key={index}
          sx={{
            padding: "0px 0 0px 5px",
            height: "58px",
            display: "flex",
            flexDirection: "column",
            alignItems: logo ? "center" : "start",
            fontSize: { lg: "16px", md: "14px", sm: "16px", xs: "16px" },
            fontWeight: 800,
            fontFamily: logo ? "Avenir8 !important" : "Avenir5 !important",
            justifyContent: "center",

          }}
        >
          {item === "Yes" ? (
            <Image src={Yes} alt="tick" />
          ) : item === "No" ? (
            <Image src={No} alt="cross" />
          ) : (
            <span>{item}</span>
          )}
          {index === 1 && sCase && <Typography sx={{ fontSize: "14px", m: "5px 0 0 5px", lineHeight: "15px", display: "block" }}>
            {t("pricingSection.bookDetails.additionalDetails2.data.priceFor139Coment")}
          </Typography>}
        </Box>
        )}


      </Box>

    </Box>
  )
}