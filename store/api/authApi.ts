import {
  ChangePassword,
  ForgetPass,
  LoginData,
  SignupData,
  UpdatePasswordData,
  VerifyEmail,
} from "@/interface/authInterface";
import api from "@/services/api";
import socket from "@/services/socketManager";
import axios from "axios";
import Error from "next/error";

export async function loginApi(data: LoginData) {
  localStorage.clear();
  try {
    const res = await api.post("/auth/login", data);

    localStorage.setItem("token", res?.token);
    localStorage.setItem("username", res?.data?.name);
    localStorage.setItem("language", res?.data?.language);
    localStorage.setItem("userId", res?.data._id);
    localStorage.setItem("userEmail", res?.data?.email);
    localStorage.setItem("onBoarding", res?.data?.onBoarding);

    return res.data;
  } catch (error: any) {
    if (typeof error?.response?.data?.message === "object") {
      const errors = error?.response?.data?.message?.message;
      throw new Error(errors ? errors[0] : "Failed to Sign in");
    } else {
      throw new Error(error.response?.data?.message);
    }
  }
}

export async function stripeDoneApi() {
  try {
    const res = await api.get("/auth/refreshToken");
    // localStorage.clear();
    localStorage.setItem("token", res.token);
    localStorage.setItem("accessRole", res?.data?.accessRole);

    // localStorage.setItem("username", res.data.name);
    // localStorage.setItem("userId", res.data._id);
    // localStorage.setItem("userEmail", res.data.email);

    return res.data;
  } catch (error: any) {
    if (typeof error?.response?.data?.message === "object") {
      const errors = error?.response?.data?.message?.message;
      throw new Error(errors ? errors[0] : "Failed to Sign in");
    } else {
      throw new Error(error.response?.data?.message);
    }
  }
}

export async function googleLoginApi(data: { credential: string, type:string }) {
  localStorage.clear();
  try {
    const res = await api.post("/auth/google/callback/sign-in", data);
    localStorage.setItem("token", res.token);
    localStorage.setItem("accessRole", res?.data?.accessRole);
    localStorage.setItem("username", res.data.name);
    localStorage.setItem("language", res.data.language);
    localStorage.setItem("userId", res.data._id);
    localStorage.setItem("userEmail", res.data.email);
    localStorage.setItem("onBoarding", res.data.onBoarding);
    socket.emit("joinRoom", res.data._id);

    return res.data;
  } catch (error: any) {
    if (typeof error?.response?.data?.message === "object") {
      const errors = error?.response?.data?.message?.message;
      throw new Error(errors ? errors[0] : "Failed to Sign in");
    } else {
      throw new Error(error.response?.data?.message);
    }
  }
}

export async function facebookLoginApi(data: { credential: string }) {
  // localStorage.clear();

  try {
    const res = await api.post("/auth/facebook/callback/sign-in", data);
    localStorage.setItem("token", res.token);
    localStorage.setItem("username", res.data.name);
    localStorage.setItem("userId", res.data._id);
    localStorage.setItem("userEmail", res.data.email);
    localStorage.setItem("onBoarding", res.data.onBoarding);

    return res.data;
  } catch (error: any) {
    if (typeof error?.response?.data?.message === "object") {
      const errors = error?.response?.data?.message?.message;
      throw new Error(errors ? errors[0] : "Failed to Sign in");
    } else {
      throw new Error(error.response?.data?.message);
    }
  }
}

export async function googleSignupApi(data: { credential: string, type:string }) {
  // localStorage.clear();
  try {

    const res = await api.post("/auth/google/callback/sign-up", data);
    localStorage.setItem("accessRole", res?.data?.accessRole);
    localStorage.setItem("token", res.token);
    localStorage.setItem("username", res.data.name);
    localStorage.setItem("userId", res.data._id);
    localStorage.setItem("userEmail", res.data.email);
    localStorage.setItem("onBoarding", res.data.onBoarding);

    return res.data;
  } catch (error: any) {
    if (typeof error?.response?.data?.message === "object") {
      const errors = error?.response?.data?.message?.message;
      throw new Error(errors ? errors[0] : "Failed to Sign in");
    } else {
      throw new Error(error.response?.data?.message);
    }
  }
}

export async function facebookSignupApi(data: { credential: string }) {
  // localStorage.clear();
  try {
    const res = await api.post("/auth/facebook/callback/sign-up", data);
    localStorage.setItem("token", res.token);
    localStorage.setItem("accessRole", res?.data?.accessRole);
    localStorage.setItem("username", res.data.name);
    localStorage.setItem("userId", res.data._id);
    localStorage.setItem("userEmail", res.data.email);
    localStorage.setItem("onBoarding", res.data.onBoarding);

    return res.data;
  } catch (error: any) {
    if (typeof error?.response?.data?.message === "object") {
      const errors = error?.response?.data?.message?.message;
      throw new Error(errors ? errors[0] : "Failed to Sign in");
    } else {
      throw new Error(error.response?.data?.message);
    }
  }
}

export async function updatePasswordApi(data: UpdatePasswordData) {
  try {
    const id = data.id;
    delete data.id;
    const res = await api.post(`user/resetPassword/${id}`, data);
    return res.data.data;
  } catch (error: any) {
    if (typeof error?.response?.data?.message === "object") {
      const errors = error?.response?.data?.message?.message;
      throw new Error(errors ? errors[0] : "Failed to log in");
    } else {
      throw new Error(error.response?.data?.message);
    }
  }
}

export async function updateUserProfileApi(data: any) {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      acceptinternalaccess: "acceptinternalaccess",
      "Content-Type": "application/json",
    };
    const userId = localStorage.getItem("userId");
    const res = await axios.put(
      `https://api.thelifescript.com/users/${userId}`,
      data,
      { headers }
    );
    res?.data?.name && localStorage.setItem("username", res?.data?.name);
    res?.data?.language && localStorage.setItem("language", res?.data?.langugae);
    return res;
  } catch (error: any) {
    if (typeof error?.response?.data?.message === "object") {
      const errors = error?.response?.data?.message?.message;
      throw new Error(errors ? errors[0] : "Failed");
    } else {
      throw new Error(error.response?.data?.message);
    }
  }
}

export async function getUserProfileApi() {
  try {
    const userId = localStorage.getItem("userId");

    const res = await api.get(`users/${userId}`);
    return res;
  } catch (error: any) {
    if (typeof error?.response?.data?.message === "object") {
      const errors = error?.response?.data?.message?.message;
      throw new Error(errors ? errors[0] : "Failed to log in");
    } else {
      throw new Error(error.response?.data?.message);
    }
  }
}

export async function getBookInteriorApi() {
  try {
    const res = await api.get("chapter-compile/generate-pdf");
    return res;
  } catch (error: any) {
    if (typeof error?.response?.data?.message === "object") {
      const errors = error?.response?.data?.message?.message;
      throw new Error(errors ? errors[0] : "Failed to log in");
    } else {
      throw new Error(error.response?.data?.message);
    }
  }
}

export async function stripPaymentLuluApi(data: any) {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      acceptinternalaccess: "acceptinternalaccess",
      "Content-Type": "application/json",
    };
    const res = await axios.post(
      "https://api.thelifescript.com/chapter-compile/payment/stripe-lulu",
      data,
      { headers }
    );
    return res.data;
  } catch (error: any) {
    if (typeof error?.response?.data?.message === "object") {
      const errors = error?.response?.data?.message?.message;
      throw new Error(errors ? errors[0] : "Failed");
    } else {
      throw new Error(error.response?.data?.message);
    }
  }
}

export async function getLuluBalanceApi() {
  try {
    const res = await api.get("chapter-compile/lulu-stripe/balance");
    return res;
  } catch (error: any) {
    if (typeof error?.response?.data?.message === "object") {
      const errors = error?.response?.data?.message?.message;
      throw new Error(errors ? errors[0] : "Failed to log in");
    } else {
      throw new Error(error.response?.data?.message);
    }
  }
}

export async function getLuluShippingApi() {
  try {
    const res = await api.get("lulu-shipping");
    return res;
  } catch (error: any) {
    if (typeof error?.response?.data?.message === "object") {
      const errors = error?.response?.data?.message?.message;
      throw new Error(errors ? errors[0] : "Failed to log in");
    } else {
      throw new Error(error.response?.data?.message);
    }
  }
}

export async function luluCallApi(data) {
  try {
    const res = await api.post("chapter-compile/payment/stripe-lulu", data);
    return res;
  } catch (error: any) {
    if (typeof error?.response?.data?.message === "object") {
      const errors = error?.response?.data?.message?.message;
      throw new Error(errors ? errors[0] : "Failed to log in");
    } else {
      throw new Error(error.response?.data?.message);
    }
  }
}

export async function createLuluShippingApi(data: any) {
  try {
    const res = await api.post("lulu-shipping", data);
    return res;
  } catch (error: any) {
    if (typeof error?.response?.data?.message === "object") {
      const errors = error?.response?.data?.message?.message;
      throw new Error(errors ? errors[0] : "Failed to log in");
    } else {
      throw new Error(error.response?.data?.message);
    }
  }
}

export async function updateLuluShippingApi(data) {
  try {
    const res = await api.patch(`lulu-shipping`, data);
    return res;
  } catch (error: any) {
    if (typeof error?.response?.data?.message === "object") {
      const errors = error?.response?.data?.message?.message;
      throw new Error(errors ? errors[0] : "Failed to log in");
    } else {
      throw new Error(error.response?.data?.message);
    }
  }
}

export async function signupApi(data: SignupData) {
  localStorage.clear();
  try {
    const res = await api.post("/auth/", data);
    localStorage.setItem("accessRole", res?.data?.accessRole);
    localStorage.setItem("token", res?.accessToken);
    localStorage.setItem("username", res.data.name);
    localStorage.setItem("userId", res.data._id);
    localStorage.setItem("userEmail", res.data.email);

    return res.data;
  } catch (error: any) {
    if (typeof error?.response?.data?.message === "object") {
      const errors = error?.response?.data?.message?.message;
      throw new Error(errors ? errors[0] : "Failed to Sign up");
    } else {
      throw new Error(error.response?.data?.message);
    }
  }
}

export async function signupApiWithBuy(data: SignupData) {
  // localStorage.clear();
  try {
    const res = await api.post("/auth/", data);
    localStorage.setItem("accessRole", res?.data?.accessRole);
    localStorage.setItem("token", res?.accessToken);
    localStorage.setItem("username", res.data.name);
    localStorage.setItem("userId", res.data._id);
    localStorage.setItem("userEmail", res.data.email);

    return res.data;
  } catch (error: any) {
    if (typeof error?.response?.data?.message === "object") {
      const errors = error?.response?.data?.message?.message;
      throw new Error(errors ? errors[0] : "Failed to Sign up");
    } else {
      throw new Error(error.response?.data?.message);
    }
  }
}
// Gift Flow API
// export async function signupApiWithGift(data: SignupData) {
//   // localStorage.clear();
//   try {
//     const res = await api.post("/auth/create/gift", data);
//     localStorage.setItem("accessRole", res?.data?.accessRole);
//     localStorage.setItem("token", res?.accessToken);
//     localStorage.setItem("username", res.data.name);
//     localStorage.setItem("userId", res.data._id);
//     localStorage.setItem("userEmail", res.data.email);

//     return res.data;
//   } catch (error: any) {
//     if (typeof error?.response?.data?.message === "object") {
//       const errors = error?.response?.data?.message?.message;
//       throw new Error(errors ? errors[0] : "Failed to Sign up");
//     } else {
//       throw new Error(error.response?.data?.message);
//     }
//   }
// }

export async function signupApiWithGift(data: any) {
  try {
    const res = await api.post("/auth/create/gift", data);
    localStorage.setItem("accessRole", res?.data?.accessRole);
    localStorage.setItem("token", res?.accessToken);
    localStorage.setItem("username", res.data.name);
    localStorage.setItem("userId", res.data._id);
    localStorage.setItem("userEmail", res.data.email);

    return res.data;
  } catch (error: any) {
    if (typeof error?.response?.data?.message === "object") {
      const errors = error?.response?.data?.message?.message;
      throw new Error(errors ? errors[0] : "Failed to Sign up");
    } else {
      throw new Error(error.response?.data?.message);
    }
  }
}
export async function signupApiWithInAppGiftApi(data: any) {
  try {
    const res = await api.post("/auth/create/gift/in-App", {...data, inAppGiftFlow:true});

    // localStorage.setItem("accessRole", res?.data?.accessRole);
    // localStorage.setItem("token", res?.accessToken);
    // localStorage.setItem("username", res.data.name);
    // localStorage.setItem("userId", res.data._id);
    // localStorage.setItem("userEmail", res.data.email);

    return res.data;
  } catch (error: any) {
    if (typeof error?.response?.data?.message === "object") {
      const errors = error?.response?.data?.message?.message;
      throw new Error(errors ? errors[0] : "Failed to Sign up");
    } else {
      throw new Error(error.response?.data?.message);
    }
  }
}

export async function verifyEmailApi(data: VerifyEmail) {
  localStorage.clear();
  try {
    const res = await api.post("/auth/verify-otp", data);
    return res.data;
  } catch (error: any) {
    if (typeof error?.response?.data?.message === "object") {
      const errors = error?.response?.data?.message?.message;
      throw new Error(errors ? errors[0] : "Failed to Sign up");
    } else {
      throw new Error(error.response?.data?.message);
    }
  }
}

export async function forgetPasswordApi(data: ForgetPass) {
  localStorage.clear();
  try {
    const res = await api.post("/auth/forget-password", data);
    return res.data;
  } catch (error: any) {
    if (typeof error?.response?.data?.message === "object") {
      const errors = error?.response?.data?.message?.message;
      throw new Error(errors ? errors[0] : "Failed to Sign up");
    } else {
      throw new Error(error.response?.data?.message);
    }
  }
}

export async function changePasswordApi(data: ChangePassword) {
  localStorage.clear();
  try {
    const res = await api.post("/auth/change-password", data);
    return res.data;
  } catch (error: any) {
    if (typeof error?.response?.data?.message === "object") {
      const errors = error?.response?.data?.message?.message;
      throw new Error(errors ? errors[0] : "Failed to Sign up");
    } else {
      throw new Error(error.response?.data?.message);
    }
  }
}

export async function contactUs(data:Object){
  try {
    const res = await api.post('/auth/lifescript/contact-us',data);
    return res;

  } catch (error) {
    throw new Error(error.response?.data?.message);

  }


}

export async function reminder(data:Object){
  try {
    const res = await api.post('/auth/lifescripe/reminder-moment',data);
    return res;

  } catch (error) {
    throw new Error(error.response?.data?.message);

  }


}