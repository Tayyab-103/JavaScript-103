// 3rd party libraries
import { Box, Button, TextField, Typography } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { FormikHelpers, useFormik } from "formik";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import moment from "moment";

// Absolute imports
import { signupWithGift, signupWithInAppGift } from "@/store/slices/authSlice";

// Relative imports
import { DeliveryFormSchema } from "../../../../schema/deliveryFormSchema";
import { FormValues } from "../../../../utils/interface/interface";
import GiftPlanCard from "./GiftPlanCard";

const DeliveryForm = ({
  onClick,
  selectedTab,
  inAppGiftFlow,
  setGiftToUser,
}) => {
  const dispatch: any = useDispatch();
  const { t } = useTranslation();
  const router = useRouter();
  const minDate = moment().startOf("day").format("YYYY-MM-DD");
  const validationSchema = DeliveryFormSchema();

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    try {
      if (inAppGiftFlow === "true") {
        await dispatch(signupWithInAppGift(values))
          .unwrap()
          .then((res) => {
            setGiftToUser(res?._id);
            localStorage.setItem("sendMessage", res?.giftMessage);
            localStorage.setItem("receiverName", res?.name);
            localStorage.setItem("selectedDate", res?.sendGiftDate);
          });
      } else {
        await dispatch(signupWithGift(values))
          .unwrap()
          .then((res) => {
            localStorage.setItem("sendMessage", res?.giftMessage);
            localStorage.setItem("receiverName", res?.name);
            localStorage.setItem("selectedDate", res?.sendGiftDate);
          });
      }
      onClick(selectedTab + 1);
    } catch (error: any) {
      toast.error(error?.message || t("signup-page.failedSignup"));
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik<FormValues>({
    initialValues: {
      name: "",
      email: "",
      sendGiftDate: "",
      giftFrom: "",
      giftFromName: "",
      giftMessage: "",
    },
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
  });

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box
        className={"Container"}
        sx={{
          width: "100%",
          maxWidth: "1370px",
          margin: { sm: "0 0 30px 70px", xs: "0 20px 30px 20px" },
        }}
      >
        <Box>
          <Typography sx={{ fontSize: "40px", marginBottom: "20px" }}>
            {t("stripeFlow.giftFlow.deliveryForm.title")}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            columnGap: "50px",
          }}
        >
          <Box sx={{ maxWidth: { sm: "600px", xs: "100%" }, width: "100%" }}>
            <form onSubmit={formik.handleSubmit}>
              <Box>
                <Typography
                  sx={{
                    color: "#30422E",
                    fontSize: { xs: 12, sm: 14, md: 16, lg: 12 },
                  }}
                >
                  {t("stripeFlow.giftFlow.deliveryForm.nameField")}
                </Typography>
                <TextField
                  variant="outlined"
                  placeholder={t("stripeFlow.giftFlow.deliveryForm.nameField")}
                  name="name"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  sx={{
                    marginBottom: "10px",
                    width: "100%",
                    bgcolor: "white",
                  }}
                />
                {formik.touched.name && formik.errors.name && (
                  <span style={{ color: "red" }}>{formik.errors.name}</span>
                )}
              </Box>
              <Box>
                <Typography
                  sx={{
                    color: "#30422E",
                    fontSize: { xs: 12, sm: 14, md: 16, lg: 12 },
                  }}
                >
                  {t("stripeFlow.giftFlow.deliveryForm.emailField")}
                </Typography>
                <TextField
                  variant="outlined"
                  placeholder={t("stripeFlow.giftFlow.deliveryForm.emailField")}
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  sx={{
                    marginBottom: "10px",
                    width: "100%",
                    bgcolor: "white",
                  }}
                />
                {formik.touched.email && formik.errors.email && (
                  <span style={{ color: "red" }}>{formik.errors.email}</span>
                )}
              </Box>

              <Box>
                <Typography
                  sx={{
                    color: "#30422E",
                    fontSize: { xs: 12, sm: 14, md: 16, lg: 12 },
                  }}
                >
                  {t("stripeFlow.giftFlow.deliveryForm.sendGift")}
                </Typography>
                <DatePicker
                  name="sendGiftDate"
                  onChange={(date) =>
                    formik.setFieldValue(
                      "sendGiftDate",
                      date ? moment(date).format("YYYY-MM-DD") : ""
                    )
                  }
                  minDate={minDate}
                  sx={{
                    width: "100%",
                    backgroundColor: "white",
                    borderRadius: "2px",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderRadius: "2px",
                      },
                    },
                  }}
                  
                />
                {/* renderInput={(params) => (
                    <TextField
                      {...params}
                      error={
                        formik.touched.sendGiftDate &&
                        !!formik.errors.sendGiftDate
                      }
                      helperText={
                        formik.touched.sendGiftDate &&
                        formik.errors.sendGiftDate
                      }
                      sx={{
                        width: "100%",
                        backgroundColor: "white",
                        borderRadius: "2px",
                      }}
                    />
                  )} */}
              </Box>
              {formik.touched.sendGiftDate && formik.errors.sendGiftDate && (
                <span style={{ color: "red" }}>
                  {formik.errors.sendGiftDate}
                </span>
              )}

              <Box>
                <Typography
                  sx={{
                    color: "#30422E",
                    fontSize: { xs: 12, sm: 14, md: 16, lg: 12 },
                  }}
                >
                  {t("stripeFlow.giftFlow.deliveryForm.from")}
                </Typography>
                <TextField
                  variant="outlined"
                  placeholder={t(
                    "stripeFlow.giftFlow.deliveryForm.fromPlaceholder"
                  )}
                  name="giftFrom"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.giftFrom}
                  sx={{
                    marginBottom: "10px",
                    width: "100%",
                    bgcolor: "white",
                  }}
                />
                {formik.touched.giftFrom && formik.errors.giftFrom && (
                  <span style={{ color: "red" }}>{formik.errors.giftFrom}</span>
                )}
              </Box>
              <Box>
                <Typography
                  sx={{
                    color: "#30422E",
                    fontSize: { xs: 12, sm: 14, md: 16, lg: 12 },
                  }}
                >
                  {t("stripeFlow.giftFlow.deliveryForm.fromName")}
                </Typography>
                <TextField
                  variant="outlined"
                  placeholder={t(
                    "stripeFlow.giftFlow.deliveryForm.fromNamePlaceholder"
                  )}
                  name="giftFromName"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.giftFromName}
                  sx={{
                    marginBottom: "10px",
                    width: "100%",
                    bgcolor: "white",
                  }}
                />
                {formik.touched.giftFromName && formik.errors.giftFromName && (
                  <span style={{ color: "red" }}>
                    {formik.errors.giftFromName}
                  </span>
                )}
              </Box>

              <Box>
                <Typography
                  sx={{
                    color: "#30422E",
                    fontSize: { xs: 12, sm: 14, md: 16, lg: 12 },
                  }}
                >
                  {t("stripeFlow.giftFlow.deliveryForm.yourMessage")}
                </Typography>
                <TextField
                  placeholder={t(
                    "stripeFlow.giftFlow.deliveryForm.messagePlaceholder"
                  )}
                  multiline
                  rows={7}
                  name="giftMessage"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.giftMessage}
                  sx={{ width: "100%", backgroundColor: "#FAFAFA" }}
                />
                {formik.touched.giftMessage && formik.errors.giftMessage && (
                  <span style={{ color: "red" }}>
                    {formik.errors.giftMessage}
                  </span>
                )}
              </Box>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  width: "200px",
                  marginTop: "50px",
                  bgcolor: "#e1693b",
                  "&:hover": {
                    backgroundColor: "#b5522d",
                  },
                }}
              >
                {t("stripeFlow.giftFlow.deliveryForm.btnText")}
              </Button>
            </form>
          </Box>

          <Box
            sx={{
              margin: "0 35px 35px 0",
              display: { md: "block", sm: "none", xs: "none" },
            }}
          >
            <GiftPlanCard
              price={router.query.price}
              category={router.query.category}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DeliveryForm;
