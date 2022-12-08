import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getFirestore,
} from "firebase/firestore";
import app from "../../firebase";

export interface Drive {
  id: string;
  companyName: string;
  deadline: Date;
  applyLink: string;
  ctc: string;
  description: string;
}

export interface DriveState {
  drives: Drive[];
  loading: boolean;
}

const initialState: DriveState = {
  drives: [],
  loading: false,
};

const db = getFirestore(app);

export const addNewDrive = createAsyncThunk(
  "addNewDrive",
  async (data: Drive, thunkApi) => {
    console.log(data);
    const docRef = await addDoc(collection(db, "drives"), data);
    console.log("Document written with ID: ", docRef.id);
  }
);

export const deleteDrive = createAsyncThunk(
  "deleteDrive",
  async (data: Drive, thunkApi) => {
    console.log(data);
    await deleteDoc(doc(db, "drives", data.id));
  }
);

export const driveSlice = createSlice({
  name: "drive",
  initialState,
  reducers: {
    setDrives: (state, action) => {
      state.drives = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addNewDrive.pending, (state) => {
        state.loading = true;
      })
      .addCase(addNewDrive.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addNewDrive.rejected, (state, action) => {
        state.loading = false;
      });

    builder
      .addCase(deleteDrive.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteDrive.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteDrive.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const { setDrives } = driveSlice.actions;

export const selectDriveList = (state: RootState) => state.drives.drives;
export const selectLoading = (state: RootState) => state.drives.loading;

export default driveSlice.reducer;
