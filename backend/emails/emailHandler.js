const welcomeEmailTemplate = require('./emailTemplate');
require('dotenv').config()


const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const sendWelcomeEmail = async (email, username, actionURL,next) => {
  try {
    const { data, error } = await resend.emails.send({
      from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_FROM}>`,
      to: [email],
      subject: 'Welcome to Varta!',
      html: welcomeEmailTemplate(username, actionURL),
    });

    if (error) {
      console.error('Error sending email:', error);
      return;
    }

  } catch (err) {
    next(err);
  }
};


module.exports = { sendWelcomeEmail };