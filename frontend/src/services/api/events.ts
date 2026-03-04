import { apiClient } from "./client";
import type { Event } from "../../types";

export const eventsApi = {
  getAll: () => apiClient.get<Event[]>("/api/events"),

  create: (formData: FormData, onProgress?: (pct: number) => void) =>
    apiClient.post<Event>("/api/events", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (e) => {
        if (onProgress && e.total) {
          onProgress(Math.round((e.loaded * 100) / e.total));
        }
      },
    }),

  register: (payload: { eventId: string; name: string; email: string }) =>
    apiClient.post<{ message: string }>("/api/events/register", payload),
};
