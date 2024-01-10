const nodemailer = require("nodemailer");

const trasnporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ivancodespace@gmail.com",
    pass: "leaz kksn lbfn qlpl",
  },
});

const sendEmail = async (to, subject, html) => {
  try {
    const mailOptions = {
      from: "ivancodespace@gmail.com",
      to: to,
      subject: subject,
      html: html,
    };
    await trasnporter.sendMail(mailOptions);
    console.log("Se ha enviado el correo");
  } catch (error) {
    console.log("No se ha enviado el correo");
  }
};

module.exports = { sendEmail };
