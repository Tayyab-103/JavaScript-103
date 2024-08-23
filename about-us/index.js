'use client'

import { Box } from "@mui/material";
import Footer from "@/__webComponents/footer/Footer";
import ContactFooter from "@/__webComponents/footer/ContactFooter";
import FeaturesIntroduction from "@/__webComponents/Introduction/Introduction";
import Mission from "./sections/Mission";
import Story from "./sections/Stories";
import Values from "./sections/Values";
import Head from 'next/head';
import { NextSeo } from "next-seo";
import { useTranslation } from "react-i18next";
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";

const AboutUs = () => {
  const { t } = useTranslation();
  const footerRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (router.asPath.includes('#ContactUs')) {
      footerRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [router.asPath]);

  return (
    <>
      <Head>
        <title>About us</title>
        <meta
          name="description"
          content="We believe that every life is special and deserves to be remembered. That is why we have created an easy-to-use, affordable platform to help people preserve their memories."
        />
        <meta
          property="og:title"
          content="About us"
        />
        <meta
          property="og:description"
          content="We believe that every life is special and deserves to be remembered. That is why we have created an easy-to-use, affordable platform to help people preserve their memories."
        />
        <meta
          property="og:url"
          content="https://www.thelifescript.com/about-us"
        />
        <NextSeo
          title="About us"
          description="We believe that every life is special and deserves to be remembered. That is why we have created an easy-to-use, affordable platform to help people preserve their memories."
          canonical="https://www.thelifescript.com/about-us"
        />
      </Head>
      <Box sx={{ bgcolor: "#f3ecda", color: "#3e4f3c" }}>
        <FeaturesIntroduction heading={t("aboutSection.title")} width="75%" keyWorld={t("aboutSection.subTitle")} />
        <Mission />
        <Story />
        <Values />
        <ContactFooter
          title={t("aboutSection.stillConfusedSection.title")}
          marked={t("aboutSection.stillConfusedSection.title2")}
          lineWidth={150}
          subTitle={t("aboutSection.stillConfusedSection.subTitle")}
          input1={t("aboutSection.stillConfusedSection.input1")}
          input2={t("aboutSection.stillConfusedSection.input2")}
          input3={t("aboutSection.stillConfusedSection.input3")}
          button={t("aboutSection.stillConfusedSection.btnText")}
        />
        <Footer ref={footerRef} />
      </Box>
    </>
  );
};

export default AboutUs;
