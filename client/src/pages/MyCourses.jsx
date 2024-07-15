import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../components/IconBtn";
import { VscAdd } from "react-icons/vsc";
import CoursesTable from "../components/Dashboard/CoursesTable";
import { getInstructorCourseApi } from "../apis/course";
import toast from "react-hot-toast";

const MyCourses = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  const fetchData = async () => {
    const response = await getInstructorCourseApi(token);

    if (!response.success) {
      return toast.error(response.message);
    }

    setCourses(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="mb-14 flex items-center justify-between">
        <h1 className=" text-3xl font-medium text-richblack-5">My Courses</h1>

        <IconBtn
          text="Add Course"
          onclick={() => navigate("/dashboard/add-course")}
        >
          <VscAdd />
        </IconBtn>
      </div>
      {courses && <CoursesTable courses={courses} setCourses={setCourses} />}
    </>
  );
};

export default MyCourses;
