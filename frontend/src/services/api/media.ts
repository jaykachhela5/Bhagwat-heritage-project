import { apiClient } from "./client";
import type { Media, GalleryImage, PaginatedResponse } from "../../types";

export const mediaApi = {
  upload: (formData: FormData, onProgress?: (pct: number) => void) =>
    apiClient.post<{ message: string; media: Media[] }>("/api/media/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (e) => {
        if (onProgress && e.total) {
          onProgress(Math.round((e.loaded * 100) / e.total));
        }
      },
    }),

  getAll: (page = 1, search = "") =>
    apiClient.get<PaginatedResponse<Media>>(`/api/media/media?page=${page}&search=${search}`),

  delete: (id: string) => apiClient.delete<{ message: string }>(`/api/media/${id}`),
};

export const galleryApi = {
  upload: (formData: FormData, onProgress?: (pct: number) => void) =>
    apiClient.post<{ message: string; image: GalleryImage }>("/api/gallery/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (e) => {
        if (onProgress && e.total) {
          onProgress(Math.round((e.loaded * 100) / e.total));
        }
      },
    }),

  getAll: () => apiClient.get<GalleryImage[]>("/api/gallery/"),

  delete: (id: string) => apiClient.delete<{ message: string }>(`/api/gallery/${id}`),
};
