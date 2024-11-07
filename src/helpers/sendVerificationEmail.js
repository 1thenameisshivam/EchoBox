import VerificationEmail from "../emails/VerificationEmail";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API);

export const sendVerificationEmail = async (email, verifyCode, username) => {
  try {
    await resend.emails.send({
      from: "no-reply@shivamkumar.me",
      to: email,
      subject: "echobox || verification code",
      react: VerificationEmail({ username, otp: verifyCode }),
    });
    return { success: true, message: "Verification email sent" };
  } catch (error) {
    console.log(error.message);
    return { success: false, message: "Error sending verification email" };
  }
};
