'use client'

import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import Image from 'next/image';
import styles from "../ComponentsStyles.module.css"

import Bandage from "@/__webAssets/pngs/bandage.png"
import Narrative from "@/__webAssets/gif/narrative-fusion-demo-animation.webp"
import AssistedEditing from "@/__webAssets/gif/assisted-editing-demo-animation.webp"
import VoiceToText from "@/__webAssets/gif/voice-to-text-feature-demo-animation.webp"
import AutoPhoto from "@/__webAssets/gif/Auto-photo-improvement-demo-animation.webp"
import FamilyTree from "@/__webAssets/gif/family-tree-feature-demo-animation.webp"
import FormattingFeatures from "@/__webAssets/gif/formatting-features-demo-animation.webp"
import { useTranslation } from "react-i18next";
const panels = [
  {
    panel: 'panel1',
    timer: 11000
  },
  {
    panel: 'panel2',
    timer: 6000
  },
  {
    panel: 'panel3',
    timer: 10700
  },
  {
    panel: 'panel4',
    timer: 10700
  },
  {
    panel: 'panel5',
    timer: 5000
  },
  {
    panel: 'panel6',
    timer: 7600
  },
];

export default function CustomizedAccordions() {
  const { t } = useTranslation();
  const [currentPanel, setCurrentPanel] = useState(0);
  const [expanded, setExpanded] = useState('panel1');
  const [panelActive, setPanelActive] = useState({
    panel1: true,
    panel2: false,
    panel3: false,
    panel4: false,
    panel5: false,
    panel6: false,
  })

  const handleChange = (panel) => {
    setExpanded(expanded === panel ? false : panel);
    setPanelActive((prevState) => ({
      ...Object.fromEntries(Object.keys(prevState).map(key => [key, false])),
      [panel]: true,
    }));
  };

  const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme, open }) => ({
    borderLeft: open ? '3px solid #E1683B' : '2px solid #3E4F3C',

    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&::before': {
      display: 'none',
    },
  }));

  const AccordionSummary = styled((props, open) => (
    < MuiAccordionSummary
      {...props}
    />

  ))(({ theme, open }) => ({
    color: open ? '#3E4F3C' : 'rgba(0, 0, 0, .2)',

    backgroundColor: '#F3ECDA',
    fontWeight: 500,
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
  }));

  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(0),
    backgroundColor: '#F3ECDA'
  }));


  useEffect(() => {
    const currentPanelIndex = currentPanel % panels.length;


    const timeoutId = setTimeout(() => {
      // Calculate the index of the next panel
      const nextPanelIndex = (currentPanel + 1) % panels.length;
      handleChange(panels[nextPanelIndex].panel);
      setCurrentPanel(nextPanelIndex);
    }, panels[currentPanelIndex].timer);

    // Cleanup function to clear the timeout when component unmounts or when the dependency array changes
    return () => clearTimeout(timeoutId);
  }, [currentPanel]);

  return (
    <>
      <Box sx={{ maxHeight: "460px" }}>
        <Accordion expanded={expanded === 'panel1'} onChange={() => { handleChange('panel1'); setCurrentPanel(0) }} open={expanded === 'panel1'}>
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography  component="div" sx={{ fontSize: { lg: "32px", md: "26px" }, fontWeight: 500 }} color={panelActive.panel1 ? "#3E4F3C" : ""}>
              <h3 className={styles.pureHeadings}>{t("landingPage.featureSection.accordion1.heading")}</h3>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography  component="div" sx={{
              color: "#494949",
              fontSize: "16px",
              padding: "5px 0 20px 45px",
              maxWidth: "370px",
              fontFamily: "Avenir"
            }}>
              <h4 className={styles.pureHeadings}>{t("landingPage.featureSection.accordion1.description")}</h4>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel2'} onChange={() => { handleChange('panel2'); setCurrentPanel(1) }} open={expanded === 'panel2'}>
          <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <Typography   component="div" sx={{ fontSize: { lg: "32px", md: "26px" }, fontWeight: 500 }} color={panelActive.panel2 ? "#3E4F3C" : ""}>
              <h3 className={styles.pureHeadings}>{t("landingPage.featureSection.accordion2.heading")} </h3>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography   component="div" sx={{
              color: "#494949",
              fontSize: "16px",
              padding: "5px 0 20px 35px",
              maxWidth: "370px",
              fontFamily: "Avenir"
            }}>
              <h4 className={styles.pureHeadings}>{t("landingPage.featureSection.accordion2.description")}</h4>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel3'} onChange={() => { handleChange('panel3'); setCurrentPanel(2) }} open={expanded === 'panel3'}>
          <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
            <Typography  component="div" sx={{ fontSize: { lg: "32px", md: "26px" }, fontWeight: 500 }} color={panelActive.panel3 ? "#3E4F3C" : ""}>
              <h3 className={styles.pureHeadings}>{t("landingPage.featureSection.accordion3.heading")}</h3>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography  component="div" sx={{
              color: "#494949",
              fontSize: "16px",
              padding: "5px 0 20px 35px",
              maxWidth: "370px",
              fontFamily: "Avenir"
            }}>
              <h4 className={styles.pureHeadings}>{t("landingPage.featureSection.accordion3.description")}</h4>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel4'} onChange={() => { handleChange('panel4'); setCurrentPanel(3) }} open={expanded === 'panel4'}>
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography component="div" sx={{ fontSize: { lg: "32px", md: "26px" }, fontWeight: 500 }} color={panelActive.panel4 ? "#3E4F3C" : ""}>
              <h3 className={styles.pureHeadings}>{t("landingPage.featureSection.accordion4.heading")} </h3>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography component="div" sx={{
              color: "#494949",
              fontSize: "16px",
              padding: "5px 0 20px 35px",
              maxWidth: "370px",
              fontFamily: "Avenir"
            }}>
              <h4 className={styles.pureHeadings}>{t("landingPage.featureSection.accordion4.description")}</h4>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel5'} onChange={() => { handleChange('panel5'); setCurrentPanel(4) }} open={expanded === 'panel5'}>
          <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <Typography component="div" sx={{ fontSize: { lg: "32px", md: "26px" }, fontWeight: 500 }} color={panelActive.panel5 ? "#3E4F3C" : ""}>
              <h3 className={styles.pureHeadings}>{t("landingPage.featureSection.accordion5.heading")}</h3>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography component="div" sx={{
              color: "#494949",
              fontSize: "16px",
              padding: "5px 0 20px 35px",
              maxWidth: "370px",
              fontFamily: "Avenir"
            }}>
              <h4 className={styles.pureHeadings}> {t("landingPage.featureSection.accordion5.description")}</h4>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel6'} onChange={() => { handleChange('panel6'); setCurrentPanel(5) }} open={expanded === 'panel6'}>
          <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
            <Typography component="div" sx={{ fontSize: { lg: "32px", md: "26px" }, fontWeight: 500 }} color={panelActive.panel6 ? "#3E4F3C" : ""}>
              <h3 className={styles.pureHeadings}>{t("landingPage.featureSection.accordion6.heading")}</h3>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography component="div" sx={{
              color: "#494949",
              fontSize: "16px",
              padding: "5px 0 20px 35px",
              maxWidth: "370px",
              fontFamily: "Avenir"
            }}>
              <h4 className={styles.pureHeadings}>{t("landingPage.featureSection.accordion6.description")}</h4>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>

      <Box sx={{ position: "relative" }}>
        {panelActive.panel1 && <Image
        loading='lazy'
          src={Narrative}
          alt="Narrative fusion feature demo animation showing how it works - LifeScript"
          title='Narrative Fusion demo animation'
          className={styles.gif}
        />}
        {panelActive.panel2 && <Image
        loading='lazy'
          src={AssistedEditing}
          alt="Assisted Editing feature demo animation showing how the spelling and grammar check works - LifeScript"
          title='Assisted Editing demo animation'
          className={styles.gif} />}
        {panelActive.panel3 && <Image
        loading='lazy'
          src={VoiceToText}
          alt="Voice-to-text feature demo animation showing how your recorded words translate into written text - LifeScript"
          title='Voice-to-text demo animation'
          className={styles.gif} />}
        {panelActive.panel4 && <Image
        loading='lazy'
          src={FamilyTree}
          alt="Family Tree feature demo animation showing how your family members visualize across generations - LifeScript"
          title='Family tree demo animation'
          className={styles.gif} />}
        {panelActive.panel5 && <Image
        loading='lazy'
          src={FormattingFeatures}
          alt="Formatting Features demo animation showing how you can use bold, italics and other formatting - LifeScript"
          title=' Formatting features demo animation'
          className={styles.gif} />}
        {panelActive.panel6 && <Image
        loading='lazy'
          src={AutoPhoto}
          alt="Auto photo improvement demo animation showing how once you upload image we upscale and fit - LifeScript"
          title='Auto photo improvement feature demo animation'
          className={styles.gif} />}

        <Image src={Bandage}
        loading='lazy'
          alt="image"
          className={styles.bandage} />
      </Box>

    </>

  );
}