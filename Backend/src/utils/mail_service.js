const nodemailer = require('nodemailer');
const { VERIFICATION_EMAIL_TEMPLATE, WELCOME_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } = require('./emailTemplate.js');


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const emailService = async (email, verificationToken) => {
  const recipient = [email];

  try {
    const info = await transporter.sendMail({
      from: '"Digital Wilderness" <digitalwilderness9@gmail.com>',
      to: recipient,
      subject: "Verify your Email",
      text: "Please verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken)
    });

    console.log('Message sent: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

const welcome_email = async (email) => {
  const recipient = [email];

  try {
    const info = await transporter.sendMail({
      from: '"Digital Wilderness" <digitalwilderness9@gmail.com>',
      to: recipient,
      subject: "Welcome",
      text: "Your email has been successfully verified",
      html: WELCOME_TEMPLATE
    });

    console.log('Message sent: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

const forgot_password_email = async (email, resetURL) => {
  const recipient = [email];

  try {
    const info = await transporter.sendMail({
      from: '"Digital Wilderness" <digitalwilderness9@gmail.com>',
      to: recipient,
      subject: "Password Reset",
      text: "Follow the following instructions to reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
    });
    console.log('Message sent: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

const successfully_reset_email = async(email) => {
  const recipient = [ email ];

  try {
    const info = await transporter.sendMail({
      from: '"Digital Wilderness" <digitalwilderness9@gmail.com>',
      to: recipient,
      subject: "Password Reset",
      text: "Follow the following instructions to reset your password",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE
    });
    console.log('Message sent: %s', info.messageId);
    return info;
  } catch(error) {
    console.error("Error Sending email", error);
    throw error;
  }
}

module.exports = { emailService, welcome_email, forgot_password_email, successfully_reset_email };
