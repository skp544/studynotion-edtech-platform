import { getRandomInt } from "../helper/index.js";
import Category from "../models/category-model.js";

export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const categoryDetails = await Category.create({ name, description });

    return res.json({
      success: true,
      message: "Category Created!",
      data: categoryDetails,
    });
  } catch (error) {
    console.log("Error in category controller");
    return res.status(500).json({
      success: false,
      message: error.message || "Category Not Created",
    });
  }
};

export const showAllCategories = async (req, res) => {
  try {
    const allCategories = await Category.find();

    return res.status(200).json({
      success: true,
      message: "All categories are fetched!",
      data: allCategories,
    });
  } catch (error) {
    console.log("Error in show all category controller");
    return res.status(500).json({
      success: false,
      message: error.message || "Category Not Fetched",
    });
  }
};

export const categoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body;

    // get Courses for the specified category
    const selectedCategory = await Category.findById(categoryId)
      .populate({
        path: "course",
        match: { status: "Published" },
        populate: "ratingAndReviews",
      })
      .exec();

    // handle the case when the category is not found
    if (!selectedCategory) {
      return res.status(404).json({
        success: false,
        message: "Data not found!",
      });
    }

    // handle the case when the category is not found

    if (!selectedCategory.course.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Courses Found for the selected category",
      });
    }

    // get courses for other categories

    const categoriesExceptSelected = await Category.find({
      _id: { $ne: categoryId },
    });

    let differentCategory = await Category.findOne(
      categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
        ._id
    )
      .populate({
        path: "course",
        match: { status: "Published" },
      })
      .exec();

    // get top-selling courses across all categories

    const allCategories = await Category.find()
      .populate({
        path: "course",
        match: { status: "Published" },
        populate: {
          path: "instructor",
        },
      })
      .exec();

    const allCourses = allCategories.flatMap((category) => category.course);
    const mostSellingCourses = allCourses
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 10);

    return res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differentCategory,
        mostSellingCourses,
      },
    });
  } catch (error) {
    console.log("Error in category page  category controller");
    return res.status(500).json({
      success: false,
      message: error.message || "Category Details Not Fetched",
    });
  }
};
