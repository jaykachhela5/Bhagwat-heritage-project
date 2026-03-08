import nodemailer from "nodemailer";
import { env } from "../config/env";
import { logger } from "./logger";

interface KundliOrderMailData {
  fullName: string;
  email: string;
  orderId: string;
  invoiceNumber: string;
  totalAmount: number;
  paymentMethod: string;
  selectedServices: string[];
}

export const sendKundliOrderMail = async (data: KundliOrderMailData): Promise<void> => {
  if (!env.EMAIL_USER || !env.EMAIL_PASS) {
    logger.warn("Email credentials not configured; skipping kundli order email");
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: env.EMAIL_USER,
      pass: env.EMAIL_PASS,
    },
  });

  const servicesHtml = data.selectedServices.map((service) => `<li>${service}</li>`).join("");

  await transporter.sendMail({
    from: `"Bhagwat Heritage" <${env.EMAIL_USER}>`,
    to: env.ADMIN_EMAIL ?? env.EMAIL_USER,
    subject: `New Kundli Order ${data.orderId}`,
    html: `
      <h2>New Kundli Order Received</h2>
      <p><strong>Order ID:</strong> ${data.orderId}</p>
      <p><strong>Invoice:</strong> ${data.invoiceNumber}</p>
      <p><strong>Name:</strong> ${data.fullName}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Payment Method:</strong> ${data.paymentMethod}</p>
      <p><strong>Total Amount:</strong> INR ${data.totalAmount}</p>
      <p><strong>Services:</strong></p>
      <ul>${servicesHtml}</ul>
    `,
  });

  await transporter.sendMail({
    from: `"Bhagwat Heritage" <${env.EMAIL_USER}>`,
    to: data.email,
    subject: `Your Kundli Order ${data.orderId} is Confirmed`,
    html: `
      <h2>Kundli Order Confirmed</h2>
      <p>Dear ${data.fullName},</p>
      <p>Your Kundli request has been successfully submitted. Our astrologer will prepare your Kundli and send the report to your email.</p>
      <p><strong>Order ID:</strong> ${data.orderId}</p>
      <p><strong>Invoice Number:</strong> ${data.invoiceNumber}</p>
      <p><strong>Payment Status:</strong> Paid</p>
      <p><strong>Total Amount:</strong> INR ${data.totalAmount}</p>
      <p><strong>Selected Services:</strong></p>
      <ul>${servicesHtml}</ul>
      <p>Estimated delivery time: 3-5 working days.</p>
      <p>Bhagwat Heritage Service Foundation Trust</p>
    `,
  });
};
