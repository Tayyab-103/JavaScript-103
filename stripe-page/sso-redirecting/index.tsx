// External libraries and frameworks
import { Box, CircularProgress } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

// Custom Redux actions
import { facebookLogin } from "@/store/slices/authSlice";

const SsoRedirecting = () => {
  const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const dispatch:any = useDispatch();
    const router = useRouter()
    const { data: session } = useSession();
    useEffect(() => {
        setLoading(true)
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
                setLoading(false)

              toast.success("login with facebook");
              router.push(`/getStarted/getTitle?userName=${res?.name}`); 
            })
            .catch((error) => {
                setLoading(false)
              toast.error(t("stripeFlow.registerSection.userExist"));
              router.push("/stripe-page/register-free-trial")
            });
          }
        }
      }, [session, dispatch]);


  return <Box>{loading && <CircularProgress />}</Box>;
};

export default SsoRedirecting;
