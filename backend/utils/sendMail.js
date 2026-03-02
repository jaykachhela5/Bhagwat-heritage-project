const nodemailer = require("nodemailer");

const sendMail = async (data) => {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  /* ===== ADMIN EMAIL ===== */

  const adminMail = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: "New Join Application",
    html: `
      <h2>New Volunteer Application</h2>
      <p><b>Name:</b> ${data.name}</p>
      <p><b>Email:</b> ${data.email}</p>
      <p><b>Phone:</b> ${data.phone}</p>
      <p><b>Interest:</b> ${data.interest}</p>
      <p><b>Message:</b> ${data.message}</p>
    `
  };

  /* ===== USER CONFIRMATION ===== */

  const userMail = {
    from: process.env.EMAIL_USER,
    to: data.email,
    subject: "Thank You for Joining Bhagwat Heritage",
    html: `
      <h2>Thank You ${data.name} 🙏</h2>
      <p>Your application has been received.</p>
      <p>We will contact you soon.</p>
    `
  };

  await transporter.sendMail(adminMail);
  await transporter.sendMail(userMail);
};

module.exports = sendMail;