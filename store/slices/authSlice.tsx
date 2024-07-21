import {
  ChangePassword,
  ForgetPass,
  LoginData,
  SignupData,
  UpdatePasswordData,
  UserData
} from "@/interface/authInterface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  changePasswordApi,
  createLuluShippingApi,
  facebookLoginApi,
  facebookSignupApi,
  forgetPasswordApi,
  getBookInteriorApi,
  getLuluBalanceApi,
  getLuluShippingApi,
  getUserProfileApi,
  googleLoginApi,
  googleSignupApi,
  loginApi,
  luluCallApi,
  signupApi,
  signupApiWithBuy,
  signupApiWithGift,
  signupApiWithInAppGiftApi,
  stripeDoneApi,
  stripPaymentLuluApi,
  updateLuluShippingApi,
  updatePasswordApi,
  updateUserProfileApi,
  verifyEmailApi,
  contactUs,reminder
} from "../api/authApi";

interface State {
  luluBalance: any;
  luluData: any;
  user: any;
  luluPaymentStatus: string;
  socialUser: any;
}

const initialState: State = {
  luluBalance: {},
  user: {},
  luluData: {},
  luluPaymentStatus: "",
  socialUser: null,
};

export const changePassword = createAsyncThunk<UserData, ChangePassword>(
  "user/verify-email",
  async (data) => {
    try {
      const response = await changePasswordApi(data);
      return response;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);

export const setSocialUser = createAsyncThunk<any, any>(
  "user/social-user",
  async (data) => {
    try {
      return data;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);

export const luluCall = createAsyncThunk<any, any>(
  "user/lulu-call",
  async (data: any) => {
    try {
      const response = await luluCallApi(data);
      return response;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);

export const updateUserProfile = createAsyncThunk<any, any>(
  "user/user-profile",
  async (data) => {
    try {
      const response = await updateUserProfileApi(data);

      return response;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);

export const contact = createAsyncThunk<any, object>(
  "user/contactUs",
  async (data, { rejectWithValue }) => {
    try {
      const response = await contactUs(data);
      return response;
    } catch (error: any) {

      return rejectWithValue(error.message);
    }
  }
);
export const reminderForm = createAsyncThunk<any, object>(
  "user/reminder",
  async (data, { rejectWithValue }) => {
    try {
      const response = await reminder(data);
      console.log(response)
      return response;
    } catch (error: any) {

      return rejectWithValue(error.message);
    }
  }
);

export const updateLuluPaymentStatus = createAsyncThunk<string, string>(
  "auth/update-lulu-payment-status",
  async (status: string) => {
    return status;
  }
);

export const getUserProfile = createAsyncThunk<any[], void>(
  "user/get-user-profile",
  async () => {
    try {
      const response = await getUserProfileApi();
      return response;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);

export const getBookInterior = createAsyncThunk<any[], void>(
  "user/get-book-interior",
  async () => {
    try {
      const response = await getBookInteriorApi();
      return response;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);

export const getLuluShipping = createAsyncThunk<any[], void>(
  "auth/shipping",
  async () => {
    try {
      const response = await getLuluShippingApi();
      return response;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);

export const createLuluShipping = createAsyncThunk<UserData, any>(
  "auth/create-shipping",
  async (data) => {
    try {
      const response = await createLuluShippingApi(data);
      return response;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);

export const updateLuluShipping = createAsyncThunk<UserData, any>(
  "auth/update-shipping",
  async (data) => {
    try {
      const response = await updateLuluShippingApi(data);
      return response;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);

export const stripPaymentLulu = createAsyncThunk<UserData, any>(
  "auth/payment-lulu-shipping",
  async (data) => {
    try {
      const response = await stripPaymentLuluApi(data);
      return response;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);

export const getLuluBalance = createAsyncThunk<any[], void>(
  "user/get-lulu-balance",
  async () => {
    try {
      const response = await getLuluBalanceApi();
      return response;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);

export const forgetPassword = createAsyncThunk<UserData, ForgetPass>(
  "user/verify-email",
  async (data) => {
    try {
      const response = await forgetPasswordApi(data);
      return response;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);

export const verifyEmail = createAsyncThunk<UserData, any>(
  "user/verify-email",
  async (data) => {
    try {
      const response = await verifyEmailApi(data);

      return response;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);

export const login = createAsyncThunk<UserData, LoginData>(
  "auth/login",
  async (data) => {
    try {
      const response = await loginApi(data);
      return response;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);

export const stripeDone = createAsyncThunk<any[], void>(
  "auth/stripe-done",
  async () => {
    try {
      const response = await stripeDoneApi();
      return response;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);

export const googleLogin = createAsyncThunk<UserData, any>(
  "auth/googleLogin",
  async (data: { credential: string ,type:string }) => {
    try {
      const response = await googleLoginApi(data);
      return response;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);

export const googleSignup = createAsyncThunk<UserData, any>(
  "auth/googleSignup",
  async (data: { credential: string, type:string }) => {
    try {
      const response = await googleSignupApi(data);
      return response;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);

export const facebookLogin = createAsyncThunk<UserData, any>(
  "auth/facebookLogin",
  async (data: { credential: string }) => {
    try {
      const response = await facebookLoginApi(data);
      return response;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);

export const facebookSignup = createAsyncThunk<UserData, any>(
  "auth/facebookSignup",
  async (data: { credential: string }) => {
    try {
      const response = await facebookSignupApi(data);
      return response;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);

export const signup = createAsyncThunk<UserData, SignupData>(
  "auth/signup",
  async (data) => {
    try {
      const response = await signupApi(data);
      return response;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);

export const signupWithBuy = createAsyncThunk<UserData, SignupData>(
  "auth/signup",
  async (data) => {
    try {
      const response = await signupApiWithBuy(data);
      return response;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);
export const signupWithGift = createAsyncThunk<UserData, any>(
  "auth/create/gift",
  async (data: any) => {
    try {
      const response = await signupApiWithGift(data);
      return response;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);
export const signupWithInAppGift = createAsyncThunk<UserData, any>(
  "auth/create/gift/in-App",
  async (data: any) => {
    try {
      const response = await signupApiWithInAppGiftApi(data);
      return response;
    } catch (error: any) {
      throw new Error(error.props);
    }
  }
);

export const updatePassword = createAsyncThunk<UserData, UpdatePasswordData>(
  "auth/changePassword",
  async (data) => {
    try {
      const response = await updatePasswordApi(data);
      return response;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);

export const logout = () => {
  localStorage.clear();
  // signOut();
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(getLuluBalance.fulfilled, (state, action) => {
      state.luluBalance = action.payload;
    });
    builder.addCase(getLuluShipping.fulfilled, (state, action) => {
      state.luluData = action.payload;
    });
    builder.addCase(updateLuluPaymentStatus.fulfilled, (state, action) => {
      state.luluPaymentStatus = action.payload;
      localStorage.setItem("luluStatus", action.payload);
    });

    builder.addCase(setSocialUser.fulfilled, (state, action) => {
      state.socialUser = action.payload;
    });
  },
});

export const { } = authSlice.actions;

export const selectUser = (state: { auth: any }) => state.auth.user;

export const selectSocialUser = (state: { auth: any }) => state.auth.socialUser;

export const selectLuluBalance = (state: { auth: any }) =>
  state.auth.luluBalance;

export const selectLuluData = (state: { auth: any }) => state.auth.luluData;

export const selectLuluPaymentStatus = (state: { auth: any }) =>
  state.auth.luluPaymentStatus;

export default authSlice.reducer;
