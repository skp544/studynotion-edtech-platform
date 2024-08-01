import React, { useState } from "react";
import { Link } from "react-router-dom";
import RatingStars from "./RatingStars";

const CourseCardCatalog = ({ course, height }) => {
  const [avgReviewCount, setAvgReviewCount] = useState(0);

  return (
    <>
      <Link to={`/courses/${course._id}`}>
        <div className="">
          <div className="rounded-lg">
            <img
              src={course.thumbnail}
              alt={course.courseName}
              className={`${height} w-[400px] rounded-xl object-cover`}
            />
          </div>
          <div className="flex flex-col gap-2 px-1 py-3">
            <p className=" text-xl text-richblack-5">{course.courseName}</p>
            <p className=" text-sm text-richblack-50">
              {course?.instructor?.firstName} {course?.instructor?.lastName}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-yellow-5">{avgReviewCount}</span>
              <RatingStars reviewCount={avgReviewCount} />
              <span className="text-richblack-400">
                {course?.ratingAndReviews?.length}
              </span>
            </div>
            <p className="text-xl text-richblack-5">Rs. {course?.price}</p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default CourseCardCatalog;
