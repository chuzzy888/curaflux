import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";
import { Otp } from "../models/otpModel.js";
import { sendEmail } from "../utils/sendVerificationOtp.js";
import randomstring from "randomstring";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Sign Up Handler
export const signUp = expressAsyncHandler(async (req, res) => {
  const {
    email,
    password,
    fullName,
    nickName,
    photo,
    role,
    birthdate,
    gender,
  } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Hash the password and create the new user
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    email,
    password: hashedPassword,
    fullName,
    nickName,
    birthdate,
    gender,
    photo,
    role,
  });
  await newUser.save();

  // Generate JWT token
  const token = jwt.sign(
    {
      id: newUser._id,
      fullName: newUser.fullName,
      nickName: newUser.nickName,
      birthdate: newUser.birthdate,
      gender: newUser.gender,
      role: newUser.role,
      email: newUser.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  // Generate and send OTP after saving user details
  await sendOTP(email);

  res
    .status(201)
    .json({ success: true, message: "Successful registration", token });
});

// Sign In Handler
export const signIn = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find user and validate password
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const isPasswordCorrect = bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // Generate JWT token
  const token = jwt.sign(
    {
      id: user._id,
      fullName: user.fullName,
      nickName: user.nickName,
      birthdate: user.birthdate,
      gender: user.gender,
      role: user.role,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  res.status(200).json({ message: "Successful login", token, success: true });
});

// Sign In Handler
// export const signIn = expressAsyncHandler(async (req, res) => {
//   const { email, password } = req.body;

//   // Find user and validate email
//   const user = await User.findOne({ email });
//   if (!user) {
//     return res.status(400).json({ message: "User not found" });
//   }

//   // Compare passwords
//   const isPasswordCorrect = await bcrypt.compare(password, user.password); // Await this promise
//   if (!isPasswordCorrect) {
//     return res.status(400).json({ message: "Invalid credentials" });
//   }

//   // Generate JWT token
//   const token = jwt.sign(
//     {
//       id: user._id,
//       fullName: user.fullName,
//       nickName: user.nickName,
//       birthdate: user.birthdate,
//       gender: user.gender,
//       role: user.role,
//       email: user.email,
//     },
//     process.env.JWT_SECRET,
//     {
//       expiresIn: "1h",
//     }
//   );

//   res.status(200).json({ message: "Successful login", token, success: true });
// });

// Generate OTP
function generateOTP() {
  return randomstring.generate({
    length: 6,
    charset: "numeric",
  });
}

// Send OTP to the provided email
// Send OTP to the provided email
// export const sendOTP = async (email) => {
//   try {
//     const otp = generateOTP(); // Generate a 6-digit OTP

//     // Await the hashing of OTP
//     // const hashedOtp = await bcrypt.hash(otp, 10);

//     const newOTP = new Otp({
//       email,
//       otp,
//       createdAt: Date.now(),
//       expiresAt: Date.now() + 3600000, // OTP valid for 1 hour
//     });
//     await newOTP.save();

//     // Send OTP via email
//     await sendEmail({
//       to: email,
//       subject: "Your OTP",
//       html: `<p>Your OTP is: <strong>${otp}</strong></p>`,
//     });

//     // You can log the success or perform other actions here if needed
//     console.log("OTP sent successfully to:", email);
//   } catch (error) {
//     console.error("Error sending OTP:", error);
//     throw new Error("Failed to send OTP");
//   }
// };
export const sendOTP = async email => {
  try {
    const otp = generateOTP(); // Generate a 6-digit OTP

    const newOTP = new Otp({
      email,
      otp,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000, // OTP valid for 1 hour
    });
    await newOTP.save();

    // Customized OTP email content
    const emailContent = `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
      <div style="max-width: 600px; margin: auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="https://curaflux.netlify.app/assets/logo-DH0Xceen.png" alt="Logo" style="max-width: 150px;" />
        </div>
        <h2 style="text-align: center; color: #333;">Verify Your Account</h2>
        <p style="text-align: center; font-size: 16px; color: #555;">Hello, your OTP for verifying your account is:</p>
        <div style="text-align: center; margin: 20px 0;">
          <span style="font-size: 30px; color: #4CAF50; font-weight: bold;">${otp}</span>
        </div>
        <p style="text-align: center; font-size: 14px; color: #777;">
          This OTP will expire in 1 hour. If you did not request this, please ignore this email.
        </p>
        <div style="text-align: center; margin-top: 30px;">
          <a href="https://curaflux.netlify.app/" style="background-color: #4CAF50; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Visit Our Site</a>
        </div>
      </div>
    </div>
    `;

    // Send OTP via email
    await sendEmail({
      to: email,
      subject: "Your OTP Code",
      html: emailContent,
    });

    console.log("OTP sent successfully to:", email);
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw new Error("Failed to send OTP");
  }
};

export const verifyOTP = async (req, res, next) => {
  try {
    const { otp } = req.body;

    if (!otp) {
      throw Error("Please verify your otp");
    }

    const existingOTP = await Otp.findOneAndDelete({ otp });

    if (existingOTP) {
      // OTP is valid
      res
        .status(200)
        .json({ success: true, message: "OTP verification successful" });
    } else {
      // OTP is invalid
      res.status(400).json({ success: false, error: "Invalid OTP" });
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const resendOtp = expressAsyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw Error("Input your email address");
  }

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      res.status(400).json({ message: "Invalid Email Address" });
    }

    await sendOTP(email);

    res.status(200).json({ success: true, message: "your otp has been sent" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

export const verify = expressAsyncHandler(async (req, res) => {
  const { userId } = req.params;

  const {
    fullName,
    email,
    phoneNumber,
    birthdate,
    gender,
    linkedInUrl,
    identificationType,
    identificationNumber,
  } = req.body;

  // Construct user details object
  const userDetails = {};
  if (fullName) userDetails.fullName = fullName;
  if (email) userDetails.email = email;
  if (phoneNumber) userDetails.phoneNumber = phoneNumber;
  if (birthdate) userDetails.birthdate = birthdate;
  if (gender) userDetails.gender = gender;
  if (linkedInUrl) userDetails.linkedInUrl = linkedInUrl;
  if (identificationType) userDetails.identificationType = identificationType;
  if (identificationNumber)
    userDetails.identificationNumber = identificationNumber;

  // Check if files are uploaded
  const document =
    req.files && req.files.identificationDocument
      ? req.files.identificationDocument.tempFilePath
      : null;

  const photoPic =
    req.files && req.files.photo ? req.files.photo.tempFilePath : null;

  // Handle document upload
  if (document) {
    try {
      const documentResult = await cloudinary.uploader.upload(document, {
        use_filename: true,
        folder: "CuraFlux-user-identificationDocument",
        resource_type: "auto",
      });

      userDetails.identificationDocument = documentResult.secure_url;
      fs.unlinkSync(document); // Remove temp file after upload
    } catch (error) {
      console.error("Error uploading identification document:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to upload identification document",
      });
    }
  }

  // Handle profile picture upload
  if (photoPic) {
    try {
      const profileResult = await cloudinary.uploader.upload(photoPic, {
        use_filename: true,
        folder: "CuraFlux-official-profile",
        resource_type: "auto",
      });

      userDetails.photo = profileResult.secure_url;
      fs.unlinkSync(photoPic); // Remove temp file after upload
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      return res
        .status(500)
        .json({ success: false, message: "Failed to upload profile picture" });
    }
  }

  // Update user details
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, userDetails, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      message: "User details updated successfully",
      updatedUser,
    });
  } catch (error) {
    console.error("Error updating user details:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update user details",
    });
  }
});

export const getUsers = expressAsyncHandler(async (req, res) => {
  const user = await User.find();

  res.status(200).json({ success: true, user });
});

export const getAUsers = expressAsyncHandler(async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById({ _id: userId });

  res.status(200).json({ success: true, user });
});
