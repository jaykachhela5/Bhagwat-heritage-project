import { apiClient } from "./client";
import type { Volunteer } from "../../types";

export const volunteersApi = {
  create: (payload: {
    fullName: string;
    email?: string;
    phone?: string;
    sevaArea?: string;
    skills?: string;
    message?: string;
    location?: string;
    availability?: string;
    interest?: "Annadaan" | "Jal Seva" | "Both";
    organizerTrack?: "Volunteer" | "Organizer" | "City Lead" | "Both";
  }) => apiClient.post<{ message: string; volunteer: Volunteer }>("/api/volunteers/create", payload),

  getAll: () => apiClient.get<Volunteer[]>("/api/volunteers/all"),

  getById: (id: string) => apiClient.get<Volunteer>(`/api/volunteers/${id}`),

  updateStatus: (id: string, payload: { status: string; adminNotes?: string }) =>
    apiClient.put<{ message: string }>(`/api/volunteers/status/${id}`, payload),

  delete: (id: string) => apiClient.delete<{ message: string }>(`/api/volunteers/delete/${id}`),
};
