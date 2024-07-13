import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  user: JSON.parse(localStorage.getItem("userInfo")) || null,
  token: localStorage.getItem("userToken") || "",
  loading: false,
  error: "",
};

// Async thunk for registration
export const registration = createAsyncThunk(
  "user/registration",
  async (body) => {
    const res = await fetch("http://localhost:4000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return await res.json();
  }
);

// Async thunk for login
export const login = createAsyncThunk("user/login", async (body) => {
  const res = await fetch("http://localhost:4000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  console.log("dataToken:", data.token);
  if (data.token) {
    localStorage.setItem("userToken", data.token);
    localStorage.setItem("userInfo", JSON.stringify(data.user));
  }

  return data;
});

// Async thunk for forgot password
export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (body) => {
    const res = await fetch("http://localhost:4000/auth/forgotpassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return await res.json();
  }
);

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.message = "";
      state.user = null;
      state.token = "";
      state.loading = false;
      state.error = "";
      localStorage.removeItem("userToken");
      localStorage.removeItem("userInfo");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registration.pending, (state) => {
        state.loading = true;
      })
      .addCase(registration.fulfilled, (state, { payload }) => {
        state.loading = false;
        const { error, message } = payload;
        if (error) {
          state.error = error;
        } else {
          state.message = message;
        }
      })
      .addCase(registration.rejected, (state) => {
        state.loading = false;
        state.error = "Registration failed";
      })

      //   login extra reducers
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.loading = false;
        const { message, user, token, error } = payload;
        if (error) {
          state.error = error;
        } else {
          state.user = user;
          state.message = message;
          state.token = token;
        }
        console.log("user:", user);
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
        state.error = "Login Failed...";
      })

      //   forgot password extra reducers
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, { payload }) => {
        state.loading = false;
        const { message, error, success } = payload;
        console.log("Message:", success, error, message);
        if (error) {
          state.error = error;
        } else {
          state.message = message;
        }
      })
      .addCase(forgotPassword.rejected, (state) => {
        state.loading = false;
        state.error = "Forgot Password request failed...";
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
