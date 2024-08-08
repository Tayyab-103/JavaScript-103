

import { Box } from "@mui/material";
import Footer from "@/__webComponents/footer/Footer";
import TermsAndConditions from "./TermsAndConditions";
import Head from 'next/head';

const TermsOfUse = () => {
  return (
    <>
    <Head>
        <title>Terms of Use - LifeScript</title>
        <meta name="description" content="Review the Terms of Use for LifeScript to understand how to use and access for our website and services." />
      </Head>
      <Box sx={{ bgcolor: "#f3ecda", color: "#3e4f3c" }}>
      <TermsAndConditions />
      <Footer />
    </Box>
    </>
  )
}

export default TermsOfUse;