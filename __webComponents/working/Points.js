import { Box, Typography } from "@mui/material";
import styles from "../ComponentsStyles.module.css"
import Image from "next/image";

const Points = ({ no = false, icon, title, discription,width }) => {
  return (
    <Box sx={{
      padding: { lg: '20px 30px 40px', md: "15px 8px 20px 15px", sm: "20px 30px 40px ", xs: "24px 15px 28px 25px" },
      borderRadius: '4px',
      display: "inline-block",
      maxWidth: { md: width, sm: "450px", xs: "100%" },
      minHeight: { lg: "260px", md: "220px", xs: "" },
      height: { lg: icon && "380px", md: icon && "340px" },
      width: "100%"
    }}
      className={styles.points}
    >
      {no && <Typography sx={{
        color: "#E1683B",
        fontSize: "20px",
        fontWeight: 500,
        fontFamily: "Besley !important"
      }}>
        {no}
      </Typography>}
      {icon && <Image src={icon} alt="icon" className={styles.check} loading="lazy" />}

      <Typography component="div" sx={{
        color: "#F3ECDA",
        fontSize: { lg: "28px", md: "22px", sm: "28px", xs: "30px" },
        fontWeight: 500,
        minHeight: { lg: icon ? "100px" : "140px", md: icon ? "75px" : "110px" },
        fontFamily: "Besley !important",
      }}>
        <h4 className={styles.pureHeadings}>{title}</h4>
      </Typography>

      <Typography component="div" sx={{
        color: "#F3ECDA",
        fontSize: "16px",
        marginTop: { md: "0", sm: "20px", xs: "20px" },
        fontFamily: "Avenir"
      }}>
        <h5 className={styles.pureHeadings}>{discription}</h5>
      </Typography>
    </Box >
  )
}

export default Points;