import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

import { Table } from "flowbite-react";
import { formattedDate } from "../../helper";
import { COURSE_STATUS } from "../../data";
import { FaCheck } from "react-icons/fa";
import { HiClock } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit2 } from "react-icons/fi";
import ConfirmationModal from "../ConfirmationModal";
// import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";

const CoursesTable = ({ courses, setCourses }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const TRUNCATE_LENGTH = 30;

  return (
    <>
      <Table className="rounded-xl border border-richblack-800 ">
        <Table.Head className="flex gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2">
          <Table.HeadCell className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">
            Courses
          </Table.HeadCell>
          <Table.HeadCell className="text-left text-sm font-medium uppercase text-richblack-100">
            Duration
          </Table.HeadCell>
          <Table.HeadCell className="text-left text-sm font-medium uppercase text-richblack-100">
            Price
          </Table.HeadCell>
          <Table.HeadCell className="text-left text-sm font-medium uppercase text-richblack-100">
            Actions
          </Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {courses.length === 0 ? (
            <Table.Row className="py-10 text-center text-2xl font-medium text-richblack-100">
              No Courses Found
            </Table.Row>
          ) : (
            courses.map((course) => (
              <Table.Row className="flex gap-x-10 border-b border-richblack-800 px-6 py-8">
                <Table.Cell className="flex flex-1 gap-x-4">
                  <img
                    src={course?.thumbnail}
                    alt={course?.courseName}
                    className="h-[148px] w-[220px] rounded-lg object-cover"
                  />
                  <div className=" flex flex-col justify-between">
                    <p className="text-lg font-semibold text-richblack-5">
                      {course.courseName}
                    </p>
                    <p className="text-xs text-richblack-300">
                      {course.courseDescription.split(" ").length >
                      TRUNCATE_LENGTH
                        ? course.courseDescription
                            .split(" ")
                            .slice(0, TRUNCATE_LENGTH)
                            .join(" ") + "..."
                        : course.courseDescription}
                    </p>
                    <p className="text-[12px] text-white">
                      Created: {formattedDate(course?.createdAt)}
                    </p>
                    {course?.status === COURSE_STATUS.DRAFT ? (
                      <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100">
                        <HiClock size={14} />
                        Drafted
                      </p>
                    ) : (
                      <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100">
                        <div className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richblack-700">
                          <FaCheck size={8} />
                        </div>
                        Published
                      </p>
                    )}
                  </div>
                </Table.Cell>
                <Table.Cell className="text-sm font-medium text-richblack-100">
                  2hr 30min
                </Table.Cell>
                <Table.Cell className="text-sm font-medium text-richblack-100">
                  ₹ {course?.price}
                </Table.Cell>
                <Table.Cell className="text-sm font-medium text-richblack-100">
                  <button
                    disabled={loading}
                    onClick={() => {
                      navigate(`/dashboard/edit-course/${course?._id}`);
                    }}
                    title="Edit"
                    className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                  >
                    <FiEdit2 size={20} />
                  </button>
                  <button
                    disabled={loading}
                    onClick={() => {
                      setConfirmationModal({
                        text1: "Do you want to delete this course?",
                        text2:
                          "All the data related to this course will be deleted",
                        btn1Text: !loading ? "Delete" : "Loading...  ",
                        btn2Text: "Cancel",
                        btn1Handler: !loading
                          ? () => handleCourseDelete(course._id)
                          : () => {},
                        btn2Handler: !loading
                          ? () => setConfirmationModal(null)
                          : () => {},
                      });
                    }}
                    title="Delete"
                    className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                  >
                    <RiDeleteBin6Line size={20} />
                  </button>
                </Table.Cell>
              </Table.Row>
            ))
          )}{" "}
        </Table.Body>
      </Table>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
};

export default CoursesTable;
