const nodemailer = require('nodemailer');
const VERIFICATION_EMAIL_TEMPLATE = require('./emailTemplate.js');

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

module.exports = emailService;