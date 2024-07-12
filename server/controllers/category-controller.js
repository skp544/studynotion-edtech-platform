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
    const allCategories = await Category.find(
      {},
      { name: true, description: true }
    );

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

    const categoryDetails = await Category.findById(categoryId)
      .populate("Courses")
      .exec();

    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Data not found!",
      });
    }

    const differentCategories = await Category.find({
      _id: { $ne: categoryId },
    })
      .populate("courses")
      .exec();

    return res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differentCategories,
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
