'use client';
// External libraries and frameworks
import { Box } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useGoogleLogin } from '@react-oauth/google';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { signOut, useSession } from 'next-auth/react';

// Custom components and modules
import NewTabBar from './_components/NewTabBar';
import PurchaseForm from './_components/PurchaseForm';
import RegisterPage from './_components/RegisterPage';
import TabPanel from './_components/TabPanel';

// Assets
import Bg from '@/_assets/png/bg-hurt-lite.png';
import Logo from '@/_assets/svg/logo-dashboard.svg';

// Redux actions
import { facebookLogin, googleSignup } from '@/store/slices/authSlice';


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_API_KEY);

const SubscriptionPage = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const dispatch: any = useDispatch();
  const [selectedTab, setSelectedTab] = useState(0);
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      if (session.user) {
        const payload = {
          name: session.user.name,
          email: session.user.email,
          type: "register"
        };
        dispatch(facebookLogin(payload))
          .unwrap()
          .then((res) => {
            setSelectedTab(2);
            toast.success("login with facebook");
          })
          .catch((error) => {
            signOut();
            toast.error("User Already Exist");
          });
      }
    }
  }, [session, dispatch]);

  const handleTabClick = (index) => {
    setSelectedTab(index);
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => handleGoogleLoginSuccess(tokenResponse),
    onError: () => handleGoogleLoginFailure(),
  });

  const paymentType = localStorage.getItem("paymentType")

  const handleGoogleLoginSuccess = (e: any) => {
    dispatch(googleSignup({ credential: e.access_token, type: "register" }))
      .unwrap()
      .then((res: any) => {
        toast.success(t("signup-page.signedUpSuccessfully"));
        if (paymentType === "buynow") {
          router.push("/stripe-page/subscription");
          setSelectedTab(2);
        } else {
          router.push(`/getStarted?userName=${res?.name}`);
        }
      })
      .catch(() => {
        toast.error("User Already Exist");
      });
  };

  const handleGoogleLoginFailure = () => {
    toast.error(t("signup-page.failedSignupGoogle"));
  };


  const tabsData = [
    { label: t("stripeFlow.registerSection.tabsData.tab1"), active: selectedTab >= 0 },
    { label: t("stripeFlow.registerSection.tabsData.tab2"), active: selectedTab >= 1 && !session && handleGoogleLogin },
    { label: t("stripeFlow.registerSection.tabsData.tab3"), active: selectedTab === 2 },
  ];

  return (
    <>
      <Box
        sx={{
          bgcolor: '#f3ecda',
          color: '#3e4f3c',
          minHeight: '100vh',
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
          <NewTabBar tabs={tabsData} handleGoogleLogin={handleGoogleLogin} />
        </Box>

        <Box sx={{ position: 'relative' }}>
          <Box mt="60px" sx={{ position: 'relative', zIndex: 10 }}>
            {selectedTab === 0 && <TabPanel selectedTab={selectedTab} onClick={handleTabClick} />}
            {selectedTab === 1 && !session && <RegisterPage selectedTab={selectedTab} onClick={handleTabClick} handleGoogleLogin={handleGoogleLogin} />}
            {selectedTab === 2 &&
              <Elements stripe={stripePromise}>
                <PurchaseForm selectedTab={selectedTab} />
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

export default SubscriptionPage;
