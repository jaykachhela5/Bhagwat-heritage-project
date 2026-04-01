import { apiClient } from "./client";
import type { KundliRequest } from "../../types";

export const kundliRequestsApi = {
  create: (payload: {
    fullName: string;
    gender: "Male" | "Female";
    orderDate: string;
    signature?: string;
    dateOfBirth: string;
    timeOfBirth: string;
    placeOfBirth: string;
    district: string;
    state: string;
    country: string;
    selectedServices: Array<{ title: string; pages: number; price: number }>;
    preferredLanguage: "English" | "Hindi" | "Marathi" | "Gujarati";
    deliveryPreference: "Email" | "WhatsApp" | "Both";
    mobileNumber: string;
    email: string;
    address?: string;
    totalAmount: number;
    paymentMethod: "UPI" | "Razorpay" | "Stripe";
    paymentStatus: "Paid";
    paymentReference: string;
  }) =>
    apiClient.post<{
      message: string;
      order: KundliRequest;
      orderId: string;
      invoiceNumber: string;
      estimatedDeliveryTime: string;
      paymentStatus: string;
    }>("/api/kundli-requests/create", payload),

  getAll: () => apiClient.get<KundliRequest[]>("/api/kundli-requests/all"),

  getById: (id: string) => apiClient.get<KundliRequest>(`/api/kundli-requests/${id}`),

  updateStatus: (
    id: string,
    payload: { orderStatus: "Pending" | "Processing" | "Completed"; adminNotes?: string; estimatedDeliveryTime?: string },
  ) => apiClient.put<{ message: string; order: KundliRequest }>(`/api/kundli-requests/status/${id}`, payload),

  uploadReport: (id: string, payload: FormData) =>
    apiClient.put<{ message: string; order: KundliRequest }>(`/api/kundli-requests/report/${id}`, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
};
