import contactUsEmail from "../mail/contactFormRes.js";
import mailSender from "../utils/mailSender.js";

export const contactUsController = async (req, res) => {
  try {
    const { email, firstname, lastname, message, phoneNo, countrycode } =
      req.body;

    const emailRes = await mailSender(
      email,
      "Your Data send successfully",
      contactUsEmail(email, firstname, lastname, message, phoneNo, countrycode)
    );

    return res.json({
      success: true,
      message: "Email send successfully",
    });
  } catch (error) {
    console.log("Error in contact us controller");
    console.log("Error message :", error.message);
    return res.json({
      success: false,
      message: error.message || "Something went wrong...",
    });
  }
};
