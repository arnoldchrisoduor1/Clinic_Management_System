const nodemailer = require('nodemailer');

import { VERIFICATION_EMAIL_TEMPLATE } from './emailTemplate.js';

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const emailService = async(email, token) => {
    const recepient = [ email ];

    try {
      const info = await transporter.sendMail({
        from: '"Arnold Chris" arnoldchris262@gmail.com',
        to: recepient,
        subject: "Verify your Email",
        text: "Some text",
        html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificatonCode}", token)
      });

      console.log('Message sent: %s', info.messageId);
      return info;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
};

module.exports = emailService;