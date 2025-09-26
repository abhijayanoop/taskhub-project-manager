import sgmail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

sgmail.setApiKey(process.env.SEND_GRID_API);

const fromEmail = process.env.FROM_EMAIL;

export const sendEmail = async (to, subject, html) => {
  const msg = {
    to,
    from: `Tashhub <${fromEmail}>`,
    subject,
    html,
  };
  try {
    await sgmail.send(msg);
    console.log("Email sent successfully");
    return true;
  } catch (err) {
    console.log("Error sending email", err);
    return false;
  }
};
