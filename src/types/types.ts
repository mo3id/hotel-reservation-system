export interface BookingPayload {
  userId: number;
  roomId: number;
  checkInDate: string;
  checkOutDate: string;
  totalPrice: number;
  status: "pending" | "confirmed";
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface Room {
  id: number;
  roomNumber: number;
  title: string;
  hotelName: string;
  pricePerNight: number;
  capacity: number;
  amenities: string[];
  isAvailable: boolean;
  image: string;
  description: string;
}

export interface Booking {
  id: number;
  userId: number;
  roomId: number;
  checkInDate: string;
  checkOutDate: string;
  totalPrice: number;
  status: string;
}

export interface Filters {
  roomType: string;
  priceRange: [number, number];
}

export interface LoginValues {
  email: string;
  password: string;
}

export interface SignupValues {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface BookingState {
  bookings: Booking[];
  loading: boolean;
  error: string | null;
}

export interface FiltersState {
  roomType: string;
  priceRange: [number, number];
}
