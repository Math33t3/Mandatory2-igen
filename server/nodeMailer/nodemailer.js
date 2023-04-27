import { Router } from "express";
const mailRouter = Router();

import nodemailer from "nodemailer"

mailRouter.post('/sendMail', async (req, res) => {
  const { to, subject, body } = req.body;
  let transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.emailAddress,
    pass: process.env.emailPassword
  }
});

  let info = await transporter.sendMail({
    from: '"Bird Project" ',
    to: to,
    subject: subject,
    text: body,
    html: `<p>${body}</p>`,
  });

  console.log("Message sent: %s", info.messageId);
})

export default mailRouter;