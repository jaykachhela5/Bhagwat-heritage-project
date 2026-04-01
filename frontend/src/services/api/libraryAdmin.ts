import { apiClient } from "./client";
import type { LibraryDonation, LibraryRequest, LibraryStats } from "../../types";

export const libraryRequestsApi = {
  create: (payload: { name: string; mobile: string; bookTitle: string; reason?: string }) =>
    apiClient.post<{ message: string; request: LibraryRequest }>("/api/library-requests", payload),
  getAll: () => apiClient.get<LibraryRequest[]>("/api/library-requests"),
  updateStatus: (id: string, payload: { status: "Pending" | "Approved" | "Rejected" }) =>
    apiClient.put<{ message: string; request: LibraryRequest }>(`/api/library-requests/${id}/status`, payload),
};

export const libraryDonationsApi = {
  create: (payload: { donorName: string; bookDetails: string; quantity: number }) =>
    apiClient.post<{ message: string; donation: LibraryDonation }>("/api/library-donations", payload),
  getAll: () => apiClient.get<LibraryDonation[]>("/api/library-donations"),
};

export const libraryStatsApi = {
  get: () => apiClient.get<LibraryStats>("/api/library-stats"),
  update: (payload: Partial<LibraryStats>) =>
    apiClient.put<{ message: string; stats: LibraryStats }>("/api/library-stats", payload),
};
