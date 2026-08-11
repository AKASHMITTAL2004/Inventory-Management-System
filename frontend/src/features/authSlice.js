import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../lib/axios";
import toast from 'react-hot-toast';

const initialState = {
  Authuser: JSON.parse(localStorage.getItem("user")) || null, 
  isUserSignup: false,
  staffuser: null,
  manageruser: null,
  adminuser: null,
  isUserLogin: false,
  token: localStorage.getItem("token") || null,
  isupdateProfile: false,
};

// Signup Thunk
export const signup = createAsyncThunk(
  "auth/signup",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("auth/signup", credentials, { withCredentials: true });
      const user = response.data.savedUser || response.data.user;
      const token = response.data.token || user?.token;

      if (user) localStorage.setItem("user", JSON.stringify(user)); 
      if (token) localStorage.setItem("token", token); 

      return { user, token, message: response.data.message };
    } catch (error) {
  return rejectWithValue(
    error.response?.data?.message || 
    error.response?.data?.error || 
    "Signup failed"
  );
}
  }
);

// Login Thunk
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("auth/login", credentials, { withCredentials: true });
      const user = response.data.user;
      const token = response.data.token || user?.token;

      if (user) localStorage.setItem("user", JSON.stringify(user)); 
      if (token) localStorage.setItem("token", token); 

      return { user, token, message: response.data.message };
    } catch (error) {
  return rejectWithValue(
    error.response?.data?.message || 
    error.response?.data?.error || 
    "Login failed"
  );
}
  }
);

// Logout Thunk
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("authUser");
      return null;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  }
);

// Update Profile Thunk
export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (base64Image, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        return rejectWithValue('User not authenticated. Please log in again.');
      }

      const response = await axiosInstance.put(
        'auth/updateProfile',
        { ProfilePic: base64Image },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedUser = response.data.updatedUser || response.data.user;

      if (updatedUser) {
        localStorage.setItem('user', JSON.stringify(updatedUser));
        return updatedUser;
      } else {
        throw new Error('Unexpected response structure');
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update profile'
      );
    }
  }
);

// Get Staff Users (FIXED GET SYNTAX)
export const staffUser = createAsyncThunk('auth/staffuser', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get('auth/staffuser', { withCredentials: true });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to get staff users');
  }
});

// Get Manager Users (FIXED GET SYNTAX)
export const managerUser = createAsyncThunk('auth/manageruser', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get('auth/manageruser', { withCredentials: true });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to get manager users');
  }
});

// Get Admin Users (FIXED GET SYNTAX)
export const adminUser = createAsyncThunk('auth/adminuser', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get('auth/adminuser', { withCredentials: true });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to get admin users');
  }
});

// Remove User (FIXED DELETE SYNTAX)
export const removeusers = createAsyncThunk("auth/removeuser", async (UserId, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.delete(`auth/removeuser/${UserId}`, { withCredentials: true });
    return { UserId, data: response.data };
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to delete user');
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Signup Cases
      .addCase(signup.pending, (state) => {
        state.isUserSignup = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isUserSignup = false;
        state.Authuser = action.payload.user; 
        state.token = action.payload.token; 
        toast.success(action.payload.message || "Account created successfully!");
      })
      .addCase(signup.rejected, (state, action) => {
        state.isUserSignup = false;
        toast.error(action.payload || "Signup failed!");
      })

      // Login Cases
      .addCase(login.pending, (state) => {
        state.isUserLogin = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isUserLogin = false;
        state.Authuser = action.payload.user; 
        state.token = action.payload.token; 
        toast.success("Logged in successfully!");
      })
      .addCase(login.rejected, (state, action) => {
        state.isUserLogin = false;
        toast.error(action.payload || "Login failed!");
      })

      // Logout Cases
      .addCase(logout.fulfilled, (state) => {
        state.Authuser = null;
        state.token = null;
        toast.success("Successfully logged out!");
      })

      // Update Profile Cases
      .addCase(updateProfile.pending, (state) => {
        state.isupdateProfile = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isupdateProfile = false;
        state.Authuser = action.payload; // Fixed nesting bug
        toast.success("Profile updated successfully!");
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isupdateProfile = false;
        toast.error(action.payload || "Profile update failed!");
      })

      // Staff, Manager, Admin & Remove Cases
      .addCase(staffUser.fulfilled, (state, action) => {
        state.staffuser = action.payload;
      })
      .addCase(managerUser.fulfilled, (state, action) => {
        state.manageruser = action.payload;
      })
      .addCase(adminUser.fulfilled, (state, action) => {
        state.adminuser = action.payload;
      });
  },
});

export default authSlice.reducer;
