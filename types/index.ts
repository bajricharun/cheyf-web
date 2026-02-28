export interface Property {
  id: string;
  name: string;
  description: string;
  images: string[];
  amenities: Array<string | { name: string; icon: any }>;
  price?: number;
  currency?: string;
  highlights?: string[];
  bedrooms?: number;
  bathrooms?: number;
}

export interface Booking {
  id: string;
  propertyId: string;
  checkIn: string;
  checkOut: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
  guestName: string;
  guestEmail: string;
  totalPrice: number;
  currency: string;
}

export interface RentlApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}
