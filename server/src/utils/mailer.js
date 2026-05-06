const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendOTP = async (email, otp) => {
  try {
    // Read HTML template
    const templatePath = path.join(__dirname, "../../public/email_send_otp.html");
    let htmlContent = fs.readFileSync(templatePath, "utf8");

    // Get current date (Month, Year)
    const now = new Date();
    const dateStr = now.toLocaleString('en-US', { month: 'long', year: 'numeric' });

    // Replace placeholders
    htmlContent = htmlContent.replace("123456", otp);
    htmlContent = htmlContent.replace(/\[EMAIL_ADDRESS\]/g, process.env.EMAIL_USER);
    htmlContent = htmlContent.replace("April, 2026", dateStr);

    await transporter.sendMail({
      from: `"Secure Login" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Verification Code",
      text: `Your OTP is: ${otp}`, // Fallback plain text
      html: htmlContent
    });
  } catch (error) {
    console.error("Error sending email via Nodemailer:", error);
    throw error;
  }
};

module.exports = sendOTP;