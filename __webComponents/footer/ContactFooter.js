'use client'
import { Box, Typography, TextField } from "@mui/material"
import Image from "next/image"
import styles from "../ComponentsStyles.module.css"
import Smily from "@/__webAssets/svgs/smily.svg"
import Button from "../button/Button"
import Line from "@/__webAssets/svgs/line-white.svg"
import { useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import { useDispatch } from "react-redux"
import { contact, reminderForm } from "@/store/slices/authSlice"
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Shape from "@/__webAssets/svgs/input-shape.svg"
import moment from 'moment';

const ContactFooter = ({ title, date = false, subTitle, input1, input2, input3, button, marked, lineWidth }) => {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    description: ''
  });

  const [reminderData, setReminderData] = useState({
    email: "",
    occasionMessage: "",
    sendDate: ""
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    description: ''
  });

  const [errorsReminder, setErrorReminder] = useState({
    email: "",
    occasionMessage: "",
    sendDate: ""
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (!date) {
      setFormValues(prevValues => ({ ...prevValues, [name]: value }));
    } else {
      setReminderData(prevValues => ({ ...prevValues, [name]: value }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!date) {
      if (!formValues.name.trim()) newErrors.name = 'Name is required';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formValues.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!emailRegex.test(formValues.email)) {
        newErrors.email = 'Email must be a valid email address';
      }
      if (!formValues.description.trim()) newErrors.description = 'Description is required';

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    } else {
      if (!reminderData.occasionMessage.trim()) newErrors.occasionMessage = 'Type a message';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!reminderData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!emailRegex.test(reminderData.email)) {
        newErrors.email = 'Email must be a valid email address';
      }
      if (!reminderData.sendDate) newErrors.sendDate = 'Date is required';

      setErrorReminder(newErrors);
      return Object.keys(newErrors).length === 0;
    }
  };

  const getDate = (date) => {

    const isoDate = new Date(date)
    console.log('Converted Date to ISO:', isoDate);

    setReminderData(prevValues => ({ ...prevValues, sendDate: isoDate }));
  };

  const handleSubmit = async () => {
    if (validate()) {
      try {
        const data = date ? reminderData : formValues;
        data.sendDate = moment(data.sendDate).format('YYYY-MM-DD');

        const res = date ? await dispatch(reminderForm(data)).unwrap() : await dispatch(contact(data)).unwrap();

        if (!date) {
          toast.success(res);
          setFormValues({
            name: '',
            email: '',
            description: ''
          });
        } else {
          toast.success("Reminder set For You");
          setReminderData({
            email: "",
            occasionMessage: "",
            sendDate: ""
          });
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error(error.message || 'Failed to submit the form');
      }
    }
  };
  return (
    <Box
      sx={{
        padding: { md: "70px 40px 50px", sm: "70px 30px 50px", xs: "40px 20px" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "#F3ECDA",
        position: "relative",
        zIndex: "10"
      }}
      className={styles.contactFooterBox}
      id="ContactUs"
    >
      <Box sx={{
        fontSize: { md: "54px", sm: "44px", xs: "32px" },
        textAlign: "center",
        fontWeight: 500,
        fontFamily: "Besley !important",
      }}>
        {title}{" "}
        <Box sx={{ display: "inline", position: "relative" }}>
          {marked}
          <Box sx={{ maxWidth: "180px", position: "absolute", right: { sm: "-10px", xs: "-10px" }, bottom: { sm: "-30px", xs: "-20px" } }}>
            <Image src={Line} alt="line" className={styles.footerLine} width={lineWidth} loading='lazy' />
          </Box>
        </Box>
      </Box>

      <Typography sx={{ fontSize: "16px", textAlign: "center", fontWeight: 500, marginTop: "30px", fontFamily: "Avenir" }}>
        {subTitle}
      </Typography>

      <Box sx={{
        display: "flex",
        columnGap: "8px",
        rowGap: "20px",
        flexDirection: { sm: "row", xs: "column" },
        margin: { sm: "55px 0 40px", xs: "35px 0 20px" },
        width: "100%",
        justifyContent: "center"
      }}>
        <Box sx={{ width: { sm: "375px", xs: "100%" } }}>
          <TextField
            name={date ? "email" : "name"}
            value={date ? reminderData.email : formValues.name}
            onChange={handleChange}
            placeholder={input1}
            error={date ? !!errorsReminder.email : !!errors.name}
            helperText={date ? errorsReminder.email : errors.name}
            fullWidth
            sx={{
              '& .MuiInputBase-root': {
                backgroundColor: 'white',
              }, borderRadius: "5px"
            }}
          />
        </Box>
        <Box sx={{ width: { sm: "375px", xs: "100%" } }}>
          <TextField
            name={date ? "occasionMessage" : "email"}
            value={date ? reminderData.occasionMessage : formValues.email}
            onChange={handleChange}
            placeholder={input2}
            error={date ? !!errorsReminder.occasionMessage : !!errors.email}
            helperText={date ? errorsReminder.occasionMessage : errors.email}
            fullWidth
            sx={{
              '& .MuiInputBase-root': {
                backgroundColor: 'white',
              }, borderRadius: "5px"
            }}
          />
        </Box>
        <Box sx={{ width: { sm: "375px", xs: "100%" } }}>
          {date ?
            <GetDate getDate={getDate} value={reminderData.sendDate} error={errorsReminder.sendDate} />
            :
            <TextField
              name="description"
              value={formValues.description} 
              onChange={handleChange}
              placeholder={input3}
              error={!!errors.description}
              helperText={errors.description}
              fullWidth
              sx={{
                '& .MuiInputBase-root': {
                  backgroundColor: 'white',
                },
                borderRadius: "5px"
              }}
            />
          }
        </Box>

      </Box>

      <Box sx={{ width: { sm: "200px", xs: "100%" } }}>
        <Button
          title={button}
          width='100%'
          height='50px'
          backgroundColor="#30422E"
          img2={Smily}
          bgHover="#1D291C"
          onClick={handleSubmit}
        />
      </Box>
      <ToastContainer />
    </Box>
  );
}

export default ContactFooter;

function GetDate({ getDate, value, error }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleCalander() {
    setIsOpen((prev) => !prev);
  }
  const handleDateChange = (date) => {
    if (date) {
      getDate(date); 
      setIsOpen(false); 
    }
  };

  return (
    <Box sx={{ position: "relative" }}>
      <Box sx={{ position: "relative" }} onClick={handleCalander}>
        <Box sx={{
          bgcolor: "#f5f5f5",
          position: "absolute",
          right: "10px",
          zIndex: "100",
          top: "15px",
          cursor: "pointer",
        }} onClick={handleCalander}>
          <CustomCalendarIcon />
        </Box>
        <DatePicker
          sx={{
            bgcolor: "#f5f5f5",
            borderRadius: "2px",
            width: "100%",
            color: "#7e7e7e",
            border: "none"
          }}
          value={value ? new Date(value) : null}
          onChange={handleDateChange}
          open={isOpen}
          onClose={() => setIsOpen(false)}
          renderInput={(params) => (
            <TextField
              {...params}
              error={!!error}
              helperText={error}
              sx={{
                '& .MuiInputBase-root': {
                  backgroundColor: 'white',
                },
                borderRadius: "5px"
              }}
            />
          )}
        />
      </Box>
      {error && (
        <Typography variant="caption" color="error" sx={{ position: "absolute", bottom: -20 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
}

const CustomCalendarIcon = () => (
  <Image src={Shape} alt="Calendar" width={26} height={24} />
);
