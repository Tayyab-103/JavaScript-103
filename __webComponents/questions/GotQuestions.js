'use client'

import {  useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

import Question from "./Question.js"
import styles from "../ComponentsStyles.module.css"
import Link from "next/link.js";
import { useTranslation } from "react-i18next";
const GotQuestions = () => {
  const { t } = useTranslation();


  const [DumyQs1, setDummyQ] = useState([]);

  useEffect(()=>{
    setDummyQ([
      {
        qs: t("landingPage.questionSection.question1.qs"),
        ans: t("landingPage.questionSection.question1.ans"),
        panel: "panel1",
        isexpanded: false,
      },
      {
        qs: t("landingPage.questionSection.question2.qs"),
        ans: t("landingPage.questionSection.question2.ans"),
        panel: "panel2",
        isexpanded: false,
      },
      {
        qs: t("landingPage.questionSection.question3.qs"),
        ans: t("landingPage.questionSection.question3.ans"),
        panel: "panel3",
        isexpanded: false,
  
      },
      {
        qs: t("landingPage.questionSection.question4.qs"),
        ans: t("landingPage.questionSection.question4.ans"),
        panel: "panel4",
        isexpanded: false,
      },
      {
        qs: t("landingPage.questionSection.question5.qs"),
        ans: t("landingPage.questionSection.question5.ans"),
        panel: "panel5",
        isexpanded: false,
      },
      {
        qs: t("landingPage.questionSection.question6.qs"),
        ans: t("landingPage.questionSection.question6.ans"),
        panel: "panel6",
        isexpanded: false,
      },
      {
        qs: t("landingPage.questionSection.question7.qs"),
        ans: t("landingPage.questionSection.question7.ans"),
        panel: "panel7",
        isexpanded: false,
      },
      {
        qs: t("landingPage.questionSection.question8.qs"),
        ans: t("landingPage.questionSection.question8.ans"),
        panel: "panel8",
        isexpanded: false,
      },
    ])
  },[t])

  const handleExpands = (panel) => {
    setDummyQ(prev => {
      return prev.map(x => {
        if (x.panel === panel) {
          return { ...x, isexpanded: !x.isexpanded }
        } else {
          return { ...x, isexpanded: false }
        }
      })
    })
  }

  return (
    <Box
      sx={{ padding: { lg: "150px 160px  120px 110px", md: "150px 50px 150px", sm: "150px 100px 150px", xs: "120px 20px 80px" } }}
      className={styles.gotQsBg}
    >
      <Typography sx={{ fontSize: { md: "52px", sm: "44px", xs: "32px" }, fontWeight: 500, fontFamily: "Besley !important" }}>{t("landingPage.questionSection.title")}</Typography>
      <Typography sx={{ fontSize: { sm: "20px", xs: "16px" }, marginTop: "10px", fontFamily: "Avenir" }}>{t("landingPage.questionSection.subTitle")}</Typography>
      <Box sx={{
        marginTop: { sm: "85px", xs: "45px" }, display: "flex", flexDirection: { md: "row", sm: "column", xs: "column" },
        columnGap: { lg: "10%", md: "5%" }
      }}>
        <Box sx={{ width: "100%" }}>
          {DumyQs1.slice(0, 4).map((item, index) => <Question
            key={index}
            qs={item.qs}
            ans={item.ans}
            panelNo={item.panel}
            expanded={item.isexpanded}
            handleExpands={handleExpands}
          />)}
        </Box>

        <Box sx={{ width: "100%" }}>
          {DumyQs1.slice(4, 8).map((item, index) => <Question
            key={index}
            qs={item.qs}
            ans={item.ans}
            panelNo={item.panel}
            expanded={item.isexpanded}
            handleExpands={handleExpands}
          />)}
        </Box>
      </Box>

      <Box sx={{ textAlign: "center" }}>
        <Link href="/faqs">
          <Typography sx={{
            textAlign: "center", fontSize: "18px", marginTop: "80px", display: "inline-block",
            border: "1px solid #3E4F3C", padding: "10px 25px 7px", fontFamily: "Avenir", borderRadius: "4px"
          }}
            className={styles.seeMorebtn}
          >{t("landingPage.questionSection.btnText")}</Typography>
        </Link>
      </Box>
    </Box>
  )
}
export default GotQuestions