import { apiClient } from "./client";
import type { Donation } from "../../types";

export interface DonationPayload {
  name: string;
  mobile: string;
  email: string;
  donationType: "Annadaan" | "Jal Seva" | "Both";
  amount: number;
  occasion?: string;
  message?: string;
  donationMode: "One-Time" | "Monthly";
  recurringPlan?: number;
  sponsorLabel?: string;
  campaignId?: string;
  campaignTitle?: string;
}

export interface DonationOrderResponse {
  message: string;
  keyId?: string;
  orderId: string;
  currency: string;
  amount: number;
  receiptId: string;
}

export interface DonationSubscriptionResponse {
  message: string;
  keyId?: string;
  subscriptionId: string;
  amount: number;
  status: string;
}

export interface DonationVerifyPayload {
  flow: "order" | "subscription";
  donation: DonationPayload;
  razorpay_order_id?: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  razorpay_subscription_id?: string;
}

export const donationCheckoutApi = {
  createOrder: (payload: DonationPayload) =>
    apiClient.post<DonationOrderResponse>("/api/donations/order", payload),

  createSubscription: (payload: DonationPayload) =>
    apiClient.post<DonationSubscriptionResponse>("/api/donations/subscription", payload),

  verify: (payload: DonationVerifyPayload) =>
    apiClient.post<{ message: string; donation: Donation }>("/api/donations/verify", payload),
};
