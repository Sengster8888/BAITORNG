const sendEmailOTP = require("../../utils/mailer");
const { sendVerificationCode, checkVerificationCode } = require("../../utils/smsService");
const userModel = require("./auth.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const registerService = async (userData) => {
  const { phone, password, confirmPassword, name, email, role } = userData;

  if (password !== confirmPassword) {
    throw new Error("Passwords do not match");
  }

  // Check if user already exists
  const existingUser = await userModel.findUserByPhone(phone);
  if (existingUser) {
    throw new Error("User with this phone number already exists");
  }

  if (email) {
    const existingEmail = await userModel.findUserByEmail(email);
    if (existingEmail) {
      throw new Error("User with this email already exists");
    }
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const password_hash = await bcrypt.hash(password, salt);

  // Save user (unverified initially)
  const newUser = await userModel.saveUser({
    phone,
    password_hash,
    name,
    email: email || null, // email is optional
    role: role || 'farmer',
    is_verified: false
  });

  // Send OTP to phone via Twilio
  try {
    await sendVerificationCode(phone);
  } catch (err) {
    console.error("Failed to send phone verification", err);
    // Even if SMS fails, user is created, but they need to request OTP again later
  }

  const token = generateToken({ id: newUser.id, role: newUser.role });

  return { 
    user: newUser, 
    token, 
    message: "Registration successful. Please check your phone for verification code."
  };
};

const verifyPhoneService = async (phone, otp) => {
  const user = await userModel.findUserByPhone(phone);
  
  if (!user) {
    throw new Error("User not found");
  }

  if (user.is_verified) {
    return { message: "Account is already verified" };
  }

  // Check verification code via Twilio
  const verificationCheck = await checkVerificationCode(phone, otp);

  if (verificationCheck.status !== "approved") {
    throw new Error("Invalid or expired verification code");
  }

  // Update user to verified
  await userModel.updateUser(user.id, {
    is_verified: true
  });

  return { message: "Phone verified successfully" };
};

const loginService = async (identifier, password) => {
  // Find user by phone or email
  let user = await userModel.findUserByPhone(identifier);
  if (!user) {
    user = await userModel.findUserByEmail(identifier);
  }

  if (!user) {
    throw new Error("Invalid phone/email or password");
  }

  // Check password
  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    throw new Error("Invalid phone/email or password");
  }

  const token = generateToken({ id: user.id, role: user.role });

  return { user, token };
};

const forgotPasswordService = async (phone) => {
  const user = await userModel.findUserByPhone(phone);
  if (!user) {
    throw new Error("User with this phone number not found");
  }

  // Send OTP to phone via Twilio for password reset
  try {
    await sendVerificationCode(phone);
  } catch (err) {
    console.error("Failed to send reset OTP", err);
    throw new Error("Failed to send verification code to your phone");
  }

  return { message: "Verification code sent to your phone" };
};

const resetPasswordService = async (phone, otp, newPassword) => {
  const user = await userModel.findUserByPhone(phone);
  if (!user) {
    throw new Error("User not found");
  }

  // Verify OTP via Twilio
  const verificationCheck = await checkVerificationCode(phone, otp);
  if (verificationCheck.status !== "approved") {
    throw new Error("Invalid or expired verification code");
  }

  // Hash new password
  const salt = await bcrypt.genSalt(10);
  const password_hash = await bcrypt.hash(newPassword, salt);

  // Update password
  await userModel.updateUser(user.id, {
    password_hash
  });

  return { message: "Password has been reset successfully" };
};

module.exports = {
  registerService,
  loginService,
  forgotPasswordService,
  resetPasswordService,
  verifyPhoneService
};