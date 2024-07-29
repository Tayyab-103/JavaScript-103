import { Grid, Typography } from "@mui/material";

const GiftTabBar = ({ tabs }) => {

  return (
    <Grid
      container
      sx={{
        color: "black",
        width: "100%",
        maxWidth: "1500px",
      }}
    >
      {tabs && tabs?.map(
        (tab, index) =>
          (index !== 3) && (
            <Grid
              key={index}
              item
              xs={3.5}
              sx={{ padding: "2px" }}
            >
              <Typography
                sx={{
                  marginBottom: "5px",
                  color: tab.active ? "black" : "#7C7C7C",
                  fontSize: { md: "14.097px", sm: "10px", xs: "10px" },
                  fontWeight: 700,
                  textAlign: "left",
                }}
              >
                {tab.label}
              </Typography>
              <Grid
                sx={{
                  bgcolor: tab.active ? "#e1693b" : "f0d2ba",
                  borderRadius: "10px",
                  height: "9px",
                  border: "1px solid #e1693b",
                  width: "100%",
                }}
              />
            </Grid>
          )
      )}
    </Grid>
  );
};

export default GiftTabBar;
