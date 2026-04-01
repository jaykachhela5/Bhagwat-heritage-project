import { apiClient } from "./client";

export type SevaRequestServiceType =
  | "Gau Seva"
  | "Jal Seva"
  | "Ann Seva"
  | "Medicine Distribution"
  | "Education Support"
  | "Scholarship Program"
  | "Kanyadaan Seva"
  | "Vyasanmukti Abhiyan"
  | "Disaster Relief";

export interface SevaRequestLocationPayload {
  address: string;
  lat?: number;
  lng?: number;
}

export interface SevaRequestRecord {
  _id: string;
  name: string;
  phone: string;
  location: SevaRequestLocationPayload;
  serviceType: SevaRequestServiceType;
  peopleCount: number;
  urgency: "Low" | "Medium" | "Emergency";
  description: string;
  image: string;
  status: string;
  amountRequired: number;
  amountCollected: number;
  createdAt: string;
}

export const sevaApi = {
  create: (payload: FormData) =>
    apiClient.post<{ message: string; request: SevaRequestRecord }>(
      "/api/seva-request",
      payload,
      { headers: { "Content-Type": "multipart/form-data" } },
    ),
};
