import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
  User,
} from "firebase/auth";
import { RootState } from "../../app/store";
import app from "../../firebase";

export interface AuthState {
  user: User | null;
  loading: boolean;
}

const auth = getAuth(app);
const initialState: AuthState = {
  user: auth.currentUser,
  loading: true,
};

export const authenticate = createAsyncThunk<
  User,
  { email: string; password: string }
>(
  "authenticate",
  async (data: { email: string; password: string }, thunkApi) => {
    if (auth.currentUser !== null) return auth.currentUser;
    let user: User | null = null;
    let errorMessage: string | null = null;
    await signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        user = userCredential.user;
      })
      .catch((error) => {
        errorMessage = error.message;
      });

    if (user) {
      return user;
    } else {
      return thunkApi.rejectWithValue({
        message: errorMessage || "Unknown error",
      });
    }
  }
);

export const updateUserProfile = createAsyncThunk<
  User,
  { name: string; phone: string }
>(
  "updateUserProfile",
  async (data: { name: string; phone: string }, thunkApi) => {
    if (auth.currentUser === null)
      return thunkApi.rejectWithValue({ message: "User not logged in" });
    let errorMessage: string | null = null;

    await updateProfile(auth.currentUser, {
      displayName: data.name,
      photoURL: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    })
      .then(() => {
        // Profile updated!
        // ...
        console.log("Profile updated!");
      })
      .catch((error) => {
        // An error occurred
        // ...
        console.log("An error occurred");
        errorMessage = error.message;
      });

    if (errorMessage) {
      return thunkApi.rejectWithValue({
        message: errorMessage || "Unknown error",
      });
    }
    return auth.currentUser;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state) => {
      state.user = auth.currentUser;
      state.loading = false;
    },
    logout: (_) => {
      console.log("logout");
      auth.signOut().then(() => {
        window.location.href = "/";
      });
    },
  },
  extraReducers(builder) {
    builder
      .addCase(authenticate.pending, (state, _action) => {
        console.log("pending");
        state.loading = true;
      })
      .addCase(authenticate.fulfilled, (state, action) => {
        console.log("fulfilled");
        state.user = action.payload;
        if (state.user.displayName === null)
          window.location.href = "/profileForm";
        else window.location.href = "/admin/dashboard";
        state.loading = false;
      })
      .addCase(authenticate.rejected, (state, action) => {
        console.log("rejected");
        state.user = null;
      });

    builder
      .addCase(updateUserProfile.pending, (state, _action) => {
        console.log("pending");
        state.loading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        console.log("fulfilled");
        state.user = action.payload;
        window.location.href = "/admin/dashboard";
        state.loading = false;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        console.log("rejected");
        state.user = null;
      });
  },
});

export const { setUser, logout } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;
export const selectLoading = (state: RootState) => state.auth.loading;

export default authSlice.reducer;
