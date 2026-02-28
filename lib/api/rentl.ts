import { propertyData } from '../propertyData';
import { Property, Booking, RentlApiResponse } from '../../types';

// rentl.io API Configuration
const RENTL_API_BASE_URL = process.env.NEXT_PUBLIC_RENTL_API_URL || 'https://api.rentl.io/v1';
const RENTL_API_KEY = process.env.RENTLIO_API_KEY || '';

class RentlApiService {
  /**
   * Helper to perform generic fetch requests to the API
   */
  private async fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<RentlApiResponse<T>> {
    const headers = {
      'Content-Type': 'application/json',
      'ApiKey': RENTL_API_KEY,
      ...options.headers,
    };

    // If no API key is provided, we simulate the request using local data for now.
    // In production, this should throw an error or handle the missing config.
    if (!RENTL_API_KEY) {
      console.warn('RENTL_API_KEY is missing. Using mocked data fallback.');
      return this.mockApiCall(endpoint);
    }

    try {
      const response = await fetch(`${RENTL_API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
        // Optional: next: { revalidate: 3600 } for caching properties if we want
      });


      if (!response.ok) {
        if (response.status === 404) {
          return { data: null as any, status: 404, message: 'Not Found' };
        }
        let msg = response.statusText;
        try {
          const errBody = await response.json();
          msg = errBody.message || errBody.errors?.global || msg;
        } catch(e) {}
        console.warn(`Rentl API warning (${response.status}) for ${endpoint}: ${msg}`);
        return { data: null as any, status: response.status, message: msg };
      }

      const data = await response.json();
      return { data, status: response.status };
    } catch (error: any) {
      console.error('Rentl API request failed critically:', error);
      throw error;
    }
  }

  /**
   * Mock API responses using the provided propertyData.ts
   */
  private async mockApiCall<T>(endpoint: string): Promise<RentlApiResponse<T>> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    if (endpoint.startsWith('/properties')) {
      const properties: Property[] = Object.entries(propertyData).map(([id, data]) => ({
        id,
        name: data.name,
        description: data.description,
        images: data.images,
        amenities: data.amenities,
        highlights: data.highlights,
        // Mock price
        price: 100 + Math.floor(Math.random() * 100),
        currency: 'EUR',
      }));

      if (endpoint.startsWith('/properties/')) {
        const id = endpoint.split('/')[2];
        const prop = properties.find(p => p.id === id);
        if (prop) return { data: prop as unknown as T, status: 200 };
        return { data: null as unknown as T, status: 404, message: 'Property not found' };
      }

      return { data: properties as unknown as T, status: 200 };
    }

    if (endpoint.startsWith('/bookings')) {
      // Mock empty bookings for now
      return { data: [] as unknown as T, status: 200 };
    }

    throw new Error(`Mock endpoint not implemented: ${endpoint}`);
  }

  /**
   * Get all properties
   */
  async getProperties(): Promise<RentlApiResponse<Property[]>> {
    const res = await this.fetchApi<any>('/properties');
    const rawData = res.data?.data || res.data || [];
    const items = Array.isArray(rawData) ? rawData : [];

    const properties: Property[] = items.map((prop: any) => {
      // Merge with local static data for images and descriptions
      const localData = propertyData[prop.id] || propertyData[parseInt(prop.id)];
      return {
        ...prop,
        id: prop.id.toString(),
        name: localData?.name || prop.name || 'Cheyf Property',
        images: localData?.images || ['/placeholder-property.jpg'],
        description: localData?.description || prop.description || 'Premium apartment in Sarajevo.',
        amenities: localData?.amenities || prop.amenities || [],
        highlights: localData?.highlights || [],
      };
    });

    return { data: properties, status: res.status, message: res.message };
  }

  /**
   * Get a single property by ID
   */
  async getProperty(id: string): Promise<RentlApiResponse<Property>> {
    let prop: any = null;
    let res: any = await this.fetchApi<any>(`/properties/${id}`);

    if (res.status === 200) {
      prop = res.data?.data || res.data;
    } else {
      // Endpoint might not exist or return 404, try to fetch all properties and filter
      const allPropsRes = await this.getProperties();
      if (allPropsRes.status === 200 && allPropsRes.data) {
        prop = allPropsRes.data.find(p => p.id.toString() === id.toString());
        res.status = 200;
        res.message = undefined;
      }
    }
    
    if (prop) {
      const localData = propertyData[prop.id] || propertyData[parseInt(prop.id)] || propertyData[id as any];
      const mergedProp = {
        ...prop,
        id: prop.id.toString(),
        name: prop.name || localData?.name,
        images: localData?.images || ['/placeholder-property.jpg'],
        description: localData?.description || prop.description || 'Premium apartment in Sarajevo.',
        amenities: localData?.amenities || prop.amenities || [],
        highlights: localData?.highlights || [],
      };
      return { data: mergedProp, status: res.status, message: res.message };
    }
    
    // Total fallback to local
    const localFallback = propertyData[id as any] || propertyData[parseInt(id)];
    if (localFallback) {
      return {
        data: {
          id,
          name: localFallback.name,
          images: localFallback.images || [],
          description: localFallback.description || 'Premium apartment',
          amenities: localFallback.amenities || [],
          highlights: localFallback.highlights || [],
        } as Property,
        status: 200
      };
    }

    return { data: null as any, status: 404, message: 'Not found' };
  }

  /**
   * Get user bookings
   */
  async getBookings(userId: string): Promise<RentlApiResponse<Booking[]>> {
    // Ideally this endpoint takes user/org context
    return this.fetchApi<Booking[]>(`/bookings?userId=${userId}`);
  }

  /**
   * Get unit types for a property
   */
  async getUnitTypes(propertyId: string | number): Promise<RentlApiResponse<any[]>> {
    return this.fetchApi<any[]>(`/properties/${propertyId}/unit-types`);
  }

  /**
   * Check availability for multiple properties
   */
  async checkBulkAvailability(propertyIds: string[], dateFrom: string, dateTo: string): Promise<RentlApiResponse<any>> {
    if (!RENTL_API_KEY) {
      // Mocked availability: pretend all are available with base prices
      await new Promise(resolve => setTimeout(resolve, 800));
      return {
        status: 200,
        data: propertyIds.map(id => ({
          propertyId: id,
          available: true,
          pricePerNight: 100, // mock fallback
        }))
      };
    }

    const idsQuery = propertyIds.join(',');
    const res = await this.fetchApi<any[]>(`/availability?propertiesIds=${idsQuery}&dateFrom=${dateFrom}&dateTo=${dateTo}`);
    
    // Process Rentl's raw availability data into a map or array of what's available
    if (res.status === 200 && Array.isArray(res.data)) {
      const processed = res.data.map((prop: any) => {
        let isAvailable = false;
        let totalPrice = 0;
        
        if (prop.unitTypes && prop.unitTypes.length > 0) {
          // Check the first standard unit type
          const unit = prop.unitTypes[0];
          
          // Check for blocked dates
          const blocked = (unit.availability || []).find((day: any) => day.value === 0);
          isAvailable = !blocked;
          
          // Calculate price
          const rates = unit.rates?.[0]?.DailyValues || [];
          rates.forEach((day: any) => {
            if (day.price) totalPrice += day.price;
          });
          
          // If rates are empty but available is true, we fallback
          if (totalPrice === 0 && isAvailable) {
             totalPrice = 100 * (rates.length || 1); // Mock fallback if Rentl gives 0 price for unconfigured
          }
        }
        
        return {
          propertyId: prop.id.toString(),
          available: isAvailable,
          totalPrice,
          pricePerNight: totalPrice / (prop.unitTypes?.[0]?.rates?.[0]?.DailyValues?.length || 1)
        };
      });
      
      return { status: 200, data: processed };
    }
    
    return res;
  }

  /**
   * Create a booking (initiate booking flow)
   */
  async createBooking(bookingData: Partial<Booking>): Promise<RentlApiResponse<Booking>> {
    // For mock, just return the data as confirmed
    if (!RENTL_API_KEY) {
      await new Promise(resolve => setTimeout(resolve, 800));
      return {
        data: {
          ...bookingData,
          id: Math.random().toString(36).substring(7),
          status: 'CONFIRMED',
        } as Booking,
        status: 201
      };
    }

    return this.fetchApi<Booking>('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  }
}

export const rentlApi = new RentlApiService();
