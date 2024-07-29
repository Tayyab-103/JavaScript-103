'use client';
// External libraries and frameworks
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Next.js modules
import { useRouter } from 'next/router';
import Image from 'next/image';

// UI libraries or component libraries
import { Box } from '@mui/material';

// Custom components and modules
import DeliveryForm from './_components/DeliveryForm';
import GiftPurchaseForm from './_components/GiftPurchaseForm';
import GiftTabBar from './_components/GiftTabBar';
import GiftTabPanel from './_components/GiftTabPanel';

// Assets
import Bg from '@/_assets/png/bg-hurt-lite.png';
import Logo from '@/_assets/svg/logo-dashboard.svg';


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_API_KEY);

const GiftSubscriptionPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { inAppGiftFlow } = router.query;
  const [giftToUser, setGiftToUser] = useState('')
  const [giftParams, setGiftParams] = useState(inAppGiftFlow)
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabClick = (index: any) => {
    setSelectedTab(index);
  };

  const tabsData = [
    { label: t("stripeFlow.giftFlow.tabBar.tab1"), active: selectedTab >= 0 },
    { label: t("stripeFlow.giftFlow.tabBar.tab2"), active: selectedTab >= 1 },
    { label: t("stripeFlow.giftFlow.tabBar.tab3"), active: selectedTab === 2 },
  ];

  return (
    <>
      <Box
        sx={{
          bgcolor: '#f3ecda',
          minHeight: '100vh',
          color: '#3e4f3c',
        }}
      >
        <Box
          sx={{
            bgcolor: '#30422e',
            padding: '26px 0 26px 15px',
            display: 'flex',
            alignItems: 'center',
            color: 'white',
          }}
        >
          <Image src={Logo} alt="Logo" />
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            marginTop: '70px',
            marginLeft: { sm: '70px', xs: '20px' },
          }}
        >
          <GiftTabBar tabs={tabsData}/>
        </Box>

        <Box sx={{ position: 'relative' }}>
          <Box mt="60px" sx={{ position: 'relative', zIndex: 10 }}>
            {selectedTab === 0 && <GiftTabPanel selectedTab={selectedTab} onClick={handleTabClick} />}
            {selectedTab === 1 && <DeliveryForm selectedTab={selectedTab} onClick={handleTabClick} inAppGiftFlow={giftParams} setGiftToUser={setGiftToUser} />}
            {selectedTab === 2 &&
              <Elements stripe={stripePromise}>
                <GiftPurchaseForm inAppGiftFlow={giftParams} giftToUser={giftToUser} />
              </Elements>
            }
          </Box>

          <Box sx={{ position: 'absolute', right: 0, bottom: 0, display: { md: 'block', sm: 'none', xs: 'none' } }}>
            <Image src={Bg} alt="img" />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default GiftSubscriptionPage;
