import { Box, Typography } from "@mui/material";
import Image from "next/image";
import styles from '../ComponentsStyles.module.css'
import Button from "../button/Button";

import Check from "@/__webAssets/svgs/check.svg"
import Lock from "@/__webAssets/svgs/lock.svg"
import NextIcon from '@/__webAssets/svgs/next.svg'
import Link from "next/link";
import { useTranslation } from "react-i18next";
const PricingCard = ({ price, category, card, id }) => {
  const { t } = useTranslation();
  const CheckArray = [
    {
      standardStatus: true,
      PrimuimStatus: true,
      basicStatus: true,
      dis: t("landingPage.pricingSection.pricingCardMapArray.dis1")
    },
    {
      standardStatus: true,
      PrimuimStatus: true,
      basicStatus: true,
      dis:  t("landingPage.pricingSection.pricingCardMapArray.dis2")
    },

    {
      standardStatus: true,
      PrimuimStatus: true,
      basicStatus: true,
      dis:  t("landingPage.pricingSection.pricingCardMapArray.dis3")
    },
    {
      standardStatus: true,
      PrimuimStatus: true,
      basicStatus: false,
      dis:  t("landingPage.pricingSection.pricingCardMapArray.dis4")
    },
    {
      standardStatus: true,
      PrimuimStatus: true,
      basicStatus: false,
      dis:  t("landingPage.pricingSection.pricingCardMapArray.dis5")
    },
    {
      standardStatus: true,
      PrimuimStatus: true,
      basicStatus: false,
      dis:  t("landingPage.pricingSection.pricingCardMapArray.dis6")
    },
    {
      standardStatus: false,
      PrimuimStatus: true,
      basicStatus: false,
      dis:  t("landingPage.pricingSection.pricingCardMapArray.dis7")
    },
    {
      standardStatus: false,
      PrimuimStatus: true,
      basicStatus: false,
      dis:  t("landingPage.pricingSection.pricingCardMapArray.dis8")
    },
    {
      standardStatus: false,
      PrimuimStatus: true,
      basicStatus: false,
      dis:  t("landingPage.pricingSection.pricingCardMapArray.dis9")
    },

  ]

  return (
    <Box sx={{
      borderRadius: "8px",
      width: { sm: "405px", xs: "340px" },
      height: { lg: "700px" },
      position: "relative"
    }}
      backgroundColor={card == "2" ? "#30422E" : "#F4F4F4"}
      color={card == "2" && "#f4f4f4"}
      id={id}
    >
      <Box sx={{ padding: { lg: "39px 30px 85px 45px", md: "35px 20px 85px", sm: "39px 45px 85px", xs: "35px 25px 80px" } }}>
        <Box sx={{
          borderRadius: "4px", backgroundColor: "#E7E7E7", padding: "4px 8px", display: "inline", color: "#3E4F3C", fontFamily: "Avenir5"
        }}
        >
          {category}
        </Box>
        {category == t("landingPage.pricingSection.category2") && <Box sx={{
          borderRadius: "4px",
          backgroundColor: "#E1683B",
          padding: "4px 8px",
          color: "#F4F4F4",
          marginLeft: "6px",
          display: "inline",
          fontFamily: "Avenir5"
        }}>
          {t("landingPage.pricingSection.popular")}
        </Box>}
        <Box sx={{
          fontSize: "60px",
          fontWeight: "800",
          borderBottom: "1px solid #BFC4B5",
          padding: "10px 0",
          marginBottom: "34px",
          fontFamily: "Avenir8"
        }}
          className={styles.price}
        >
          {price}
        </Box>

        {category == t("landingPage.pricingSection.category1") && <Box>
          {
            CheckArray.map((item, index) => <Box
              sx={{
                display: "flex",
                columnGap: "25px",
                alignItems: "center",
                marginBottom: "24px",
              }}
              key={index}>
              <Image src={item.basicStatus ? Check : Lock} alt="check"  loading="lazy"/>
              <Typography sx={{ fontSize: "15px", fontFamily: "Avenir" }}>{item.dis}</Typography>
            </Box>
            )}
        </Box>
          ||
          category == t("landingPage.pricingSection.category2") && <Box>
            {
              CheckArray.map((item, index) => <Box
                sx={{
                  display: "flex",
                  columnGap: "25px",
                  alignItems: "center",
                  marginBottom: "24px"
                }}
                key={index}>
                <Image src={item.standardStatus ? Check : Lock} alt="check" loading='lazy'/>
                <Typography sx={{ fontSize: "15px", fontFamily: "Avenir" }}>{item.dis}</Typography>
              </Box>
              )}
          </Box>
          ||
          category == t("landingPage.pricingSection.category3") && <Box>
            {
              CheckArray.map((item, index) => <Box
                sx={{
                  display: "flex",
                  columnGap: "25px",
                  alignItems: "center",
                  marginBottom: "24px"
                }}
                key={index}>
                <Image src={item.PrimuimStatus ? Check : Lock} alt="check" loading='lazy'/>
                <Typography sx={{ fontSize: "15px", fontFamily: "Avenir" }}>{item.dis}</Typography>
              </Box>
              )}
          </Box>
        }
      </Box>
      <Box sx={{ position: "absolute", bottom: "0", left: "0", right: "0" }}>
        <Link href="/stripe-page">
          <Button
            title={t("landingPage.pricingSection.btnText")}
            width='100%'
            height='75px'
            font="24px"
            borderRadius="0px 0px 8px 8px"
            img2={NextIcon}
          />
        </Link>
      </Box>
    </Box >
  )
}

export default PricingCard;