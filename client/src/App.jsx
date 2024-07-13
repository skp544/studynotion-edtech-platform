import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
    </div>
  );
};

export default App;
