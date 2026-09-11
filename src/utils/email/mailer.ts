import nodemailer from "nodemailer";

type SendEmailType = {
  receiverMail: string;
  receiverName: string;
  subject: string;
  html: string;
};

const SENDER_MAIL = process.env.SENDER_MAIL;
const SENDER_PASS = process.env.SENDER_PASS;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: SENDER_MAIL,
    pass: SENDER_PASS,
  },
});

export const sendEmail = async ({
  receiverMail,
  receiverName,
  subject,
  html,
}: SendEmailType) => {
  if (!receiverMail || !receiverName || !subject || !html) return;

  if (!SENDER_MAIL || !SENDER_PASS) {
    throw new Error("Sender email or password properly not setup!");
  }

  try {
    const info = await transporter.sendMail({
      from: `"JobLogs Team" <${SENDER_MAIL}>`,
      to: receiverMail,
      subject,
      html: html,
    });

    return info.accepted;
  } catch (error) {
    console.error("Error while sending email", error);
    return;
  }
};
