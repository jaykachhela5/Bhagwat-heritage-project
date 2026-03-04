import { apiClient } from "./client";
import type { Donation, Member, MandirContent } from "../../types";

export const contactApi = {
  send: (payload: { name: string; email: string; subject?: string; message: string }) =>
    apiClient.post<{ message: string }>("/api/contact", payload),
};

export const donationsApi = {
  create: (payload: { amount: number; name: string; email: string }) =>
    apiClient.post<{ message: string; donation: Donation }>("/api/donations", payload),
  getAll: () => apiClient.get<Donation[]>("/api/donations"),
};

export const donorApi = {
  create: (payload: {
    name: string;
    email: string;
    phone?: string;
    amount: number;
    message?: string;
  }) => apiClient.post<{ message: string }>("/api/donor/donor", payload),
};

export const membersApi = {
  add: (payload: { name: string; email: string; phone?: string; address?: string }) =>
    apiClient.post<{ message: string }>("/api/members", payload),
  getAll: () => apiClient.get<Member[]>("/api/members"),
};

export const mandirApi = {
  get: () => apiClient.get<MandirContent>("/api/mandir"),
  update: (payload: MandirContent) => apiClient.put<MandirContent>("/api/mandir", payload),
};

export const devoteeApi = {
  create: (payload: { name: string; email: string; city?: string; message?: string }) =>
    apiClient.post<{ message: string }>("/api/devotee", payload),
};

export const pathshalaApi = {
  submit: (payload: {
    name: string;
    age?: number;
    parentName?: string;
    phone?: string;
    email?: string;
    course?: string;
    message?: string;
  }) => apiClient.post<{ message: string }>("/api/pathshala", payload),
  getAll: () => apiClient.get("/api/pathshala"),
};

export const involvedApi = {
  join: (payload: {
    name: string;
    email: string;
    phone?: string;
    city?: string;
    age?: number;
    interest?: string;
    message?: string;
  }) => apiClient.post<{ success: boolean; message: string }>("/api/involved/join", payload),
  getAll: () => apiClient.get("/api/involved"),
  delete: (id: string) => apiClient.delete(`/api/involved/${id}`),
};

export const culturalApi = {
  getAll: () => apiClient.get("/api/cultural"),
};

export const spiritualApi = {
  getAll: () => apiClient.get("/api/spiritual"),
};
