import SignIn from "./components/SignIn";
import Signup from "./components/Signup";
import OTPVerification from "./components/OTPVerification";
import ForgotPassword from "./components/ForgotPassword";
import ChangePassword from "./components/ChangePassword";
import {Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css"


export default function App() {
  return (
    <>
    {/* <Navbar /> */}
    <Routes>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/login" element={<SignIn />}/>
        <Route path="/otp-verification" element={<OTPVerification />}/>
        <Route path="/forgot-password" element={<ForgotPassword />}/>
        <Route path="/change-password" element={<ChangePassword />}/>
    </Routes>
    </>
  )
}