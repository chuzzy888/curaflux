import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

interface User {
  id: string;
  email: string;
  password: string;
}

interface AuthState {
  user: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

interface LoginForm {
  email: string;
  password: string;
}

interface VerificationForm {
  formData: FormData;
  id: string;
}

interface LoginResponse {
  token: string;
  message: User;
  success: boolean;
}

export const loginUser = createAsyncThunk<
  User,
  LoginForm,
  { rejectValue: string }
>("auth/loginUser", async (form, { rejectWithValue }) => {
  try {
    const { data } = await axios.post<LoginResponse>(
      `${import.meta.env.VITE_BASE_URL}/auth/signin`,
      form
    );

    Cookies.set("token", data.token);

  if (data.success === true) {
    window.location.href = "/";
  }
    

    return data.message;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(
        error.response.data.message || "An error occurred"
      );
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

export const registerUser = createAsyncThunk<
  User,
  LoginForm,
  { rejectValue: string }
>("auth/registerUser", async (form, { rejectWithValue }) => {
  try {
    const { data } = await axios.post<LoginResponse>(
      `${import.meta.env.VITE_BASE_URL}/auth/signup`,
      form
    );

    Cookies.set("token", data.token);

    // setTimeout(() => {
    //   window.location.href = "/verify";
    // }, 2000);

    return data.message;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(
        error.response.data.message || "An error occurred"
      );
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

export const verifyUser = createAsyncThunk<
  User,
  VerificationForm,
  { rejectValue: string }
>("auth/verifyUser", async ({ formData, id }, { rejectWithValue }) => {
  try {
    const { data } = await axios.patch<LoginResponse>(
      `${import.meta.env.VITE_BASE_URL}/auth/verify/${id}`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    Cookies.set("verified", "true");

    if (data.success === true) {
      window.location.href = "/";
    }

    return data.message;

    throw new Error("No data received from server");
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(
        error.response.data.message || "An error occurred"
      );
    }
    return rejectWithValue("Error uploading verification");
  }
});

const initialState: AuthState = {
  user: null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.status = "idle";
      state.error = null;
      Cookies.remove("token");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // handling Login
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.user = null;
        state.error = action.payload || "An error occurred";
      })
      // handling registered
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.user = null;
        state.error = action.payload || "An error occurred";
      })
      // handling verifications
      .addCase(verifyUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(verifyUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.error = null;
      })
      .addCase(verifyUser.rejected, (state, action) => {
        state.status = "failed";
        state.user = null;
        state.error = action.payload || "An error occurred";
      });
  },
});

export const { logout, clearError } = authSlice.actions;

export default authSlice.reducer;
