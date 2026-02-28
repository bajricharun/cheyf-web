// ============================================================================
// PROPERTY DATA
// ============================================================================

import {
  Accessibility,
  AirVentIcon,
  BedDouble,
  Building,
  CarTaxiFront,
  CigaretteOff,
  CookingPot,
  Hamburger,
  Heater,
  MonitorCheck,
  ParkingCircle,
  Toilet,
  TreePine,
  Users,
  Wifi,
} from "lucide-react";

export interface PropertyData {
  images: string[];
  description: string;
  // amenity may be a simple name or an object with an icon reference;
  // components can normalize to a string and optionally render an icon
  amenities: Array<string | { name: string; icon: any }>;
  highlights?: string[];
  name: string;
}

export const propertyData: Record<number, PropertyData> = {
  // 31221: Čobanija
  31221: {
    images: [
      "/images/properties/cobanija.webp",
      "/images/properties/cobanija2_2.webp",
      "/images/properties/cobanija3.webp",
      "/images/properties/cobanija4.webp",
      "/images/properties/cobanija5.webp",
    ],
    name: "Cheyf Modern Studio",
    description: `
      Central Location: Cheyf Modern Studio in Sarajevo offers a central location with Latin Bridge less than 0.6 mi away and Sebilj Fountain a 15-minute walk. Bascarsija Street is 0.6 mi nearby, while Sarajevo National Theater is a 4-minute walk. \n
      Comfortable Amenities: The apartment features free WiFi, air-conditioning, a kitchenette, washing machine, and a work desk. Additional facilities include private check-in and check-out, paid shuttle service, minimarket, family rooms, bicycle parking, and luggage storage. \n
      Nearby Attractions: Sarajevo International Airport is 5 mi away. Points of interest include Eternal Flame in Sarajevo (1969 feet), Avaz Twist Tower (1.2 mi), and Sarajevo Cable Car (1.2 mi). An ice-skating rink is also in the surroundings. \n
      Guest Satisfaction: Highly rated for its convenient and central location, the apartment is ideal for city trips. Couples in particular like the location – they rated it 9.9 for a two-person trip.
    `,
    amenities: [
      { name: "WiFi", icon: Wifi },
      { name: "Parking", icon: ParkingCircle },
      { name: "Kitchen", icon: CookingPot },
      { name: "Private bathroom", icon: Toilet },
      { name: "Close to city center", icon: Building },
      { name: "Non Smoking rooms", icon: CigaretteOff },
      { name: "Air Conditioning", icon: AirVentIcon },
      { name: "Heating", icon: Heater },
    ],
  },

  31222: {
    images: [
      "/images/properties/kljucka.webp",
      "/images/properties/kljucka2.webp",
      "/images/properties/kljucka3.webp",
      "/images/properties/kljucka4.webp",
      "/images/properties/kljucka5.webp",
    ],
    name: "Cheyf in City Center",
    description: `Comfortable Living Space: Cheyf in City Center offers a one-bedroom apartment in Sarajevo. The ground-floor unit features a kitchenette, bathrobes, washing machine, and a private entrance.\n 
    Modern Amenities: Guests enjoy free WiFi, a fully equipped kitchen, bath, hairdryer, dining table, sofa bed, and a seating area. Additional amenities include a refrigerator, microwave, dishwasher, TV, and free toiletries.\n 
    Convenient Location: Located 5 mi from Sarajevo International Airport, the apartment is near Latin Bridge (1.1 mi), Sebilj Fountain (1.1 mi), and Bascarsija Street (1.1 mi). An ice-skating rink is also in the surroundings.\n 
    Highly Rated by Guests: Cheyf in City Center receives high ratings for its excellent facilities and comfortable accommodations.`,
    amenities: [
      { name: "WiFi", icon: Wifi },
      { name: "Heating", icon: Heater },
      { name: "Private Bathroom", icon: Toilet },
      { name: "Airport shuttle", icon: AirVentIcon },
      { name: "Non-smoking rooms", icon: CigaretteOff },
      { name: "Parking", icon: ParkingCircle },
    ],
  },

  // 31754: Giulia
  31754: {
    images: [
      "/images/properties/giulia1.webp",
      "/images/properties/giulia2.webp",
      "/images/properties/giulia3.webp",
      "/images/properties/giulia4.webp",
      "/images/properties/giulia5.webp",
      "/images/properties/giulia6.webp",
    ],
    name: "City Center Apartment Near the Cathedral - Giulia",
    description: `Comfortable Accommodations: City Center Apartment Near the Cathedral - Giulia in Sarajevo offers a two-bedroom apartment with a living room. The property features air-conditioning, a fully equipped kitchen, and a washing machine. \n
      Modern Amenities: Guests enjoy free WiFi, streaming services, and a dining area. Additional amenities include a tea and coffee maker, microwave, and dishwasher. \n
      Convenient Location: Located 5.6 mi from Sarajevo International Airport, the apartment is close to attractions such as Sebilj Fountain (8-minute walk), Bascarsija Street (2297 feet), and Sarajevo Cable Car (0.8 mi). An ice-skating rink is also nearby.`,
    amenities: [
      { name: "WiFi", icon: Wifi },
      { name: "Heating", icon: Heater },
      { name: "Private Bathroom", icon: Toilet },
      { name: "Airport shuttle", icon: AirVentIcon },
      { name: "Family Rooms", icon: Users },
      { name: "Non-smoking rooms", icon: CigaretteOff },
      { name: "Parking", icon: ParkingCircle },
    ],

    highlights: ["Premium Location", "Modern Amenities"],
  },

  // 32169: Andar's People
  32169: {
    images: [
      "/images/properties/andar6.webp",
      "/images/properties/andar1.webp",
      "/images/properties/andar2.webp",
      "/images/properties/andar3.webp",
      "/images/properties/andar4.webp",
      "/images/properties/andar5.webp",
      "/images/properties/andar7.webp",
      "/images/properties/andar8.webp",
    ],
    name: "Andar's people",
    description: `Modern Comforts: Andar's people in Sarajevo offers a recently renovated aparthotel with free WiFi and a terrace. Each unit features air-conditioning, a kitchenette, and a private bathroom with a walk-in shower.\n
      Convenient Facilities: Guests benefit from private check-in and check-out services, ensuring a seamless arrival and departure experience. The property also provides a paid airport shuttle service, located 6.2 mi from Sarajevo International Airport.\n
      Prime Location: Located on a quiet street, the aparthotel is close to key attractions such as Sebilj Fountain (12-minute walk), Bascarsija Street (0.6 mi), and Sarajevo Cable Car (1.2 mi). Nearby points of interest include Sarajevo National Theater and Sarajevo City Hall.\n
      Local Surroundings: The surrounding area features an ice-skating rink, offering additional leisure activities for guests.\n
      Couples in particular like the location – they rated it 8.6 for a two-person trip.`,
    amenities: [
      "WiFi",
      "Air Conditioning",
      "Kitchen",
      "Heating",
      "Workspace",
      "Smart TV",
    ],
    highlights: ["Themed Rooms", "Central Location", "Unique Design"],
  },

  // 32234: LocalHost Apartment Sarajevo
  32234: {
    images: [
      "/images/properties/senoina.webp",
      "/images/properties/senoina1.webp",
      "/images/properties/senoina2.webp",
      "/images/properties/senoina3.webp",
      "/images/properties/senoina4.webp",
      "/images/properties/senoina5.webp",
      "/images/properties/senoina6.webp",
      "/images/properties/senoina7.webp",
      "/images/properties/senoina8.webp",
      "/images/properties/senoina9.webp",
    ],
    name: "LocalHost Apartment Sarajevo",
    description: `Spacious Accommodations: LocalHost Apartment Sarajevo offers a spacious apartment in Sarajevo city center. The property features two bedrooms, a living room, and a fully equipped kitchen. \n
    Modern Amenities: Guests enjoy free WiFi, air-conditioning, a washing machine, and a dishwasher. Additional amenities include a mountain view, city view, and a private entrance. \n
    Convenient Services: The apartment provides private check-in and check-out, a paid shuttle service, a minimarket, and car hire. Reception staff speak English and Croatian. \n
    Prime Location: Located 5 mi from Sarajevo International Airport, the apartment is near Latin Bridge (less than 0.6 mi), Sebilj Fountain (12-minute walk), and Bascarsija Street (0.6 mi). An ice-skating rink is in the surroundings.`,
    amenities: [
      { name: "Multiple Beds", icon: BedDouble },
      { name: "WiFi", icon: Wifi },
      { name: "Air Conditioning", icon: AirVentIcon },
      { name: "Full Kitchen", icon: CookingPot },
      { name: "Workspace", icon: MonitorCheck },
      { name: "Private Bathroom", icon: Toilet },
    ],
    highlights: ["Business Friendly", "Modern Design"],
  },

  // 32352: Vila Jela
  32352: {
    images: [
      "/images/properties/jela.webp",
      "/images/properties/jela1.webp",
      "/images/properties/jela2.webp",
      "/images/properties/jela3.webp",
      "/images/properties/jela4.webp",
      "/images/properties/jela5.webp",
      "/images/properties/jela6.webp",
      "/images/properties/jela7.webp",
    ],
    name: "Apartment With Private Parking",
    description: `Comfortable Living: Apartment With Private Parking in Sarajevo offers a garden, terrace, and free WiFi. Family rooms provide a relaxing environment. \n
      Modern Amenities: The apartment includes a kitchenette, balcony, bathrobes, washing machine, and a work desk. Additional features include a dining area, sofa bed, and free toiletries. \n
      Convenient Location: Located 4.3 mi from Sarajevo International Airport, the property is near attractions such as Avaz Twist Tower (18-minute walk) and Sarajevo National Theater (1.2 mi). An ice-skating rink is in the surroundings. \n
      Guest Satisfaction: Highly rated for its convenient location and comfortable beds. Couples in particular like the location – they rated it 9.6 for a two-person trip.`,
    amenities: [
      { name: "Multiple Beds", icon: BedDouble },
      { name: "WiFi", icon: Wifi },
      { name: "Parking", icon: ParkingCircle },
      { name: "Kitchen", icon: CookingPot },
      { name: "Garden", icon: TreePine },
      { name: "BBQ", icon: Hamburger },
      { name: "Private Bathroom", icon: Toilet },
    ],
  },

  // 32379: Verde 22 with Garage
  32379: {
    images: [
      "/images/properties/verde.webp",
      "/images/properties/verde1.webp",
      "/images/properties/verde2.webp",
      "/images/properties/verde3.webp",
      "/images/properties/verde4.webp",
      "/images/properties/verde5.webp",
      "/images/properties/verde6.webp",
    ],
    name: "Verde 22 with Garage",
    description: `Comfortable Living: Verde 22 with Garage in Sarajevo offers a one-bedroom apartment with a terrace and free WiFi. The property includes a balcony, air-conditioning, washing machine, kitchen, and TV.\n
      Convenient Facilities: Guests benefit from private check-in and check-out services, a paid shuttle, elevator, hot tub, and family rooms. Free on-site private parking is available.\n
      Prime Location: Located 4.3 mi from Sarajevo International Airport, the apartment is near attractions such as Latin Bridge (3.1 mi), Sebilj Fountain (3.7 mi), and Avaz Twist Tower (2.5 mi). An ice-skating rink is in the surroundings.\n
      Couples in particular like the location – they rated it 9.7 for a two-person trip.`,
    amenities: [
      { name: "Multiple Beds", icon: BedDouble },
      { name: "WiFi", icon: Wifi },
      { name: "Garage Parking", icon: ParkingCircle },
      { name: "Kitchen", icon: CookingPot },
      { name: "Air Conditioning", icon: AirVentIcon },
      { name: "Private Bathroom", icon: Toilet },
      { name: "Elevator", icon: Accessibility },
      { name: "Balcony", icon: TreePine },
    ],
    highlights: ["Private Garage", "Secure Parking"],
  },

  // 32554: Nana's atelier in the old town
  32554: {
    images: [
      "/images/properties/nana.webp",
      "/images/properties/nana1.webp",
      "/images/properties/nana2.webp",
      "/images/properties/nana3.webp",
      "/images/properties/nana4.webp",
      "/images/properties/nana5.webp",
      "/images/properties/nana6.webp",
      "/images/properties/nana7.webp",
    ],
    name: "Nana's atelier in the old town",
    description: `Comfortable Living Space: Nana's atelier in the old town offers a one-bedroom apartment in Sarajevo. The ground-floor unit features a terrace and a garden, providing a relaxing outdoor area. Free WiFi is available throughout the property. \n
      Modern Amenities: The apartment includes a fully equipped kitchen with a dishwasher, washing machine, and a work desk. Guests can enjoy streaming services, a dining area, and a sofa bed. Additional amenities include a private check-in and check-out service, paid airport shuttle, and free on-site parking. \n
      Prime Location: Located 5.6 mi from Sarajevo International Airport, the property is a short walk from Latin Bridge (2953 feet) and Sebilj Fountain (0.7 mi). Nearby attractions include Bascarsija Street (0.8 mi) and Sarajevo Cable Car (less than 0.6 mi). An ice-skating rink is also in the surroundings. \n
      Couples in particular like the location – they rated it 9.7 for a two-person trip.`,
    amenities: [
      { name: "WiFi", icon: Wifi },
      { name: "Kitchen", icon: CookingPot },
      { name: "Heating", icon: Heater },
      { name: "Private Bathroom", icon: Toilet },
      { name: "Balcony", icon: TreePine },
      { name: "Private Entrance", icon: Building },
    ],
    highlights: ["Old Town Location", "Artistic Atmosphere"],
  },

  // 33111: Sarajevo Serenity Apartment
  33111: {
    images: [
      "/images/properties/dzamijska.webp",
      "/images/properties/dzamijska1.webp",
      "/images/properties/dzamijska2.webp",
      "/images/properties/dzamijska3.webp",
      "/images/properties/dzamijska4.webp",
      "/images/properties/dzamijska5.webp",
      "/images/properties/dzamijska6.webp",
      "/images/properties/dzamijska7.webp",
      "/images/properties/dzamijska8.webp",
      "/images/properties/dzamijska9.webp",
    ],
    name: "Sarajevo Serenity Apartment",
    description: `Comfortable Living: Sarajevo Serenity Apartment in Sarajevo offers a one-bedroom apartment with a living room. The property features a balcony with city views, air-conditioning, and a fully equipped kitchen. 
    \nModern Amenities: Guests enjoy free WiFi, a washing machine, and a dishwasher. Additional facilities include a minimarket, outdoor seating area, and a hairdresser/beautician. Free parking is available on-site. 
    \nConvenient Location: Located 3.7 mi from Sarajevo International Airport, the apartment is close to attractions such as Latin Bridge (2.7 mi) and Sebilj Fountain (3.1 mi). An ice-skating rink is in the surrounding area.`,
    amenities: [
      { name: "Multiple Beds", icon: BedDouble },
      { name: "WiFi", icon: Wifi },
      { name: "Air Conditioning", icon: AirVentIcon },
      { name: "Kitchen", icon: CookingPot },
      { name: "Quiet Location", icon: TreePine },
      { name: "Private Bathroom", icon: Toilet },
      { name: "Elevator", icon: Accessibility },
      { name: "Balcony", icon: TreePine },
      { name: "Private Entrance", icon: Building },
    ],
    highlights: ["Peaceful", "Relaxing Atmosphere"],
  },

  // 33117: Dalmatinska Cheyf Retreat
  33117: {
    images: [
      "/images/properties/oldtown.webp",
      "/images/properties/oldtown1.webp",
      "/images/properties/oldtown2.webp",
      "/images/properties/oldtown3.webp",
      "/images/properties/oldtown4.webp",
      "/images/properties/oldtown5.webp",
      "/images/properties/oldtown6.webp",
      "/images/properties/oldtown7.webp",
      "/images/properties/oldtown8.webp",
    ],
    name: "Dalmatinska Cheyf Retreat",
    description: `Comfortable Living Space: The apartment offers one bedroom and one bathroom with a kitchenette, air-conditioning, and a dining area. Guests enjoy free WiFi, a work desk, and a sofa bed.\n
      Convenient Facilities: Private check-in and check-out, a 24-hour front desk, and free on-site parking are available. Additional services include a paid shuttle and family rooms.\n
      Prime Location: Located in Sarajevo, the property is 6.2 mi from Sarajevo International Airport. Nearby attractions include Latin Bridge (7-minute walk), Sebilj Fountain (less than 0.6 mi), and Bascarsija Street (10-minute walk). An ice-skating rink is also in the surroundings.`,
    amenities: [
      { name: "Queen Bed", icon: BedDouble },
      { name: "WiFi", icon: Wifi },
      { name: "Kitchen", icon: CookingPot },
      { name: "Heating", icon: Heater },
      { name: "Historic Location", icon: TreePine },
      { name: "Private Bathroom", icon: Toilet },
    ],
  },

  // 33197: Cozy Studio in the City Center
  33197: {
    images: [
      "/images/properties/cozy.webp",
      "/images/properties/cozy1.webp",
      "/images/properties/cozy2.webp",
      "/images/properties/cozy3.webp",
      "/images/properties/cozy4.webp",
      "/images/properties/cozy5.webp",
      "/images/properties/cozy6.webp",
    ],
    name: "Cozy Studio in the City Center",
    description: `Comfortable Living Space: Cozy Studio in the City Center offers a one-bedroom apartment in Sarajevo. The property features a living room, a fully equipped kitchen, and a washing machine. Free WiFi is available throughout the apartment. 
    \n Convenient Facilities: Guests can enjoy a washing machine, a TV, and a washing machine. The apartment includes a washing machine, a fully equipped kitchen, and a TV. 
    \n Prime Location: Located 5 mi from Sarajevo International Airport, the apartment is close to attractions such as Sebilj Fountain (18-minute walk), Bascarsija Street (1 mi), and the Eternal Flame (2625 feet). An ice-skating rink is also nearby.`,
    amenities: [
      { name: "Double Bed", icon: BedDouble },
      { name: "WiFi", icon: Wifi },
      { name: "Kitchen", icon: CookingPot },
      { name: "Heating", icon: Heater },
      { name: "City Center", icon: TreePine },
      { name: "Private Bathroom", icon: Toilet },
    ],
    highlights: ["Central Location", "Perfect for Solo Travelers"],
  },

  // 33239: 1Bdr apartment in the heart of Sarajevo Old Town
  33239: {
    images: [
      "/images/properties/oldtown.webp",
      "/images/properties/oldtown1.webp",
      "/images/properties/oldtown2.webp",
      "/images/properties/oldtown3.webp",
      "/images/properties/oldtown4.webp",
      "/images/properties/oldtown5.webp",
      "/images/properties/oldtown6.webp",
      "/images/properties/oldtown7.webp",
      "/images/properties/oldtown8.webp",
    ],
    name: "1Bdr apartment in the heart of Sarajevo Old Town",
    description: `Comfortable Living Space: The apartment offers one bedroom and one bathroom with a kitchenette, air-conditioning, and a dining area. Guests enjoy free WiFi, a work desk, and a sofa bed.\n
      Convenient Facilities: Private check-in and check-out, a 24-hour front desk, and free on-site parking are available. Additional services include a paid shuttle and family rooms.\n
      Prime Location: Located in Sarajevo, the property is 6.2 mi from Sarajevo International Airport. Nearby attractions include Latin Bridge (7-minute walk), Sebilj Fountain (less than 0.6 mi), and Bascarsija Street (10-minute walk). An ice-skating rink is also in the surroundings.`,
    amenities: [
      { name: "Queen Bed", icon: BedDouble },
      { name: "WiFi", icon: Wifi },
      { name: "Kitchen", icon: CookingPot },
      { name: "Heating", icon: Heater },
      { name: "Historic Location", icon: TreePine },
      { name: "Private Bathroom", icon: Toilet },
    ],
    highlights: ["Old Town", "Walking Distance to Attractions"],
  },

  // 33276: Safveta Bega
  33276: {
    images: [
      "/images/properties/safveta.webp",
      "/images/properties/safveta1.webp",
      "/images/properties/safveta2.webp",
      "/images/properties/safveta3.webp",
      "/images/properties/safveta4.webp",
      "/images/properties/safveta5.webp",
      "/images/properties/safveta6.webp",
    ],
    name: "Tarhana Apartment",
    description: `Charming and bright, newly renovated flat on the first floor of a small building within a quiet neighborhood in the heart of Old Town (Bascarsija). Located only 250 m from the Sebilj (central spot in Bascarsija). A great base from which to explore Sarajevo and walk to all the main sights. Accommodates up to 5 guests.
        Fully renovated apartment with one bedroom with King size bed; a living room with one Queen/full pull out sofa bed (160x200cm) and one standard single studio bed (200x80cm) ; 
        a fully equipped modern kitchen with hob, microwave, fridge/freezer, kettle and necessary kitchen wear including basic ingredients; a modern bathroom with shower, washing machine, hairdryer, iron and essentials. 
        The living room has cable TV with DVD player and air conditioning. You will also find books to relax with on the couch or armchair.\n
        The entire flat is at your disposal
        Free WiFi
        All bed linen and towels are provided
        Complimentary toiletries and bottle of wine`,
    amenities: [
      { name: "Multiple Beds", icon: BedDouble },
      { name: "WiFi", icon: Wifi },
      { name: "Kitchen", icon: CookingPot },
      { name: "Heating", icon: Heater },
      { name: "Private Bathroom", icon: Toilet },
    ],
  },

  // 33450: Cheyf in Grbavička
  33450: {
    images: [
      "/images/properties/grbavicka.webp",
      "/images/properties/grbavicka1.webp",
      "/images/properties/grbavicka2.webp",
      "/images/properties/grbavicka3.webp",
      "/images/properties/grbavicka4.webp",
      "/images/properties/grbavicka5.webp",
      "/images/properties/grbavicka6.webp",
      "/images/properties/grbavicka7.webp",
    ],
    name: "Cheyf in Grbavička",
    description: `Comfortable Living Space: Cheyf in Grbavička offers a one-bedroom apartment in Sarajevo. The property features a private entrance, city views, and a quiet street setting.\n
      Modern Amenities: Guests enjoy free WiFi, a fully equipped kitchen, washing machine, and streaming services. Additional amenities include a dining area, sofa bed, and work desk.\n
      Convenient Services: The apartment provides private check-in and check-out, a paid shuttle service, car hire, and free off-site parking.\n
      Nearby Attractions: Located 3.7 mi from Sarajevo International Airport, the property is close to Avaz Twist Tower (1.1 mi) and Sarajevo National Theater (1.4 mi). An ice-skating rink is also nearby.`,
    amenities: [
      { name: "Double Bed", icon: BedDouble },
      { name: "WiFi", icon: Wifi },
      { name: "Air Conditioning", icon: AirVentIcon },
      { name: "Kitchen", icon: CookingPot },
      { name: "Parking", icon: ParkingCircle },
      { name: "Private Bathroom", icon: Toilet },
    ],
  },

  // 33617: Cheyf in Willson's Alley
  33617: {
    images: [
      "/images/properties/willson.webp",
      "/images/properties/willson1.webp",
      "/images/properties/willson2.webp",
      "/images/properties/willson3.webp",
      "/images/properties/willson4.webp",
      "/images/properties/willson5.webp",
      "/images/properties/willson6.webp",
    ],
    name: "Cheyf in Willson's Alley",

    description: `Comfortable Living Space: Cheyf in Willson's alley offers a one-bedroom apartment in Sarajevo. The property features a terrace, balcony, and city views. Free WiFi and air-conditioning ensure a pleasant stay.\n
      Modern Amenities: The apartment includes a fully equipped kitchen with a refrigerator, microwave, dishwasher, and oven. Additional amenities include a washing machine, dining area, sofa bed, and work desk. Free off-site parking is available.\n
      Prime Location: Located 3.7 mi from Sarajevo International Airport, the apartment is close to attractions such as Latin Bridge (2.7 mi), Sebilj Fountain (3.1 mi), and Bascarsija Street (3.1 mi). The Sarajevo War Tunnel is 5 mi away.`,
    amenities: [
      { name: "Double Bed", icon: BedDouble },
      { name: "WiFi", icon: Wifi },
      { name: "Kitchen Access", icon: CookingPot },
      { name: "Heating", icon: Heater },
      { name: "Private Bathroom", icon: Toilet },
    ],
    highlights: ["Unique Location", "Local Character"],
  },

    33674: {
    images: [
      "/images/properties/willson.webp",
      "/images/properties/willson1.webp",
      "/images/properties/willson2.webp",
      "/images/properties/willson3.webp",
      "/images/properties/willson4.webp",
      "/images/properties/willson5.webp",
      "/images/properties/willson6.webp",
    ],
    name: "Riverside Cheyf apartment",

    description: `Comfortable Living Space: Cheyf in Willson's alley offers a one-bedroom apartment in Sarajevo. The property features a terrace, balcony, and city views. Free WiFi and air-conditioning ensure a pleasant stay.\n
      Modern Amenities: The apartment includes a fully equipped kitchen with a refrigerator, microwave, dishwasher, and oven. Additional amenities include a washing machine, dining area, sofa bed, and work desk. Free off-site parking is available.\n
      Prime Location: Located 3.7 mi from Sarajevo International Airport, the apartment is close to attractions such as Latin Bridge (2.7 mi), Sebilj Fountain (3.1 mi), and Bascarsija Street (3.1 mi). The Sarajevo War Tunnel is 5 mi away.`,
    amenities: [
      { name: "Double Bed", icon: BedDouble },
      { name: "WiFi", icon: Wifi },
      { name: "Kitchen Access", icon: CookingPot },
      { name: "Heating", icon: Heater },
      { name: "Private Bathroom", icon: Toilet },
    ],
    highlights: ["Unique Location", "Local Character"],
  },
};

// ============================================================================
// UNIT TYPE (ROOM) DATA
// ============================================================================

export interface UnitTypeData {
  images: string[];
  description: string;
  amenities: { name: string; icon: any }[];
  bedConfiguration?: string;
}

export const unitTypeData: Record<number, UnitTypeData> = {
  // Property 31221: Čobanija
  // https://www.booking.com/hotel/ba/cheyf-modern-studio-in-center.html
  63614: {
    images: [
      "/images/properties/cobanija.webp",
      "/images/properties/cobanija2_2.webp",
      "/images/properties/cobanija3.webp",
      "/images/properties/cobanija4.webp",
      "/images/properties/cobanija5.webp",
    ],
    description: `
      Central Location: Cheyf Modern Studio in Sarajevo offers a central location with Latin Bridge less than 0.6 mi away and Sebilj Fountain a 15-minute walk. Bascarsija Street is 0.6 mi nearby, while Sarajevo National Theater is a 4-minute walk. \n
      Comfortable Amenities: The apartment features free WiFi, air-conditioning, a kitchenette, washing machine, and a work desk. Additional facilities include private check-in and check-out, paid shuttle service, minimarket, family rooms, bicycle parking, and luggage storage. \n
      Nearby Attractions: Sarajevo International Airport is 5 mi away. Points of interest include Eternal Flame in Sarajevo (1969 feet), Avaz Twist Tower (1.2 mi), and Sarajevo Cable Car (1.2 mi). An ice-skating rink is also in the surroundings. \n
      Guest Satisfaction: Highly rated for its convenient and central location, the apartment is ideal for city trips. Couples in particular like the location – they rated it 9.9 for a two-person trip.
    `,
    amenities: [
      { name: "WiFi", icon: Wifi },
      { name: "Parking", icon: ParkingCircle },
      { name: "Kitchen", icon: CookingPot },
      { name: "Private bathroom", icon: Toilet },
      { name: "Close to city center", icon: Building },
      { name: "Non Smoking rooms", icon: CigaretteOff },
      { name: "Air Conditioning", icon: AirVentIcon },
      { name: "Heating", icon: Heater },
    ],
  },

  // Property 31222: Ključka
  // https://www.booking.com/hotel/ba/cheyf-in-city-center.html
  63615: {
    images: [
      "/images/properties/kljucka.webp",
      "/images/properties/kljucka2.webp",
      "/images/properties/kljucka3.webp",
      "/images/properties/kljucka4.webp",
      "/images/properties/kljucka5.webp",
    ],
    description: `Comfortable Living Space: Cheyf in City Center offers a one-bedroom apartment in Sarajevo. The ground-floor unit features a kitchenette, bathrobes, washing machine, and a private entrance.\n 
    Modern Amenities: Guests enjoy free WiFi, a fully equipped kitchen, bath, hairdryer, dining table, sofa bed, and a seating area. Additional amenities include a refrigerator, microwave, dishwasher, TV, and free toiletries.\n 
    Convenient Location: Located 5 mi from Sarajevo International Airport, the apartment is near Latin Bridge (1.1 mi), Sebilj Fountain (1.1 mi), and Bascarsija Street (1.1 mi). An ice-skating rink is also in the surroundings.\n 
    Highly Rated by Guests: Cheyf in City Center receives high ratings for its excellent facilities and comfortable accommodations.`,
    amenities: [
      { name: "WiFi", icon: Wifi },
      { name: "Heating", icon: Heater },
      { name: "Private Bathroom", icon: Toilet },
      { name: "Airport shuttle", icon: AirVentIcon },
      { name: "Non-smoking rooms", icon: CigaretteOff },
      { name: "Parking", icon: ParkingCircle },
    ],
  },

  // Property 31224: Vojničko
  // https://www.booking.com/hotel/ba/spacious-cozy-cheyf.html
  63616: {
    images: [
      "/images/properties/vojnicko1.webp",
      "/images/properties/vojnicko2.webp",
      "/images/properties/vojnicko3.webp",
      "/images/properties/vojnicko4.webp",
      "/images/properties/vojnicko5.webp",
      "/images/properties/vojnicko6.webp",
    ],
    description: `Comfortable Living Space: Spacious Cozy Cheyf in Sarajevo offers a spacious apartment with one bedroom and one bathroom. Guests enjoy a terrace and free WiFi, ensuring a pleasant stay. \n
      Modern Amenities: The apartment features a kitchenette, balcony with mountain views, bathrobes, washing machine, and a dining area. Additional amenities include a sofa bed, TV, and free toiletries. \n
      Convenient Location: Located 1.2 mi from Sarajevo International Airport, the property is close to attractions such as the Sarajevo War Tunnel (3.1 mi) and Latin Bridge (5 mi). An ice-skating rink is also nearby. \n
      Highly Rated by Guests: Spacious Cozy Cheyf receives high ratings from guests for its spaciousness and excellent facilities.`,
    amenities: [
      { name: "WiFi", icon: Wifi },
      { name: "Heating", icon: Heater },
      { name: "Private Bathroom", icon: Toilet },
      { name: "Airport shuttle", icon: CarTaxiFront },
      { name: "Family Rooms", icon: Users },
      { name: "Non-smoking rooms", icon: CigaretteOff },
      { name: "Parking", icon: ParkingCircle },
      { name: "Elevator", icon: Accessibility },
    ],
  },

  // Property 31754: Giulia
  // https://www.booking.com/hotel/ba/city-center-apartment-near-the-cathedral-giulia.html
  64966: {
    images: [
      "/images/properties/giulia1.webp",
      "/images/properties/giulia2.webp",
      "/images/properties/giulia3.webp",
      "/images/properties/giulia4.webp",
      "/images/properties/giulia5.webp",
      "/images/properties/giulia6.webp",
    ],
    description: `Comfortable Accommodations: City Center Apartment Near the Cathedral - Giulia in Sarajevo offers a two-bedroom apartment with a living room. The property features air-conditioning, a fully equipped kitchen, and a washing machine. \n
      Modern Amenities: Guests enjoy free WiFi, streaming services, and a dining area. Additional amenities include a tea and coffee maker, microwave, and dishwasher. \n
      Convenient Location: Located 5.6 mi from Sarajevo International Airport, the apartment is close to attractions such as Sebilj Fountain (8-minute walk), Bascarsija Street (2297 feet), and Sarajevo Cable Car (0.8 mi). An ice-skating rink is also nearby.`,
    amenities: [
      { name: "WiFi", icon: Wifi },
      { name: "Heating", icon: Heater },
      { name: "Private Bathroom", icon: Toilet },
      { name: "Airport shuttle", icon: AirVentIcon },
      { name: "Family Rooms", icon: Users },
      { name: "Non-smoking rooms", icon: CigaretteOff },
      { name: "Parking", icon: ParkingCircle },
    ],
  },

  // Property 32169: Andar's People
  // https://www.booking.com/hotel/ba/andar-s-people.html#RD1375002601
  65927: {
    images: ["/images/rooms/gilda-1.webp", "/images/rooms/gilda-2.webp"],
    description:
      "The double room's kitchenette, which has a refrigerator and an electric kettle, is available for cooking and storing food. This air-conditioned double room is consisted of of a flat-screen TV with satellite channels, a private bathroom as well as a terrace with garden views. The unit has 1 bed.",
    amenities: [
      { name: "WiFi", icon: Wifi },
      { name: "Heating", icon: Heater },
      { name: "Private Bathroom", icon: Toilet },
      { name: "Airport shuttle", icon: AirVentIcon },
      { name: "Family Rooms", icon: Users },
      { name: "Non-smoking rooms", icon: CigaretteOff },
      { name: "Parking", icon: ParkingCircle },
    ],
    bedConfiguration: "1 Queen Bed",
  },

  // Property 32169: Andar's People
  // https://www.booking.com/hotel/ba/andar-s-people.html#RD1375002602
  65928: {
    images: ["/images/rooms/margot-1.webp"],
    description:
      "Offering free toiletries, this double room includes a private bathroom with a walk-in shower, a bidet and a hairdryer. The double room's kitchenette, which has a refrigerator, is available for cooking and storing food. The air-conditioned double room offers a flat-screen TV with satellite channels, a private entrance, a wardrobe, an electric kettle as well as garden views. The unit has 1 bed.",
    amenities: [
      { name: "WiFi", icon: Wifi },
      { name: "Heating", icon: Heater },
      { name: "Private Bathroom", icon: Toilet },
      { name: "Airport shuttle", icon: AirVentIcon },
      { name: "Family Rooms", icon: Users },
      { name: "Non-smoking rooms", icon: CigaretteOff },
      { name: "Parking", icon: ParkingCircle },
    ],
    bedConfiguration: "1 Queen Bed",
  },

  // Property 32169: Andar's People
  // https://www.booking.com/hotel/ba/andar-s-people.html#RD1375002604
  65929: {
    images: ["/images/rooms/trampy-1.webp"],
    description:
      "Featuring free toiletries, this double room includes a private bathroom with a walk-in shower, a bidet and a hairdryer. The double room's kitchenette, which has a refrigerator, is available for cooking and storing food. The air-conditioned double room features a flat-screen TV with satellite channels, a private entrance, a wardrobe, an electric kettle as well as city views. The unit has 1 bed.",
    amenities: [
      { name: "WiFi", icon: Wifi },
      { name: "Heating", icon: Heater },
      { name: "Private Bathroom", icon: Toilet },
      { name: "Airport shuttle", icon: AirVentIcon },
      { name: "Family Rooms", icon: Users },
      { name: "Non-smoking rooms", icon: CigaretteOff },
      { name: "Parking", icon: ParkingCircle },
    ],
    bedConfiguration: "1 Double Bed",
  },

  // Property 32169: Andar's People
  // https://www.booking.com/hotel/ba/andar-s-people.html#RD1375002603
  65930: {
    images: ["/images/rooms/wellington-1.webp"],
    description:
      "Offering free toiletries, this double room includes a private bathroom with a walk-in shower, a bidet and a hairdryer. The double room's kitchenette, which features a refrigerator, is available for cooking and storing food. The air-conditioned double room offers a flat-screen TV with satellite channels, a private entrance, a wardrobe, an electric kettle as well as city views. The unit offers 1 bed.",
    amenities: [
      { name: "WiFi", icon: Wifi },
      { name: "Heating", icon: Heater },
      { name: "Private Bathroom", icon: Toilet },
      { name: "Airport shuttle", icon: AirVentIcon },
      { name: "Family Rooms", icon: Users },
      { name: "Non-smoking rooms", icon: CigaretteOff },
      { name: "Parking", icon: ParkingCircle },
    ],
    bedConfiguration: "1 Queen Bed",
  },

  // Property 32234: LocalHost Apartment Sarajevo
  // https://www.booking.com/hotel/ba/localhost-apartment-sarajevo.html
  66073: {
    images: [
      "/images/properties/senoina.webp",
      "/images/properties/senoina1.webp",
      "/images/properties/senoina2.webp",
      "/images/properties/senoina3.webp",
      "/images/properties/senoina4.webp",
      "/images/properties/senoina5.webp",
      "/images/properties/senoina6.webp",
      "/images/properties/senoina7.webp",
      "/images/properties/senoina8.webp",
      "/images/properties/senoina9.webp",
    ],
    description: `Spacious Accommodations: LocalHost Apartment Sarajevo offers a spacious apartment in Sarajevo city center. The property features two bedrooms, a living room, and a fully equipped kitchen. \n
    Modern Amenities: Guests enjoy free WiFi, air-conditioning, a washing machine, and a dishwasher. Additional amenities include a mountain view, city view, and a private entrance. \n
    Convenient Services: The apartment provides private check-in and check-out, a paid shuttle service, a minimarket, and car hire. Reception staff speak English and Croatian. \n
    Prime Location: Located 5 mi from Sarajevo International Airport, the apartment is near Latin Bridge (less than 0.6 mi), Sebilj Fountain (12-minute walk), and Bascarsija Street (0.6 mi). An ice-skating rink is in the surroundings.`,
    amenities: [
      { name: "Multiple Beds", icon: BedDouble },
      { name: "WiFi", icon: Wifi },
      { name: "Air Conditioning", icon: AirVentIcon },
      { name: "Full Kitchen", icon: CookingPot },
      { name: "Workspace", icon: MonitorCheck },
      { name: "Private Bathroom", icon: Toilet },
    ],
    bedConfiguration: "Two Bedrooms",
  },

  // Property 32352: Vila Jela
  // https://www.booking.com/hotel/ba/apartment-with-private-parking.html
  66310: {
    images: [
      "/images/properties/jela.webp",
      "/images/properties/jela1.webp",
      "/images/properties/jela2.webp",
      "/images/properties/jela3.webp",
      "/images/properties/jela4.webp",
      "/images/properties/jela5.webp",
      "/images/properties/jela6.webp",
      "/images/properties/jela7.webp",
    ],
    description: `Comfortable Living: Apartment With Private Parking in Sarajevo offers a garden, terrace, and free WiFi. Family rooms provide a relaxing environment. \n
      Modern Amenities: The apartment includes a kitchenette, balcony, bathrobes, washing machine, and a work desk. Additional features include a dining area, sofa bed, and free toiletries. \n
      Convenient Location: Located 4.3 mi from Sarajevo International Airport, the property is near attractions such as Avaz Twist Tower (18-minute walk) and Sarajevo National Theater (1.2 mi). An ice-skating rink is in the surroundings. \n
      Guest Satisfaction: Highly rated for its convenient location and comfortable beds. Couples in particular like the location – they rated it 9.6 for a two-person trip.`,
    amenities: [
      { name: "Multiple Beds", icon: BedDouble },
      { name: "WiFi", icon: Wifi },
      { name: "Parking", icon: ParkingCircle },
      { name: "Kitchen", icon: CookingPot },
      { name: "Garden", icon: TreePine },
      { name: "BBQ", icon: Hamburger },
      { name: "Private Bathroom", icon: Toilet },
    ],
    bedConfiguration: "Sleeps up to 4",
  },

  // Property 32379: Verde 22 with Garage
  // https://www.booking.com/hotel/ba/verde-22-with-garage.html
  66395: {
    images: [
      "/images/properties/verde.webp",
      "/images/properties/verde1.webp",
      "/images/properties/verde2.webp",
      "/images/properties/verde3.webp",
      "/images/properties/verde4.webp",
      "/images/properties/verde5.webp",
      "/images/properties/verde6.webp",
    ],
    description: `Comfortable Living: Verde 22 with Garage in Sarajevo offers a one-bedroom apartment with a terrace and free WiFi. The property includes a balcony, air-conditioning, washing machine, kitchen, and TV.\n
      Convenient Facilities: Guests benefit from private check-in and check-out services, a paid shuttle, elevator, hot tub, and family rooms. Free on-site private parking is available.\n
      Prime Location: Located 4.3 mi from Sarajevo International Airport, the apartment is near attractions such as Latin Bridge (3.1 mi), Sebilj Fountain (3.7 mi), and Avaz Twist Tower (2.5 mi). An ice-skating rink is in the surroundings.\n
      Couples in particular like the location – they rated it 9.7 for a two-person trip.`,
    amenities: [
      { name: "Multiple Beds", icon: BedDouble },
      { name: "WiFi", icon: Wifi },
      { name: "Garage Parking", icon: ParkingCircle },
      { name: "Kitchen", icon: CookingPot },
      { name: "Air Conditioning", icon: AirVentIcon },
      { name: "Private Bathroom", icon: Toilet },
      { name: "Elevator", icon: Accessibility },
      { name: "Balcony", icon: TreePine },
    ],
    bedConfiguration: "Sleeps up to 4",
  },

  // Property 32554: Nana's atelier in the old town
  // https://www.booking.com/hotel/ba/nanas-atelier-in-the-old-town.html
  66810: {
    images: [
      "/images/properties/nana.webp",
      "/images/properties/nana1.webp",
      "/images/properties/nana2.webp",
      "/images/properties/nana3.webp",
      "/images/properties/nana4.webp",
      "/images/properties/nana5.webp",
      "/images/properties/nana6.webp",
      "/images/properties/nana7.webp",
    ],
    description: `Comfortable Living Space: Nana's atelier in the old town offers a one-bedroom apartment in Sarajevo. The ground-floor unit features a terrace and a garden, providing a relaxing outdoor area. Free WiFi is available throughout the property. \n
      Modern Amenities: The apartment includes a fully equipped kitchen with a dishwasher, washing machine, and a work desk. Guests can enjoy streaming services, a dining area, and a sofa bed. Additional amenities include a private check-in and check-out service, paid airport shuttle, and free on-site parking. \n
      Prime Location: Located 5.6 mi from Sarajevo International Airport, the property is a short walk from Latin Bridge (2953 feet) and Sebilj Fountain (0.7 mi). Nearby attractions include Bascarsija Street (0.8 mi) and Sarajevo Cable Car (less than 0.6 mi). An ice-skating rink is also in the surroundings. \n
      Couples in particular like the location – they rated it 9.7 for a two-person trip.`,
    amenities: [
      { name: "WiFi", icon: Wifi },
      { name: "Kitchen", icon: CookingPot },
      { name: "Heating", icon: Heater },
      { name: "Private Bathroom", icon: Toilet },
      { name: "Balcony", icon: TreePine },
      { name: "Private Entrance", icon: Building },
    ],
    bedConfiguration: "One bedroom",
  },

  // Property 33111: Sarajevo Serenity Apartment
  // https://www.booking.com/hotel/ba/sarajevo-serenity-apartment.html
  68001: {
    images: [
      "/images/properties/dzamijska.webp",
      "/images/properties/dzamijska1.webp",
      "/images/properties/dzamijska2.webp",
      "/images/properties/dzamijska3.webp",
      "/images/properties/dzamijska4.webp",
      "/images/properties/dzamijska5.webp",
      "/images/properties/dzamijska6.webp",
      "/images/properties/dzamijska7.webp",
      "/images/properties/dzamijska8.webp",
      "/images/properties/dzamijska9.webp",
    ],
    description: `Comfortable Living: Sarajevo Serenity Apartment in Sarajevo offers a one-bedroom apartment with a living room. The property features a balcony with city views, air-conditioning, and a fully equipped kitchen. 
    \nModern Amenities: Guests enjoy free WiFi, a washing machine, and a dishwasher. Additional facilities include a minimarket, outdoor seating area, and a hairdresser/beautician. Free parking is available on-site. 
    \nConvenient Location: Located 3.7 mi from Sarajevo International Airport, the apartment is close to attractions such as Latin Bridge (2.7 mi) and Sebilj Fountain (3.1 mi). An ice-skating rink is in the surrounding area.`,
    amenities: [
      { name: "Multiple Beds", icon: BedDouble },
      { name: "WiFi", icon: Wifi },
      { name: "Air Conditioning", icon: AirVentIcon },
      { name: "Kitchen", icon: CookingPot },
      { name: "Quiet Location", icon: TreePine },
      { name: "Private Bathroom", icon: Toilet },
      { name: "Elevator", icon: Accessibility },
      { name: "Balcony", icon: TreePine },
      { name: "Private Entrance", icon: Building },
    ],
    bedConfiguration: "Sleeps up to 6",
  },

  // Property 33117: Dalmatinska Cheyf Retreat
  // https://www.booking.com/hotel/ba/dalmatinska-cheyf-retreat.html
  68014: {
    images: [
      "/images/properties/dalmatinska.webp",
      "/images/properties/dalmatinska1.webp",
      "/images/properties/dalmatinska2.webp",
      "/images/properties/dalmatinska3.webp",
      "/images/properties/dalmatinska4.webp",
      "/images/properties/dalmatinska5.webp",
      "/images/properties/dalmatinska6.webp",
    ],
    description: `Comfortable Accommodations: Dalmatinska Cheyf Retreat in Sarajevo offers a two-bedroom apartment with a living room. The ground-floor unit features a kitchenette, bathrobes, and garden views. \n
    Modern Amenities: Guests enjoy free WiFi, a fully equipped kitchen, and a private entrance. Additional facilities include a minimarket, outdoor play area, laundry service, and a hairdresser. \n
    Prime Location: Located 5 mi from Sarajevo International Airport, the apartment is near attractions such as Sebilj Fountain (less than 0.6 mi) and Bascarsija Street (11-minute walk). An ice-skating rink is also nearby. \n
    Guest Satisfaction: Highly rated by guests, the property is praised for its friendly host.`,
    amenities: [
      { name: "Multiple Beds", icon: BedDouble },
      { name: "WiFi", icon: Wifi },
      { name: "Air Conditioning", icon: AirVentIcon },
      { name: "Kitchen", icon: CookingPot },
      { name: "Heating", icon: Heater },
      { name: "Private Bathroom", icon: Toilet },
    ],
    bedConfiguration: "Sleeps up to 4",
  },

  // Property 33197: Cozy Studio in the City Center
  // https://www.booking.com/hotel/ba/cozy-studio-in-the-city-center.html
  68192: {
    images: [
      "/images/properties/cozy.webp",
      "/images/properties/cozy1.webp",
      "/images/properties/cozy2.webp",
      "/images/properties/cozy3.webp",
      "/images/properties/cozy4.webp",
      "/images/properties/cozy5.webp",
      "/images/properties/cozy6.webp",
    ],
    description: `Comfortable Living Space: Cozy Studio in the City Center offers a one-bedroom apartment in Sarajevo. The property features a living room, a fully equipped kitchen, and a washing machine. Free WiFi is available throughout the apartment. 
    \n Convenient Facilities: Guests can enjoy a washing machine, a TV, and a washing machine. The apartment includes a washing machine, a fully equipped kitchen, and a TV. 
    \n Prime Location: Located 5 mi from Sarajevo International Airport, the apartment is close to attractions such as Sebilj Fountain (18-minute walk), Bascarsija Street (1 mi), and the Eternal Flame (2625 feet). An ice-skating rink is also nearby.`,
    amenities: [
      { name: "Double Bed", icon: BedDouble },
      { name: "WiFi", icon: Wifi },
      { name: "Kitchen", icon: CookingPot },
      { name: "Heating", icon: Heater },
      { name: "City Center", icon: TreePine },
      { name: "Private Bathroom", icon: Toilet },
    ],
    bedConfiguration: "Sleeps up to 3",
  },

  // Property 33239: 1Bdr apartment in the heart of Sarajevo Old Town
  // https://www.booking.com/hotel/ba/1bdr-apartment-in-the-heart
  // -of-sarajevo-old-town.html
  68310: {
    images: [
      "/images/properties/oldtown.webp",
      "/images/properties/oldtown1.webp",
      "/images/properties/oldtown2.webp",
      "/images/properties/oldtown3.webp",
      "/images/properties/oldtown4.webp",
      "/images/properties/oldtown5.webp",
      "/images/properties/oldtown6.webp",
      "/images/properties/oldtown7.webp",
      "/images/properties/oldtown8.webp",
    ],
    description: `Comfortable Living Space: The apartment offers one bedroom and one bathroom with a kitchenette, air-conditioning, and a dining area. Guests enjoy free WiFi, a work desk, and a sofa bed.\n
      Convenient Facilities: Private check-in and check-out, a 24-hour front desk, and free on-site parking are available. Additional services include a paid shuttle and family rooms.\n
      Prime Location: Located in Sarajevo, the property is 6.2 mi from Sarajevo International Airport. Nearby attractions include Latin Bridge (7-minute walk), Sebilj Fountain (less than 0.6 mi), and Bascarsija Street (10-minute walk). An ice-skating rink is also in the surroundings.`,
    amenities: [
      { name: "Queen Bed", icon: BedDouble },
      { name: "WiFi", icon: Wifi },
      { name: "Kitchen", icon: CookingPot },
      { name: "Heating", icon: Heater },
      { name: "Historic Location", icon: TreePine },
      { name: "Private Bathroom", icon: Toilet },
    ],
    bedConfiguration: "1 Queen Bed",
  },

  // Property 33276: Safveta Bega
  // airbnb.com/h/charming-sarajevo-old-town
  68351: {
    images: [
      "/images/properties/safveta.webp",
      "/images/properties/safveta1.webp",
      "/images/properties/safveta2.webp",
      "/images/properties/safveta3.webp",
      "/images/properties/safveta4.webp",
      "/images/properties/safveta5.webp",
      "/images/properties/safveta6.webp",
    ],
    description: `Charming and bright, newly renovated flat on the first floor of a small building within a quiet neighborhood in the heart of Old Town (Bascarsija). Located only 250 m from the Sebilj (central spot in Bascarsija). A great base from which to explore Sarajevo and walk to all the main sights. Accommodates up to 5 guests.
        Fully renovated apartment with one bedroom with King size bed; a living room with one Queen/full pull out sofa bed (160x200cm) and one standard single studio bed (200x80cm) ; 
        a fully equipped modern kitchen with hob, microwave, fridge/freezer, kettle and necessary kitchen wear including basic ingredients; a modern bathroom with shower, washing machine, hairdryer, iron and essentials. 
        The living room has cable TV with DVD player and air conditioning. You will also find books to relax with on the couch or armchair.\n
        The entire flat is at your disposal
        Free WiFi
        All bed linen and towels are provided
        Complimentary toiletries and bottle of wine`,
    amenities: [
      { name: "Multiple Beds", icon: BedDouble },
      { name: "WiFi", icon: Wifi },
      { name: "Kitchen", icon: CookingPot },
      { name: "Heating", icon: Heater },
      { name: "Private Bathroom", icon: Toilet },
    ],
    bedConfiguration: "Sleeps up to 5",
  },

  // Property 33450: Cheyf in Grbavička
  // https://www.booking.com/hotel/ba/cheyf-in-grbavicka.html
  68598: {
    images: [
      "/images/properties/grbavicka.webp",
      "/images/properties/grbavicka1.webp",
      "/images/properties/grbavicka2.webp",
      "/images/properties/grbavicka3.webp",
      "/images/properties/grbavicka4.webp",
      "/images/properties/grbavicka5.webp",
      "/images/properties/grbavicka6.webp",
      "/images/properties/grbavicka7.webp",
    ],
    description: `Comfortable Living Space: Cheyf in Grbavička offers a one-bedroom apartment in Sarajevo. The property features a private entrance, city views, and a quiet street setting.\n
      Modern Amenities: Guests enjoy free WiFi, a fully equipped kitchen, washing machine, and streaming services. Additional amenities include a dining area, sofa bed, and work desk.\n
      Convenient Services: The apartment provides private check-in and check-out, a paid shuttle service, car hire, and free off-site parking.\n
      Nearby Attractions: Located 3.7 mi from Sarajevo International Airport, the property is close to Avaz Twist Tower (1.1 mi) and Sarajevo National Theater (1.4 mi). An ice-skating rink is also nearby.`,
    amenities: [
      { name: "Double Bed", icon: BedDouble },
      { name: "WiFi", icon: Wifi },
      { name: "Air Conditioning", icon: AirVentIcon },
      { name: "Kitchen", icon: CookingPot },
      { name: "Parking", icon: ParkingCircle },
      { name: "Private Bathroom", icon: Toilet },
    ],
    bedConfiguration: "1 Double Bed",
  },

  // Property 33617: Cheyf in Willson's Alley
  // https://www.booking.com/hotel/ba/cheyf-in-willsons-alley.html
  69187: {
    images: [
      "/images/properties/willson.webp",
      "/images/properties/willson1.webp",
      "/images/properties/willson2.webp",
      "/images/properties/willson3.webp",
      "/images/properties/willson4.webp",
      "/images/properties/willson5.webp",
      "/images/properties/willson6.webp",
    ],
    description: `Comfortable Living Space: Cheyf in Willson's alley offers a one-bedroom apartment in Sarajevo. The property features a terrace, balcony, and city views. Free WiFi and air-conditioning ensure a pleasant stay.\n
      Modern Amenities: The apartment includes a fully equipped kitchen with a refrigerator, microwave, dishwasher, and oven. Additional amenities include a washing machine, dining area, sofa bed, and work desk. Free off-site parking is available.\n
      Prime Location: Located 3.7 mi from Sarajevo International Airport, the apartment is close to attractions such as Latin Bridge (2.7 mi), Sebilj Fountain (3.1 mi), and Bascarsija Street (3.1 mi). The Sarajevo War Tunnel is 5 mi away.`,
    amenities: [
      { name: "Double Bed", icon: BedDouble },
      { name: "WiFi", icon: Wifi },
      { name: "Kitchen Access", icon: CookingPot },
      { name: "Heating", icon: Heater },
      { name: "Private Bathroom", icon: Toilet },
    ],
    bedConfiguration: "1 Double Bed",
  },
};
