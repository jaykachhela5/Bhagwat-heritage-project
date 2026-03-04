import nodemailer from "nodemailer";
import { env } from "../config/env";
import { logger } from "./logger";

interface MailData {
  name: string;
  email: string;
  phone?: string;
  interest?: string;
  message?: string;
}

export const sendMail = async (data: MailData): Promise<void> => {
  if (!env.EMAIL_USER || !env.EMAIL_PASS) {
    logger.warn("Email credentials not configured; skipping mail send");
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: env.EMAIL_USER,
      pass: env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Join Form" <${env.EMAIL_USER}>`,
    to: env.ADMIN_EMAIL ?? env.EMAIL_USER,
    subject: `New Join Application from ${data.name}`,
    html: `
      <h2>New Join Application</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone ?? "N/A"}</p>
      <p><strong>Interest:</strong> ${data.interest ?? "N/A"}</p>
      <p><strong>Message:</strong> ${data.message ?? "N/A"}</p>
    `,
  });

  await transporter.sendMail({
    from: `"Bhagwat Heritage" <${env.EMAIL_USER}>`,
    to: data.email,
    subject: `Thank you for joining us, ${data.name}`,
    html: `
      <h2>Thank You for Joining!</h2>
      <p>Dear ${data.name},</p>
      <p>Thank you for applying to join us. We have received your application and will contact you soon.</p>
      <p>Best regards,<br/>Bhagwat Heritage Team</p>
    `,
  });
};
