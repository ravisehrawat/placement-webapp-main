import { getAuth } from "firebase/auth";
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { useAppDispatch } from "./app/hooks";
import AdminLayout from "./components/AdminLayout";
import Layout from "./components/Layout";
import { setUser } from "./features/auth/authSlice";
import app from "./firebase";
import Dashboard from "./pages/Dashboard";
import Drives from "./pages/Drives";
import Landing from "./pages/Landing";
import ProfileForm from "./pages/ProfileForm";
import SignupPage from "./pages/SignupPage";
import Students from "./pages/Students";

function App() {
  const auth = getAuth(app);
  const dispatch = useAppDispatch();
  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      dispatch(setUser());
    });
  }, [auth, dispatch]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
        </Route>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/profileForm" element={<ProfileForm />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/drives" element={<Drives />} />
          <Route path="/admin/students" element={<Students />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
