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

export interface MahotsavLiveSession {
  id: string;
  dayLabel: string;
  slot: string;
  title: string;
  start: string;
  end: string;
  status: "live" | "next" | "upcoming" | "completed";
}

export interface MahotsavLiveData {
  source: "event" | "fallback";
  eventId?: string;
  eventTitle: string;
  serverTime: string;
  mahotsavStart: string;
  eventEnd: string;
  currentSession: MahotsavLiveSession | null;
  nextSession: MahotsavLiveSession | null;
  countdown: {
    days: number;
    hours: number;
    minutes: number;
    totalMilliseconds: number;
  };
  schedule: MahotsavLiveSession[];
}

export interface Book {
  _id: string;
  title: string;
  author: string;
  category?: string;
  isbn?: string;
  image?: string;
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
  email?: string;
  phone?: string;
  sevaArea?: string;
  skills?: string;
  message?: string;
  location?: string;
  availability?: string;
  interest?: "Annadaan" | "Jal Seva" | "Both";
  organizerTrack?: "Volunteer" | "Organizer" | "City Lead" | "Both";
  status: "Pending" | "Approved" | "Rejected";
  adminNotes?: string;
  createdAt: string;
}

export interface KundliRequest {
  _id: string;
  orderId: string;
  invoiceNumber: string;
  fullName: string;
  gender: "Male" | "Female";
  orderDate: string;
  signature?: string;
  email: string;
  mobileNumber: string;
  dateOfBirth: string;
  timeOfBirth: string;
  placeOfBirth: string;
  district: string;
  state: string;
  country: string;
  selectedServices: Array<{
    title: string;
    pages: number;
    price: number;
  }>;
  preferredLanguage: "English" | "Hindi" | "Marathi" | "Gujarati";
  deliveryPreference: "Email" | "WhatsApp" | "Both";
  address?: string;
  totalAmount: number;
  paymentMethod: "UPI" | "Razorpay" | "Stripe";
  paymentStatus: "Pending" | "Paid" | "Failed";
  paymentReference: string;
  orderStatus: "Pending" | "Processing" | "Completed";
  estimatedDeliveryTime: string;
  reportFileName?: string;
  reportFileUrl?: string;
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
  mobile?: string;
  donationType?: "Annadaan" | "Jal Seva" | "Both";
  donationMode?: "One-Time" | "Monthly";
  occasion?: string;
  message?: string;
  sponsorLabel?: string;
  campaignId?: string;
  campaignTitle?: string;
  paymentStatus?: string;
  status: string;
  createdAt: string;
}

export interface Campaign {
  _id: string;
  title: string;
  description: string;
  category: "Annadaan" | "Jal Seva" | "Both";
  goalAmount: number;
  collectedAmount: number;
  impactLine: string;
  coverImage?: string;
  location?: string;
  donorCount: number;
  isActive: boolean;
  startDate?: string;
  endDate?: string;
  createdAt: string;
}

export interface ReportExpenseItem {
  label: string;
  amount: number;
  note?: string;
}

export interface Report {
  _id: string;
  title: string;
  monthLabel: string;
  summary: string;
  highlights: string[];
  expenseBreakdown: ReportExpenseItem[];
  images: string[];
  imagePublicIds: string[];
  videoUrl?: string;
  pdfName?: string;
  pdfUrl?: string;
  isPublished: boolean;
  createdAt: string;
}

export interface Member {
  _id: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  status?: "Pending" | "Approved" | "Rejected";
  createdAt: string;
}

export interface LibraryRequest {
  _id: string;
  name: string;
  mobile: string;
  bookTitle: string;
  reason?: string;
  status: "Pending" | "Approved" | "Rejected";
  createdAt: string;
}

export interface LibraryDonation {
  _id: string;
  donorName: string;
  bookDetails: string;
  quantity: number;
  createdAt: string;
}

export interface LibraryStats {
  _id?: string;
  totalBooks: number;
  totalUsers: number;
  studentsBenefited: number;
  activeMembers: number;
  updatedAt?: string;
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
