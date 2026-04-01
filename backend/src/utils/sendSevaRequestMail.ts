import nodemailer from "nodemailer";
import { env } from "../config/env";
import type { SevaServiceType } from "../models/SevaRequest";
import { logger } from "./logger";

interface SevaMailData {
  name: string;
  phone: string;
  serviceType: SevaServiceType;
  peopleCount: number;
  urgency: "Low" | "Medium" | "Emergency";
  address: string;
  description: string;
}

export const sendSevaRequestMail = async (data: SevaMailData): Promise<void> => {
  if (!env.EMAIL_USER || !env.EMAIL_PASS) {
    logger.warn("Email credentials not configured; skipping seva request alert");
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
    from: `"Bhagwat Heritage Seva Alerts" <${env.EMAIL_USER}>`,
    to: env.ADMIN_EMAIL ?? env.EMAIL_USER,
    subject: `[Seva Alert] New ${data.serviceType} request from ${data.name}`,
    html: `
      <h2>New Seva Help Request</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Service:</strong> ${data.serviceType}</p>
      <p><strong>People Count:</strong> ${data.peopleCount}</p>
      <p><strong>Urgency:</strong> ${data.urgency}</p>
      <p><strong>Location:</strong> ${data.address}</p>
      <p><strong>Description:</strong> ${data.description}</p>
    `,
  });
};
