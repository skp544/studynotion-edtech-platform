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
import { useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "./data";
import Cart from "./pages/Cart";
import EnrolledCourses from "./pages/EnrolledCourses";
import Instructor from "./pages/Instructor";
import AddCourse from "./pages/AddCourse";
import MyCourses from "./pages/MyCourses";
import EditCourse from "./pages/EditCourse";
import CatalogPage from "./pages/CatalogPage";
import Error from "./pages/Error";
import CourseDetails from "./pages/CourseDetails";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./pages/VideoDetails";

const App = () => {
  const { user } = useSelector((state) => state.profile);

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
        <Route path="catalog/:catalogName" element={<CatalogPage />} />
        <Route path="/update-password/:id" element={<UpdatePassword />} />
        <Route path="/courses/:courseId" element={<CourseDetails />} />
        {/* ABOUT */}
        <Route path="/about" element={<About />} />
        {/* CONTACT */}
        <Route path="/contact" element={<ContactPage />} />
        {/* DASHBOARD */}
        <Route element={<Dashboard />}>
          <Route path="/dashboard/my-profile" element={<MyProfile />} />

          <Route path="dashboard/settings" element={<Settings />} />

          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route path="dashboard/cart" element={<Cart />} />
              <Route
                path="dashboard/enrolled-courses"
                element={<EnrolledCourses />}
              />
            </>
          )}

          {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route path="dashboard/instructor" element={<Instructor />} />
              <Route path="dashboard/add-course" element={<AddCourse />} />
              <Route path="dashboard/my-courses" element={<MyCourses />} />
              <Route
                path="dashboard/edit-course/:courseId"
                element={<EditCourse />}
              />
            </>
          )}
        </Route>
        <Route element={<ViewCourse />}>
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route
                path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                element={<VideoDetails />}
              />
            </>
          )}
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
};

export default App;
