'use client';
// External libraries and frameworks
import { Box, Typography } from '@mui/material';
import { useTranslation } from "react-i18next";

// Custom components and modules
import GiftPricingCard from './GiftPricingCard';

// Stylesheets or CSS modules
import styles from '../../../../__webComponents/ComponentsStyles.module.css';

// Utility functions or helpers
import { createPricingCard } from '../../../../utils/stripeFlowObjects';

const GiftTabPanel = ({ onClick, selectedTab }) => {
  const { t } = useTranslation();
  const pricingCard = createPricingCard(t);

  return (
    <Box>
      <Box
        sx={{
          marginTop: { xs: '15px' },
          fontSize: { sm: '15px', xs: '16px' },
          marginLeft: { sm: '75px', xs: '20px' },
        }}
      >
        <Typography
          sx={{
            fontSize: { md: '52px', sm: '44px', xs: '32px' },
            fontFamily: 'Avenir5 !important',
          }}
        >
           {t("stripeFlow.pricePlanCard.TabPanel.title")}
        </Typography>
        <Typography sx={{ margin: { sm: '40px 0 20px', xs: '20px 0' } }}>
        {t("stripeFlow.pricePlanCard.TabPanel.description")}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { md: 'row', sm: 'column', xs: 'column' },
          alignItems: 'center',
          columnGap: { lg: '50px', sm: '20px' },
          rowGap: '50px',
          justifyContent: 'center',
          padding: ' 0 40px 70px',
        }}
        className={styles.cardsMain}
      >
        {pricingCard && pricingCard?.map((item) => (
          <GiftPricingCard key={item.id} category={item.category} price={item.price} card={item.card} id={item.id}  selectedTab={selectedTab} onClick={onClick} />
        ))}
      </Box>
    </Box>
  );
};

export default GiftTabPanel;
