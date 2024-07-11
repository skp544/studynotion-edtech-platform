import nodemailer from "nodemailer";

const mailSender = async (email, title, body) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    let info = await transporter.sendMail({
      from: "Studynotion || By Shubham",
      to: email,
      subject: title,
      html: body,
    });

    console.log("mail info", info);
    return info;
  } catch (error) {
    console.log("Failed to send email!");
    console.log(err);
  }
};

export default mailSender;
