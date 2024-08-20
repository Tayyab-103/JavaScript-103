"use client";
import Layout from "@/components/Layout/Layout";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import RichText from "./richtext";
export default function Answers() {
  const router = useRouter();
  const { questionId } = router.query;

  return (
    <>
      <Layout>
        <Box
          sx={{
            bgcolor: "#fff",
          }}
        >
          <RichText questionId={questionId} />
        </Box>
      </Layout>
    </>
  );
}
