'use client';
// External libraries and frameworks
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

// Custom components and modules
import Button from '../../../../__webComponents/button/Button';
import { createCheckArray } from "../../../../utils/stripeFlowObjects";

// Assets
import Check from '@/__webAssets/svgs/check.svg';
import Lock from '@/__webAssets/svgs/lock.svg';
import NextIcon from '@/__webAssets/svgs/next.svg';

// Stylesheets or CSS modules
import styles from '../../../../__webComponents/ComponentsStyles.module.css';

const NewPricingCard = ({ price, category, card, id, selectedTab, onClick }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const CheckArray = createCheckArray(t);

  const handleButtonClick = () => {
    localStorage.setItem('price', price);
    localStorage.setItem('category', category);
    router.push({
      pathname: '/stripe-page/subscription',
      query: { price, category },
    });
    onClick(selectedTab + 1);
  };

  return (
    <Box
      sx={{
        borderRadius: '8px',
        width: { sm: '350px', xs: '340px' },
        height: { lg: '700px' },
        position: 'relative',
      }}
      backgroundColor={card == '2' ? '#30422E' : '#F4F4F4'}
      color={card == '2' && '#f4f4f4'}
      id={id}
    >
      <Box
        sx={{
          padding: {
            lg: '39px 30px 85px 45px',
            md: '35px 20px 85px',
            sm: '39px 45px 85px',
            xs: '35px 25px 80px',
          },
        }}
      >
        <Box
          sx={{
            borderRadius: '4px',
            backgroundColor: '#E7E7E7',
            padding: '4px 8px',
            display: 'inline',
            color: '#3E4F3C',
            fontFamily: 'Avenir5',
          }}
        >
          {category}
        </Box>
        {category == t("stripeFlow.pricePlanCard.TabPanel.category2") && (
          <Box
            sx={{
              borderRadius: '4px',
              backgroundColor: '#E1683B',
              padding: '4px 8px',
              color: '#F4F4F4',
              marginLeft: '6px',
              display: 'inline',
              fontFamily: 'Avenir LT Std',
            }}
          >
            { t("stripeFlow.pricePlanCard.popular")}
          </Box>
        )}
        <Typography
          sx={{
            fontSize: '36px',
            fontWeight: '400',
            borderBottom: '1px solid #BFC4B5',
            padding: '10px 0',
            marginBottom: '34px',
          }}
          className={styles.price}
        >
          ${price}
        </Typography>

        {(category == t("stripeFlow.pricePlanCard.TabPanel.category1") && (
          <Box>
            {CheckArray.map((item, index) => (
              <Box
                sx={{
                  display: 'flex',
                  columnGap: '25px',
                  alignItems: 'center',
                  marginBottom: '24px',
                }}
                key={index}
              >
                <Image src={item.basicStatus ? Check : Lock} alt="check" />
                <Typography sx={{ fontSize: '15px', fontFamily: 'Avenir' }}>{item.dis}</Typography>
              </Box>
            ))}
          </Box>
        )) ||
          (category == t("stripeFlow.pricePlanCard.TabPanel.category2") && (
            <Box>
              {CheckArray.map((item, index) => (
                <Box
                  sx={{
                    display: 'flex',
                    columnGap: '25px',
                    alignItems: 'center',
                    marginBottom: '24px',
                  }}
                  key={index}
                >
                  <Image src={item.standardStatus ? Check : Lock} alt="check" />
                  <Typography sx={{ fontSize: '15px', fontFamily: 'Avenir' }}>{item.dis}</Typography>
                </Box>
              ))}
            </Box>
          )) ||
          (category == t("stripeFlow.pricePlanCard.TabPanel.category3") && (
            <Box>
              {CheckArray && CheckArray?.map((item, index) => (
                <Box
                  sx={{
                    display: 'flex',
                    columnGap: '25px',
                    alignItems: 'center',
                    marginBottom: '24px',
                  }}
                  key={index}
                >
                  <Image src={item.PrimuimStatus ? Check : Lock} alt="check" />
                  <Typography sx={{ fontSize: '15px', fontFamily: 'Avenir' }}>{item.dis}</Typography>
                </Box>
              ))}
            </Box>
          ))}
      </Box>
      <Box sx={{ position: 'absolute', bottom: '0', left: '0', right: '0' }}>
        <Button title={ t("stripeFlow.pricePlanCard.btnText")} width="100%" height="75px" font="24px" borderRadius="0px 0px 8px 8px" img2={NextIcon} onClick={() => handleButtonClick()} />
      </Box>
    </Box>
  );
};

export default NewPricingCard;
