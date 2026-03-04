import { apiClient } from "./client";
import type { Book, Issue } from "../../types";

export const booksApi = {
  getAll: () => apiClient.get<Book[]>("/api/books"),
  add: (payload: Omit<Book, "_id" | "createdAt">) =>
    apiClient.post<{ message: string }>("/api/books", payload),
  delete: (id: string) => apiClient.delete<{ message: string }>(`/api/books/${id}`),
};

export const issuesApi = {
  issue: (payload: { bookId: string; studentName: string; phone?: string; returnDate?: string }) =>
    apiClient.post<{ message: string }>("/api/issue", payload),
  getAll: () => apiClient.get<Issue[]>("/api/issue"),
};
