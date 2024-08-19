import { createTransport, SendMailOptions } from "nodemailer";
import { Ttransport } from "../utils/types";

class SendEamil {
  constructor(
    email: string,
    subject: string,
    token: string,
    id: string,
    name: string
  ) {
    const resetUrl: string = process.env.LIVE_SERVER || "http://localhost:3000";
    const transport = createTransport({
      service: "gmail",
      auth: {
        user: process.env.AUTH_USER_EMAIL,
        pass: process.env.AUTH_USER_PASS,
      },
    });

    const mailOptions: SendMailOptions = {
      from: process.env.SENDER_MAIL,
      to: email,
      subject: subject,
      html: `<div style="width: 100%; height: auto; padding: 15px 10px; text-align: center;">
      <h1 style="font-size: 25px;">Hi ${name}</h1>
      <div>
        <p>You have requested to reset your password. Please click on the button below to continue.<br>The link will expire within 2 minutes.</p>
        <a href="${resetUrl}/set-password/${id}/${token}" style="background: green; color: white; font-weight: 500; font-size: 17px; padding: 7px 15px; text-decoration: none; border-radius: 6px; margin-top: 7px">Reset Password</a>
      </div>
    <div>`,
    };

    transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log("from error", error);
      }
      console.log("Password reset email send: %s", info.messageId);
    });
    transport.close();
  }
}

export default SendEamil;
