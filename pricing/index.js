"use client";

import Head from "next/head";
import { Box } from "@mui/material";
import Footer from "@/__webComponents/footer/Footer";
import ContactFooter from "@/__webComponents/footer/ContactFooter";
import NavBar from "@/__webComponents/navBar/NavBar";
import GotQuestions from "@/__webComponents/questions/GotQuestions";
import styles from "./sections/Pricing.module.css";

import LifeScriptLogo from "@/__webAssets/svgs/lifescript-life-story-book-logo.svg";
import Pricing from "@/__webComponents/pricing/Pricing";
import Working from "@/__webComponents/working/Working";
import Check from "@/__webAssets/svgs/check-square.svg";
import PricingDetails from "./sections/PricingDetails";
import StoryWorthy from "@/__webAssets/pngs/storyworth-alternative-logo.png";
import { useTranslation } from "react-i18next";

const PricingPage = () => {
  const { t } = useTranslation();
  const pointsArray = [
    {
      icon: Check,
      title: t("pricingSection.pointsArray1.title"),
      discription: t("pricingSection.pointsArray1.description"),
    },
    {
      icon: Check,
      title: t("pricingSection.pointsArray2.title"),
      discription: t("pricingSection.pointsArray2.description"),
    },
    {
      icon: Check,
      title: t("pricingSection.pointsArray3.title"),
      discription: t("pricingSection.pointsArray3.description"),
    },
  ];

  const pricingDetails = [
    {
      header: t("pricingSection.bookDetails.pricingDetailObject1.header"),
      bgColor: "#E1683B",
      data: [
        t("pricingSection.bookDetails.pricingDetailObject1.data.freeTrial"),
        t(
          "pricingSection.bookDetails.pricingDetailObject1.data.lifetimeAccess"
        ),
        t(
          "pricingSection.bookDetails.pricingDetailObject1.data.noAdditionalCost"
        ),
        t(
          "pricingSection.bookDetails.pricingDetailObject1.data.priceForAdditional"
        ),
        t("pricingSection.bookDetails.pricingDetailObject1.data.freeShipping"),
        t(
          "pricingSection.bookDetails.pricingDetailObject1.data.languageSupported"
        ),
        t("pricingSection.bookDetails.pricingDetailObject1.data.bookPageLimit"),
        t(
          "pricingSection.bookDetails.pricingDetailObject1.data.unlimitedPhotoUploads"
        ),
        t(
          "pricingSection.bookDetails.pricingDetailObject1.data.videoTutorials"
        ),
      ],
    },
    {
      logo: LifeScriptLogo,
      alt: t("pricingSection.additionalDetails.alt"),
      title: t("pricingSection.additionalDetails.title"),
      bgColor: "#30422E",
      data: [
        t("pricingSection.bookDetails.additionalDetails.data.yes"),
        t("pricingSection.bookDetails.additionalDetails.data.yesFor139"),
        t("pricingSection.bookDetails.additionalDetails.data.yes"),
        t(
          "pricingSection.bookDetails.additionalDetails.data.priceForAdditional"
        ),
        t("pricingSection.bookDetails.additionalDetails.data.yes"),
        t(
          "pricingSection.bookDetails.additionalDetails.data.languagesSupported"
        ),
        t("pricingSection.bookDetails.additionalDetails.data.pageLimit"),
        t(
          "pricingSection.bookDetails.additionalDetails.data.unlimitedPhotoUploads"
        ),
        t("pricingSection.bookDetails.additionalDetails.data.videoTutorials"),
      ],
    },
    {
      logo: StoryWorthy,
      alt: t("pricingSection.additionalDetails2.alt"),
      title: t("pricingSection.additionalDetails2.title"),
      bgColor: "#15372F",
      sCase: true,
      data: [
        t("pricingSection.bookDetails.additionalDetails2.data.no"),
        t("pricingSection.bookDetails.additionalDetails2.data.priceFor139"),
        t(
          "pricingSection.bookDetails.additionalDetails2.data.priceForFullColorBook"
        ),
        t(
          "pricingSection.bookDetails.additionalDetails2.data.priceForAdditionalBook"
        ),
        t(
          "pricingSection.bookDetails.additionalDetails2.data.noShippingOutsideUS"
        ),
        t(
          "pricingSection.bookDetails.additionalDetails2.data.languageSupported"
        ),
        t("pricingSection.bookDetails.additionalDetails2.data.bookPageLimit"),
        t(
          "pricingSection.bookDetails.additionalDetails2.data.unlimitedPhotoUploads"
        ),
        t(
          "pricingSection.bookDetails.additionalDetails2.data.noVideoTutorials"
        ),
      ],
    },
  ];

  const featuresDetails = [
    {
      header: t("pricingSection.featureComparison.featuresDetails.header"),
      bgColor: "#E1683B",
      data: [
        t(
          "pricingSection.featureComparison.featuresDetails.data.questionAnswerFormat"
        ),
        t(
          "pricingSection.featureComparison.featuresDetails.data.narrativeFusionFormat"
        ),
        t(
          "pricingSection.featureComparison.featuresDetails.data.formattingFeatures"
        ),
        t(
          "pricingSection.featureComparison.featuresDetails.data.assistedEditing"
        ),
        t("pricingSection.featureComparison.featuresDetails.data.voiceToText"),
        t("pricingSection.featureComparison.featuresDetails.data.familyTree"),
        t(
          "pricingSection.featureComparison.featuresDetails.data.autoPhotoImprovement"
        ),
        t(
          "pricingSection.featureComparison.featuresDetails.data.mobileTabletFriendly"
        ),
      ],
    },
    {
      logo: LifeScriptLogo,
      alt: " the logo of LifeScript that represents a grandpa telling stories to his grandson under the cover of a book",
      title: "LifeScript logo",
      bgColor: "#30422E",
      data: [
        t("pricingSection.featureComparison.featuresDetails2.data.yes"),
        t(
          "pricingSection.featureComparison.featuresDetails2.data.yesInStandardPremium"
        ),
        t("pricingSection.featureComparison.featuresDetails2.data.yes"),
        t("pricingSection.featureComparison.featuresDetails2.data.yes"),
        t(
          "pricingSection.featureComparison.featuresDetails2.data.yesInStandardPremium"
        ),
        t(
          "pricingSection.featureComparison.featuresDetails2.data.yesInStandardPremium"
        ),
        t("pricingSection.featureComparison.featuresDetails2.data.yes"),
        t("pricingSection.featureComparison.featuresDetails2.data.yes"),
      ],
    },
    {
      logo: StoryWorthy,
      alt: "the logo icon of a picture with mountain landscape that represents photo upscaling and autofitting - LifeScript",
      title: "Storyworth",
      bgColor: "#15372F",
      data: [
        t("pricingSection.featureComparison.featuresDetails3.data.yes"),
        t("pricingSection.featureComparison.featuresDetails3.data.no"),
        t("pricingSection.featureComparison.featuresDetails3.data.no"),
        t("pricingSection.featureComparison.featuresDetails3.data.no"),
        t("pricingSection.featureComparison.featuresDetails3.data.no"),
        t("pricingSection.featureComparison.featuresDetails3.data.no"),
        t("pricingSection.featureComparison.featuresDetails3.data.no"),
        t("pricingSection.featureComparison.featuresDetails3.data.yes"),
      ],
    },
  ];

  return (
    <>
      <Head>
        <title>Pricing Plans and Competitor Comparison</title>
        <meta
          name="description"
          content="Each package includes lifetime access to our platform, premium full-color hardcover book and free shipping."
        />
      </Head>

      <Box
        sx={{ minHeight: "100vh", bgcolor: "#f3ecda", color: "#3e4f3c" }}
        className={styles.pricingPage}
      >
        <NavBar color="#F3ECDA" logo={LifeScriptLogo} />
        <Pricing />
        <Working
          data={pointsArray}
          width="340px"
          heading={t("pricingSection.title")}
          subHeading={t("pricingSection.subTitle")}
        />
        <Box sx={{ margin: { sm: "100px 0 -100px", xs: " 10px 0 -50px" } }}>
          <PricingDetails
            cardsDetail={pricingDetails}
            heading={t("pricingSection.bookDetails.title")}
            marked={t("pricingSection.bookDetails.subTitle")}
          />
          <PricingDetails
            cardsDetail={featuresDetails}
            heading={t("pricingSection.featureComparison.title")}
            marked={t("pricingSection.featureComparison.subTitle")}
          />
        </Box>
        <GotQuestions />
        <ContactFooter
          title={t("pricingSection.stillConfusedSection.title")}
          marked={t("pricingSection.stillConfusedSection.title2")}
          lineWidth={150}
          subTitle={t("pricingSection.stillConfusedSection.subTitle")}
          input1={t("pricingSection.stillConfusedSection.input1")}
          input2={t("pricingSection.stillConfusedSection.input2")}
          input3={t("pricingSection.stillConfusedSection.input3")}
          button={t("pricingSection.stillConfusedSection.btnText")}
        />
        <Footer />
      </Box>
    </>
  );
};

export default PricingPage;
