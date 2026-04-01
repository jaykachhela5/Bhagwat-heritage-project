import { apiClient } from "./client";
import type { Report } from "../../types";

export const reportsApi = {
  getPublic: () => apiClient.get<Report[]>("/api/reports"),

  getAdmin: () => apiClient.get<Report[]>("/api/reports/admin/all"),

  create: (payload: FormData) =>
    apiClient.post<{ message: string; report: Report }>("/api/reports", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  update: (id: string, payload: FormData) =>
    apiClient.put<{ message: string; report: Report }>(`/api/reports/${id}`, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  delete: (id: string) => apiClient.delete<{ message: string }>(`/api/reports/${id}`),

  analytics: () =>
    apiClient.get<{
      totalReports: number;
      publishedReports: number;
      totalExpense: number;
      photoCount: number;
    }>("/api/reports/analytics"),
};
