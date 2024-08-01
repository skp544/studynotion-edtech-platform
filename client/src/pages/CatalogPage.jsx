import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Error from "../components/Error";
import {
  getAllCategoriesApi,
  getCategoryPageDetailsApi,
} from "../apis/category";
import toast from "react-hot-toast";
import CourseSlider from "../components/CourseSlider";
import Footer from "../components/Footer";
import CourseCardCatalog from "../components/CourseCardCatalog";

const CatalogPage = () => {
  // const { loading } = useSelector((state) => state.profile);
  const [loading, setLoading] = useState(false);
  const { catalogName } = useParams();
  const [active, setActive] = useState(1);
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");

  const fetchDataForCategories = async () => {
    const response = await getAllCategoriesApi();

    if (!response.success) {
      return toast.error(response.message);
    }

    const category_Id = response?.data?.filter(
      (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
    )[0]._id;

    setCategoryId(category_Id);
  };

  const fetchDataForGetCategoryDetails = async () => {
    const formData = {
      categoryId: categoryId,
    };

    const response = await getCategoryPageDetailsApi(formData);

    if (!response.success) {
      return toast.error(response.message);
    }

    setCatalogPageData(response?.data);
  };

  useEffect(() => {
    fetchDataForCategories();
  }, [catalogName]);

  useEffect(() => {
    if (!categoryId) {
      return;
    }
    fetchDataForGetCategoryDetails();
  }, [categoryId]);

  if (loading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem]) place-items-center">
        <div className="spinner" />
      </div>
    );
  }

  // if (!loading) {
  //   return <Error />;
  // }

  return (
    <>
      {/* Hero Section */}
      <div className="box-content bg-richblack-800 px-4">
        <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent">
          <p className="text-sm text-richblack-300">
            {`Home / Catalog /  `}
            <span className="text-yellow-25">
              {catalogPageData?.selectedCategory?.name}
            </span>
          </p>
          <p className=" text-3xl text-richblack-5">
            {catalogPageData?.selectedCategory?.name}
          </p>
          <p className="max-w-[870px] text-richblack-200">
            {catalogPageData?.selectedCategory?.description}
          </p>
        </div>
      </div>

      {/* section 1 */}
      <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="section_heading">Courses to get you started</div>
        <div className="my-4 flex border-b border-b-richblack-600 text-sm">
          <p
            className={`px-4 py-2 ${
              active === 1
                ? "border-b border-b-yellow-25 text-yellow-25"
                : "text-richblack-50"
            } cursor-pointer`}
            onClick={() => setActive(1)}
          >
            Most Popular
          </p>
          <p
            className={`px-4 py-2 ${
              active === 2
                ? "border-b border-b-yellow-25 text-yellow-25"
                : "text-richblack-50"
            } cursor-pointer`}
            onClick={() => setActive(2)}
          >
            New
          </p>
        </div>
        <div>
          <CourseSlider courses={catalogPageData?.selectedCategory?.course} />
        </div>
      </div>

      {/* section 2 */}

      {catalogPageData?.differentCategory?.course.length > 0 && (
        <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
          <div className="section_heading">
            Top courses in {catalogPageData?.differentCategory?.courses}
          </div>
          <div className="py-8">
            <CourseSlider
              courses={catalogPageData?.differentCategory?.course}
            />
          </div>
        </div>
      )}

      {/* section 3 */}
      <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <p className="section_heading">Frequently Bought</p>
        <div className="py-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {catalogPageData?.mostSellingCourses
              ?.slice(0, 4)
              .map((course, i) => (
                <CourseCardCatalog course={course} key={i} height="h-[250px]" />
              ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CatalogPage;
