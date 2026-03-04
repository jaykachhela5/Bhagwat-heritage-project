export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  token: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export type UserRole = "admin" | "donor" | "volunteer" | "user";

export interface Event {
  _id: string;
  title: string;
  image: string;
  date: string;
  peopleServed: number;
  description?: string;
  registrations: number;
}

export interface Book {
  _id: string;
  title: string;
  author: string;
  category?: string;
  isbn?: string;
  quantity?: number;
  available?: number;
  description?: string;
  createdAt: string;
}

export interface Issue {
  _id: string;
  bookId: Book | string;
  studentName: string;
  phone?: string;
  issueDate: string;
  returnDate?: string;
  status: string;
}

export interface Volunteer {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  sevaArea: string;
  skills?: string;
  message?: string;
  status: "Pending" | "Approved" | "Rejected";
  adminNotes?: string;
  createdAt: string;
}

export interface Media {
  _id: string;
  filename: string;
  path: string;
  cloudinary_id: string;
  uploadDate: string;
}

export interface GalleryImage {
  _id: string;
  imageUrl: string;
  publicId: string;
  createdAt: string;
}

export interface Donation {
  _id: string;
  amount: number;
  name: string;
  email: string;
  status: string;
  createdAt: string;
}

export interface Member {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  createdAt: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface MandirContent {
  _id?: string;
  title?: string;
  subtitle?: string;
  about?: string;
  morningTime?: string;
  afternoonTime?: string;
  eveningTime?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pages: number;
}
