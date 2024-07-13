const userSchema = require("../models/userModel.js");
const { hashPassword, comparePassword } = require("../helpers/authHelper.js");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;
    // validation
    if (!name || !email || !phone || !password || !address || !answer) {
      return res
        .status(400)
        .send({ success: false, error: "Fields are required..." });
    }
    // password validation
    if (password && password.length < 6) {
      return res.status(400).send({
        success: false,
        error: "Password should be atleast 6 characters.....",
      });
    }
    // check existing user
    const existingUser = await userSchema.findOne({ email });
    if (existingUser) {
      return res.send({
        success: true,
        message: "Already Registered , Please Login....",
      });
    }

    // hashed password
    const hashedPassword = await hashPassword(password);

    // save it
    const user = await new userSchema({
      name,
      password: hashedPassword,
      email,
      address,
      phone,
      answer,
    }).save();
    return res.status(201).send({
      success: true,
      message: "User Registered Successfully...",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registeration.",
      error,
    });
  }
};

// Login controller

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        error: "Invalid Credentials...",
      });
    }

    // check user
    const user = await userSchema.findOne({ email });

    if (!user) {
      return res.status(404).send({
        success: false,
        error: "Invalid Credentials...",
      });
    }

    // compared password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        error: "Invalid Password....",
      });
    }

    // token
    const secretKey = process.env.JWT_SECRET;
    const token = await jwt.sign({ _id: user._id }, secretKey, {
      expiresIn: "1day",
    });

    res.status(200).send({
      success: true,
      message: "Login Successfully...",
      user: {
        name: user.name,
        email: user.email,
        password: user.password,
        answer: user.answer,
        address: user.address,
        phone: user.phone,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login...",
      error,
    });
  }
};

// Forgot Password

const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, password } = req.body;

    // validation
    if (!email || !answer || !password) {
      return res
        .status(400)
        .send({ success: false, error: "Fields are required...." });
    }

    // user Check
    const user = await userSchema.findOne({ email, answer });

    // Check user validation
    if (!user) {
      return res.status(400).send({
        success: false,
        error: "Invalid Credientials...",
      });
    }

    const hashed = await hashPassword(password);
    const newPass = await userSchema.findByIdAndUpdate(user._id, {
      password: hashed,
    });
    console.log("NewPassword:", newPass);
    res.status(200).send({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: "Something went wrong....",
    });
  }
};

module.exports = {
  registerController,
  loginController,
  forgotPasswordController,
};
