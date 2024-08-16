import Box from "@mui/material/Box";
import Image from "next/image";
import * as React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Carousel2 from "../../../public/carousel1.png";
import Carousel1 from "../../../public/carousel.png";
import Carousel3 from "../../../public/carousel3.png";

import { CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Logo from "@/_assets/svg/lifeScript-logo.svg";
import Carousel from "./Carousel";
import Login from "./Login";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box
          sx={{
            p: "24px 0",
          }}
        >
          <Box>{children}</Box>
        </Box>
      )}
    </Box>
  );
}

export default function Register() {
  const router = useRouter();
  const { t } = useTranslation();
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(true);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const carouselItems = [
    { path: Carousel1, alt: "Login Image" },
    { path: Carousel2, alt: "Signup Image" },
    { path: Carousel3, alt: "Signup Image" },

  ];

  useEffect(() => {
    const Tokken = localStorage.getItem("token");
    if (Tokken) {
      setTimeout(() => {
        setLoading(false);
        router.push("/dashboard/chapters");
      }, 1000);
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <Box>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100vw",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box
          display="grid"
          alignItems="center"
          overflow="scroll"
          height="100dvh"
          boxSizing="border-box"
          gap="1rem"
          color="#000"
          sx={{
            overflowX: "hidden",
            p: 2,
            backgroundColor: "#FFF7EA",
            gridTemplateColumns: {
              md: "repeat(2, minmax(0, 1fr))",
              xs: "repeat(1, minmax(0, 1fr))",
            },
          }}
        >
          <Box sx={{ height: "auto", display: { md: "block", xs: "none" } }}>
            <Carousel items={carouselItems} />
          </Box>
          <Box
            sx={{
              margin: 0,
              height: "auto",
              width: "100%",
              marginTop: "40px"
            }}
          >
            <Box textAlign={"center"}>
              <Image src={Logo} width={320} alt="Logo Image" />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "30px"
              }}
            >
            </Box>
            <Box>
              <Login />
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}
