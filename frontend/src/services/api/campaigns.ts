import { apiClient } from "./client";
import type { Campaign } from "../../types";

export const campaignsApi = {
  getPublic: () => apiClient.get<Campaign[]>("/api/campaigns"),

  getAdmin: () => apiClient.get<Campaign[]>("/api/campaigns/admin/all"),

  create: (payload: Omit<Campaign, "_id" | "createdAt">) =>
    apiClient.post<{ message: string; campaign: Campaign }>("/api/campaigns", payload),

  update: (id: string, payload: Partial<Omit<Campaign, "_id" | "createdAt">>) =>
    apiClient.put<{ message: string; campaign: Campaign }>(`/api/campaigns/${id}`, payload),

  delete: (id: string) => apiClient.delete<{ message: string }>(`/api/campaigns/${id}`),

  analytics: () =>
    apiClient.get<{
      totalCampaigns: number;
      activeCampaigns: number;
      goalAmount: number;
      collectedAmount: number;
      donors: number;
    }>("/api/campaigns/analytics"),
};
