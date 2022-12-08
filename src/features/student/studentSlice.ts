import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { deleteDoc, doc, getFirestore, setDoc } from "firebase/firestore";
import app, { secondaryApp } from "../../firebase";

import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";

export interface Student {
  id: string;
  name: string;
  batch: string;
  branch: string;
  rollNo: string;
  email: string;
  photoURL: string;
}

export interface StudentState {
  students: Student[];
  loading: boolean;
}

const initialState: StudentState = {
  students: [],
  loading: false,
};

const db = getFirestore(app);
const auth = getAuth(secondaryApp);

export const addNewStudent = createAsyncThunk(
  "addNewStudent",
  async (data: { student: Student; password: string }, thunkApi) => {
    console.log(data);

    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        data.student.email,
        data.password
      );
      await updateProfile(user.user, {
        displayName: data.student.name,
      });
      await setDoc(
        doc(db, "students", user.user.uid),
        data.student
      );
      console.log("Document written with ID: ", user.user.uid);
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteStudent = createAsyncThunk(
  "deleteStudent",
  async (data: Student, thunkApi) => {
    console.log(data);

    await deleteDoc(doc(db, "students", data.id));
  }
);

export const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    setStudents: (state, action) => {
      state.students = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addNewStudent.pending, (state) => {
        state.loading = true;
      })
      .addCase(addNewStudent.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addNewStudent.rejected, (state, action) => {
        state.loading = false;
      });

    builder
      .addCase(deleteStudent.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const { setStudents } = studentSlice.actions;

export const selectStudentList = (state: RootState) => state.student.students;
export const selectLoading = (state: RootState) => state.student.loading;

export default studentSlice.reducer;
