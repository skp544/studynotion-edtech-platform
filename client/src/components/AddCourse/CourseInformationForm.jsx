import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategoriesApi } from "../../apis/category";
import ChipInput from "./ChipInput";
import Upload from "./Upload";
import RequirementsField from "./RequirementsField";
import IconBtn from "../IconBtn";
import { MdNavigateNext } from "react-icons/md";
import { addCourseApi } from "../../apis/course";
import { COURSE_STATUS } from "../../data";
import { setCourse, setStep } from "../../redux/slices/courseSlice";

const CourseInformationForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { course, editCourse } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getAllCategoriesApi();
      setLoading(false);
      if (!response?.success) {
        return toast.error(response?.message);
      }

      setCourseCategories(response?.data);
    } catch (e) {
      return toast.error(e.message);
    }
  };

  const isFormUpdated = () => {
    const currentValues = getValues();
    // console.log("changes after editing form values:", currentValues)
    if (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory._id !== course.category._id ||
      currentValues.courseRequirements.toString() !==
        course.instructions.toString() ||
      currentValues.courseImage !== course.thumbnail
    ) {
      return true;
    }
    return false;
  };

  const handleOnSubmit = async (data) => {
    console.log(data);
    // if (editCourse) {
    //   // const currentValues = getValues()
    //   // console.log("changes after editing form values:", currentValues)
    //   // console.log("now course:", course)
    //   // console.log("Has Form Changed:", isFormUpdated())
    //   if (isFormUpdated()) {
    //     const currentValues = getValues();
    //     const formData = new FormData();
    //     // console.log(data)
    //     formData.append("courseId", course._id);
    //     if (currentValues.courseTitle !== course.courseName) {
    //       formData.append("courseName", data.courseTitle);
    //     }
    //     if (currentValues.courseShortDesc !== course.courseDescription) {
    //       formData.append("courseDescription", data.courseShortDesc);
    //     }
    //     if (currentValues.coursePrice !== course.price) {
    //       formData.append("price", data.coursePrice);
    //     }
    //     if (currentValues.courseTags.toString() !== course.tag.toString()) {
    //       formData.append("tag", JSON.stringify(data.courseTags));
    //     }
    //     if (currentValues.courseBenefits !== course.whatYouWillLearn) {
    //       formData.append("whatYouWillLearn", data.courseBenefits);
    //     }
    //     if (currentValues.courseCategory._id !== course.category._id) {
    //       formData.append("category", data.courseCategory);
    //     }
    //     if (
    //       currentValues.courseRequirements.toString() !==
    //       course.instructions.toString()
    //     ) {
    //       formData.append(
    //         "instructions",
    //         JSON.stringify(data.courseRequirements)
    //       );
    //     }
    //     if (currentValues.courseImage !== course.thumbnail) {
    //       formData.append("thumbnailImage", data.courseImage);
    //     }
    //     // console.log("Edit Form data: ", formData)
    //     setLoading(true);
    //     const result = await editCourseDetails(formData, token);
    //     setLoading(false);
    //     if (result) {
    //       dispatch(setStep(2));
    //       dispatch(setCourse(result));
    //     }
    //   } else {
    //     toast.error("No changes made to the form");
    //   }
    //   return;
    // }

    const formData = new FormData();
    formData.append("courseName", data.courseTitle);
    formData.append("courseDescription", data.courseShortDesc);
    formData.append("price", data.coursePrice);
    formData.append("tag", JSON.stringify(data.courseTags));
    formData.append("whatYouWillLearn", data.courseBenefits);
    formData.append("category", data.courseCategory);
    formData.append("status", COURSE_STATUS.DRAFT);
    formData.append("instructions", JSON.stringify(data.courseRequirements));
    formData.append("thumbnailImage", data.courseImage);
    setLoading(true);
    const response = await addCourseApi(formData, token);

    setLoading(false);
    if (!response.success) {
      return toast.error(response.message);
    }

    dispatch(setStep(2));
    dispatch(setCourse(response.data));
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <form
      onSubmit={handleSubmit(handleOnSubmit)}
      className="space-y-8 rounded-md border border-richblack-700 bg-richblack-800 p-6"
    >
      {/* course title */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="courseTitle" className="text-sm text-richblack-5">
          Course Title <sup className="text-pink-200">*</sup>
        </label>
        <input
          id="courseTitle"
          placeholder="Enter Course Title"
          {...register("courseTitle", { required: true })}
          className="form-style w-full"
        />
        {errors.courseTitle && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course title is required
          </span>
        )}
      </div>
      {/* course short description */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseShortDesc">
          Course Short Description <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="courseShortDesc"
          placeholder="Enter Description"
          {...register("courseShortDesc", { required: true })}
          className="form-style resize-none resize-x-none min-h-[130px] w-full"
        />
        {errors.courseShortDesc && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Description is required
          </span>
        )}
      </div>

      {/* course price */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="coursePrice">
          Course Price <sup className="text-pink-200">*</sup>
        </label>
        <div className="relative">
          <input
            id="coursePrice"
            placeholder="Enter Course Price"
            {...register("coursePrice", {
              required: true,
              valueAsNumber: true,
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
              },
            })}
            className="form-style w-full !pl-12"
          />
          <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
        </div>
        {errors.coursePrice && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Price is required
          </span>
        )}
      </div>
      {/* course category */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseCategory">
          Course Category <sup className="text-pink-200">*</sup>
        </label>
        <select
          {...register("courseCategory", { required: true })}
          defaultValue=""
          id="courseCategory"
          className="form-style w-full"
        >
          <option value="" disabled>
            Choose a Category
          </option>
          {!loading &&
            courseCategories?.map((category, indx) => (
              <option key={indx} value={category?._id}>
                {category?.name}
              </option>
            ))}
        </select>
        {errors.courseCategory && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Category is required
          </span>
        )}
      </div>

      {/* course tags */}
      <ChipInput
        label="Tags"
        name="courseTags"
        placeholder="Enter Tags and press Enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />

      {/* Course thumbnail image */}
      <Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
      />

      {/* benefits from the course */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseBenefits">
          Benefits of the course <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="courseBenefits"
          placeholder="Enter benefits of the course"
          {...register("courseBenefits", { required: true })}
          className="form-style resize-x-none min-h-[130px] w-full"
        />
        {errors.courseBenefits && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Benefits of the course is required
          </span>
        )}
      </div>

      {/* Requirements/Instructions */}
      <RequirementsField
        name="courseRequirements"
        label="Requirements/Instructions"
        register={register}
        setValue={setValue}
        errors={errors}
        getValues={getValues}
      />

      {/* next button */}
      <div className="flex justify-end gap-x-2">
        {editCourse && (
          <button
            onClick={() => dispatch(setStep(2))}
            disabled={loading}
            className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
          >
            Continue Wihout Saving
          </button>
        )}
        <IconBtn
          disabled={loading}
          text={!editCourse ? "Next" : "Save Changes"}
        >
          <MdNavigateNext />
        </IconBtn>
      </div>
    </form>
  );
};

export default CourseInformationForm;
