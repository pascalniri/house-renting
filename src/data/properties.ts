export type PropertyType = "House" | "Apartment" | "Condo" | "Townhouse";

export interface Owner {
  name: string;
  phone: string;
  email: string;
  photoUrl: string;
}

export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  type: PropertyType;
  description: string;
  imageUrl: string;
  imageUrls: string[];
  owner: Owner;
}

export const properties: Property[] = [
  {
    id: "1",
    title: "Modern Minimalist Villa",
    location: "Beverly Hills, CA",
    price: 3500000,
    bedrooms: 4,
    bathrooms: 5,
    sqft: 4200,
    type: "House",
    description:
      "A stunning modern villa featuring open-plan living, floor-to-ceiling windows, a private pool, and expansive city views. The minimalist design emphasizes natural light and seamless indoor-outdoor living.",
    imageUrl:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2000",
    imageUrls: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2000",
      "https://images.unsplash.com/photo-1600607687931-cebf0052309f?auto=format&fit=crop&q=80&w=2000",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000"
    ],
    owner: {
      name: "Sarah Jenkins",
      phone: "+1 (555) 123-4567",
      email: "sarah.j@luxuryestates.com",
      photoUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    },
  },
  {
    id: "2",
    title: "Downtown Penthouse Oasis",
    location: "Manhattan, NY",
    price: 5200000,
    bedrooms: 3,
    bathrooms: 3.5,
    sqft: 3100,
    type: "Apartment",
    description:
      "Luxurious penthouse in the heart of the city with wrap-around terraces. Features custom Italian cabinetry, smart home integration, and exclusive access to building amenities including a rooftop pool.",
    imageUrl:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2000",
    imageUrls: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2000",
      "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=2000",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&q=80&w=2000"
    ],
    owner: {
      name: "Michael Chen",
      phone: "+1 (555) 987-6543",
      email: "michael.c@nyrealty.com",
      photoUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
    },
  },
  {
    id: "3",
    title: "Serene Woodland Retreat",
    location: "Aspen, CO",
    price: 2850000,
    bedrooms: 5,
    bathrooms: 4,
    sqft: 5500,
    type: "House",
    description:
      "Nestled in the pines, this contemporary mountain home offers a quiet escape. Highlights include a massive stone fireplace, vaulted timber ceilings, and ski-in/ski-out access.",
    imageUrl:
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=80&w=2000",
    imageUrls: [
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=80&w=2000",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&q=80&w=2000"
    ],
    owner: {
      name: "Elena Rodriguez",
      phone: "+1 (555) 321-0987",
      email: "elena.r@mountainhomes.com",
      photoUrl:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200",
    },
  },
  {
    id: "4",
    title: "Coastal Contemporary Townhome",
    location: "Malibu, CA",
    price: 1950000,
    bedrooms: 3,
    bathrooms: 2.5,
    sqft: 2200,
    type: "Townhouse",
    description:
      "Steps from the beach, this bright and airy townhome boasts ocean views from multiple balconies, a chef-grade kitchen, and a private rooftop deck perfect for sunset entertaining.",
    imageUrl:
      "https://images.unsplash.com/photo-1600607687931-cebf0052309f?auto=format&fit=crop&q=80&w=2000",
    imageUrls: [
      "https://images.unsplash.com/photo-1600607687931-cebf0052309f?auto=format&fit=crop&q=80&w=2000",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80&w=2000",
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&q=80&w=2000"
    ],
    owner: {
      name: "David Smith",
      phone: "+1 (555) 456-7890",
      email: "david.s@coastalproperties.com",
      photoUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    },
  },
  {
    id: "5",
    title: "Historic District Brownstone",
    location: "Boston, MA",
    price: 2450000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 3800,
    type: "House",
    description:
      "Beautifully restored brownstone with original architectural details blended seamlessly with modern updates. Features a private courtyard garden, exposed brick walls, and a gourmet kitchen.",
    imageUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000",
    imageUrls: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000",
      "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?auto=format&fit=crop&q=80&w=2000",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&q=80&w=2000"
    ],
    owner: {
      name: "Rachel Thompson",
      phone: "+1 (555) 234-5678",
      email: "rachel.t@historicboston.com",
      photoUrl:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
    },
  },
  {
    id: "6",
    title: "Skyline View Condo",
    location: "Chicago, IL",
    price: 1250000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1500,
    type: "Condo",
    description:
      "Ultra-modern condo featuring spectacular skyline and lake views. The unit includes premium finishes, a smart home automation system, and access to a state-of-the-art fitness center.",
    imageUrl:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=2000",
    imageUrls: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=2000",
      "https://images.unsplash.com/photo-1600607687931-cebf0052309f?auto=format&fit=crop&q=80&w=2000",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000"
    ],
    owner: {
      name: "James Wilson",
      phone: "+1 (555) 345-6789",
      email: "james.w@windycityre.com",
      photoUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    },
  },
];
