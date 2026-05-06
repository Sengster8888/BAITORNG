const authService = require("./auth.service");

const register = async (req, res) => {
  try {
    const result = await authService.registerService(req.body);
    res.status(201).json({
      message: "User registered successfully",
      ...result
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { identifier, password } = req.body; // identifier can be phone or email
    if (!identifier || !password) {
      return res.status(400).json({ message: "Identifier and password are required" });
    }
    const result = await authService.loginService(identifier, password);
    res.json({
      message: "Login successful",
      ...result
    });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) {
      return res.status(400).json({ message: "Phone number is required" });
    }
    const result = await authService.forgotPasswordService(phone);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { phone, otp, newPassword } = req.body;
    if (!phone || !otp || !newPassword) {
      return res.status(400).json({ message: "Phone, OTP and new password are required" });
    }
    const result = await authService.resetPasswordService(phone, otp, newPassword);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const verifyPhone = async (req, res) => {
  try {
    const { phone, otp } = req.body;
    if (!phone || !otp) {
      return res.status(400).json({ message: "Phone and OTP are required" });
    }
    const result = await authService.verifyPhoneService(phone, otp);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
  verifyPhone
};