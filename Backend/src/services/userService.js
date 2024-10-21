const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const userQueries = require("../db/queries/users");
const { emailService, welcome_email, forgot_password_email, successfully_reset_email } = require('../utils/mail_service');


const userService = {
  signUp: async (full_name, email, password, role) => {
    console.log("Starting signUp process", { full_name, email, role });
    try {
      const existingUser = await userQueries.findUserByEmail(email);
      if (existingUser) {
        console.log("User with this email already exists:", email);
        throw new Error("User with this email already exists");
      }

      console.log("Hashing password");
      const passwordHash = await bcrypt.hash(password, 10);
      
      
      const verificationToken = Math.floor(
        100000 + Math.random() * 900000
      ).toString();
      
      const verificationTokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours till expiry.
      
      console.log("Creating user");
      const user = await userQueries.createUser(
        full_name,
        email,
        passwordHash,
        role,
        verificationToken,
        verificationTokenExpiresAt
      );

      console.log("Generating JWT");

      const generateToken = (userId) => {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
          expiresIn: '7d',
        });
        return token
      }

      token = generateToken(user.id);

      console.log("User created successfully:", user);

      try {
        await emailService(email, verificationToken);
        console.log("Email sent successfully");
      } catch (error) {
        console.error('Failed to send email:', error);
      }

      console.log("SignUp process completed successfully");

      return { user, token };

    } catch (error) {
      console.error("Error in signUp process:", error);
      throw error;
    }
  },

  // EMAIL VERIFICATION LOGIC.

  verifyEmail: async (code) => {
    try {
      console.log("Starting Email Verification.");
  
      const user = await userQueries.findUserByVerificationToken(code);
  
      if (!user) {
        throw new Error("Invalid or expired verification code");
      }
  
      if (user.isVerified) {
        return { user, message: "Email already verified" };
      }
  
      if (user.verificationTokenExpiresAt < new Date()) {
        throw new Error("Verification code has expired");
      }

      console.log("Verification id:", user);
  
      const updatedUser = await userQueries.updateVerifiedUser(
        user.id,
        true,  
        null,  
        null   
      );
  
      console.log("Email verified successfully:", updatedUser);

      try {
        await welcome_email(user.email);
        console.log("Welcome Email sent successfully!");
      } catch(error) {
        console.error("Failed to send welcome email:", error);
        throw error;
      }
  
      return { user: updatedUser, message: "Email verified successfully" };
  
    } catch (error) {
      console.error("Error verifying email:", error);
      throw error;
    }
  },

  signIn: async (email, password) => {
    const user = await userQueries.findUserByEmail(email);
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return { user, token };
  },

  getUserById: async (userId) => {
    return await userQueries.findUserById(userId);
  },

  // FORGOT PASSWORD RESET LOGIC

  forgotPassword: async(email) => {
    const user = await userQueries.findUserByEmail(email);

    if(!user) {
      throw new Error("Email address does not exist");
    }

    // generating reset token
    console.log("Generating reset token");
    const resetpasswordtoken = crypto.randomBytes(20).toString("hex");

    // Adding the reset token and the expiry date to the database.
    console.log("Adding the reset token and the expiry date to database");
    resetpasswordexpiresat = new Date(Date.now() + 15 * 60 * 1000);
    await userQueries.forgotPassword( resetpasswordtoken,resetpasswordexpiresat, user.email)
    console.log("New User:", user);

    await forgot_password_email(user.email, `${process.env.CLIENT_URL}/reset-password/${resetpasswordtoken}`);
    console.log("Reset Email Sent successfully");
    return "Reset Email Sent Successfully"

  },

  // RESETTING THE PASSWORD.
  resetPassword: async(token, password) => {
    const user = await userQueries.findUserByToken(token);

    console.log("Resetting Password for:", user);

    if(!user) {
      throw new Error("Invalid or Expired link");
    }

    if(user.resetPasswordExpiresAt > new Date()) {
      throw new Error("password reset token expired");
    }

    // update the password.
    const hashedPassword = await bcrypt.hash(password, 10);

    // updating the user
    await userQueries.updatePassword(
      user.id,
      hashedPassword,
      null,
      null
    );

    try {
      await successfully_reset_email(user.email);
      console.log("Successfully sent the email");
    } catch(error) {
      console.error("Failed to send the email");
      throw error;
    }

    console.log("Password resetting process Completed Sucessfully!");

    return "Password Resetting completed successfully"
  }
};

module.exports = userService;
