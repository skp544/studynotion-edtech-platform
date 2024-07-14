import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Navbar from "./components/Navbar";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import VerifyEmail from "./pages/VerifyEmail";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./pages/MyProfile";
import UpdatePassword from "./pages/UpdatePassword";
import About from "./pages/About";
import ContactPage from "./pages/ContactPage";
import Settings from "./pages/Settings";

const App = () => {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />
      <Routes>
        {/* AUTH */}

        <Route path="/" element={<Homepage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

        <Route path="/update-password/:id" element={<UpdatePassword />} />

        {/* ABOUT */}

        <Route path="/about" element={<About />} />

        {/* CONTACT */}
        <Route path="/contact" element={<ContactPage />} />

        {/* DASHBOARD */}
        <Route element={<Dashboard />}>
          <Route path="/dashboard/my-profile" element={<MyProfile />} />

          <Route path="dashboard/settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
};

export default App;
