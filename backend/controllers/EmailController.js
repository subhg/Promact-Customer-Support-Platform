const nodemailer = require('nodemailer');

// Function to send email
const sendEmail = async (recipientEmail, subject, message) => {
  try {
    // Create transporter using Gmail service
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: 'senderfromern@gmail.com',
        pass: 'vgghkoksogbhhtve'
      },
    });

    // Define email options
    const mailOptions = {
      from: 'senderfromern@gmail.com',
      to: recipientEmail,
      subject: subject,
      text: message,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};

module.exports = {sendEmail};
