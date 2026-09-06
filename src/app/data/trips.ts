// Single source of truth for the Wanderly trip catalog.
// Destinations / Trips / Trip Details / Bookings all read from here instead
// of keeping their own copies, so a trip's id and data are consistent
// everywhere in the app. This is a static in-memory catalog for now; once a
// real backend exists, getAllTrips()/getTripById() can be swapped for HTTP
// calls without touching the pages that consume them.

export interface Trip {
  id: number;
  name: string;
  city: string;
  region: string;
  location: string;
  image: string;
  price: number;
  duration: string;
  rating: number;
  category: string;
  badge: string;
  badgeClass: string;
  description: string;
}

const TRIPS: Trip[] = [
  {
    id: 1,
    name: 'Bali Island Escape',
    city: 'Ubud',
    region: 'Asia',
    location: 'Ubud, Indonesia',
    image:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=85',
    price: 599,
    duration: '5 Days',
    rating: 4.8,
    category: 'Beach',
    badge: 'Trending',
    badgeClass: 'badge-trending',
    description: 'A relaxing island escape through rice terraces, temples and beach clubs.',
  },
  {
    id: 2,
    name: 'Paris City Highlights',
    city: 'Paris',
    region: 'Europe',
    location: 'Paris, France',
    image:
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=85',
    price: 799,
    duration: '6 Days',
    rating: 4.7,
    category: 'Cultural',
    badge: 'Popular',
    badgeClass: 'badge-popular',
    description: 'Explore the Eiffel Tower, Louvre and charming Parisian streets.',
  },
  {
    id: 3,
    name: 'Phuket Adventure Tour',
    city: 'Phuket',
    region: 'Asia',
    location: 'Phuket, Thailand',
    image:
      'https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=1200&q=85',
    price: 699,
    duration: '7 Days',
    rating: 4.9,
    category: 'Adventure',
    badge: 'Bestseller',
    badgeClass: 'badge-bestseller',
    description: 'Island hopping, snorkeling and adventure sports in Phuket.',
  },
  {
    id: 4,
    name: 'Dubai Desert Safari',
    city: 'Dubai',
    region: 'Middle East',
    location: 'Dubai, UAE',
    image:
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=85',
    price: 899,
    duration: '4 Days',
    rating: 4.6,
    category: 'Adventure',
    badge: 'Bestseller',
    badgeClass: 'badge-bestseller',
    description: 'Desert safaris, dune bashing and skyline views in Dubai.',
  },
  {
    id: 5,
    name: 'Swiss Alps Trek',
    city: 'Zermatt',
    region: 'Europe',
    location: 'Zermatt, Switzerland',
    image:
      'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1200&q=85',
    price: 1099,
    duration: '8 Days',
    rating: 4.9,
    category: 'Mountain',
    badge: 'Trending',
    badgeClass: 'badge-trending',
    description: 'Trek through the Swiss Alps with breathtaking mountain views.',
  },
  {
    id: 6,
    name: 'Santorini Sunset Sail',
    city: 'Santorini',
    region: 'Europe',
    location: 'Santorini, Greece',
    image:
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=85',
    price: 849,
    duration: '5 Days',
    rating: 4.8,
    category: 'Beach',
    badge: 'Popular',
    badgeClass: 'badge-popular',
    description: 'Sail the Aegean Sea and watch the famous Santorini sunset.',
  },
  {
    id: 7,
    name: 'Italian Riviera Escape',
    city: 'Cinque Terre',
    region: 'Europe',
    location: 'Cinque Terre, Italy',
    image:
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=85',
    price: 949,
    duration: '6 Days',
    rating: 4.8,
    category: 'Cultural',
    badge: 'Trending',
    badgeClass: 'badge-trending',
    description: 'Colorful coastal villages, fresh pasta and Mediterranean views.',
  },
  {
    id: 8,
    name: 'Japanese Temple Trail',
    city: 'Kyoto',
    region: 'Asia',
    location: 'Kyoto, Japan',
    image:
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=85',
    price: 1199,
    duration: '9 Days',
    rating: 4.9,
    category: 'Cultural',
    badge: 'Bestseller',
    badgeClass: 'badge-bestseller',
    description: 'Ancient temples, gardens and tea ceremonies in historic Kyoto.',
  },
  {
    id: 9,
    name: 'Amazon Rainforest Expedition',
    city: 'Manaus',
    region: 'Americas',
    location: 'Manaus, Brazil',
    image:
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=85',
    price: 1299,
    duration: '7 Days',
    rating: 4.7,
    category: 'Adventure',
    badge: 'Trending',
    badgeClass: 'badge-trending',
    description: 'Deep jungle exploration with wildlife spotting and river cruises.',
  },
  {
    id: 10,
    name: 'Maldives Overwater Getaway',
    city: 'Malé',
    region: 'Asia',
    location: 'Malé, Maldives',
    image:
      'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=85',
    price: 1499,
    duration: '5 Days',
    rating: 5.0,
    category: 'Beach',
    badge: 'Bestseller',
    badgeClass: 'badge-bestseller',
    description: 'Overwater bungalows, turquoise lagoons and world-class diving.',
  },
  {
    id: 11,
    name: 'Icelandic Highlands Tour',
    city: 'Reykjavik',
    region: 'Europe',
    location: 'Reykjavik, Iceland',
    image:
      'https://images.unsplash.com/photo-1504829857797-ddff29c27927?auto=format&fit=crop&w=1200&q=85',
    price: 1099,
    duration: '6 Days',
    rating: 4.9,
    category: 'Mountain',
    badge: 'Popular',
    badgeClass: 'badge-popular',
    description: 'Glaciers, waterfalls and the northern lights across the highlands.',
  },
  {
    id: 12,
    name: 'Moroccan Desert Journey',
    city: 'Marrakech',
    region: 'Africa',
    location: 'Marrakech, Morocco',
    image:
      'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&w=1200&q=85',
    price: 749,
    duration: '5 Days',
    rating: 4.6,
    category: 'Adventure',
    badge: 'Trending',
    badgeClass: 'badge-trending',
    description: 'Sahara dunes, camel treks and vibrant Marrakech souks.',
  },
  {
    id: 13,
    name: 'Barcelona City Break',
    city: 'Barcelona',
    region: 'Europe',
    location: 'Barcelona, Spain',
    image:
      'https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1200&q=85',
    price: 699,
    duration: '5 Days',
    rating: 4.7,
    category: 'Cultural',
    badge: 'Popular',
    badgeClass: 'badge-popular',
    description: 'Gaudí architecture, tapas and the vibrant streets of Barcelona.',
  },
  {
    id: 14,
    name: 'Istanbul Heritage Tour',
    city: 'Istanbul',
    region: 'Middle East',
    location: 'Istanbul, Turkey',
    image:
      'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=85',
    price: 749,
    duration: '6 Days',
    rating: 4.7,
    category: 'Cultural',
    badge: 'Trending',
    badgeClass: 'badge-trending',
    description: 'Where East meets West — mosques, bazaars and Bosphorus views.',
  },
  {
    id: 15,
    name: 'New York City Explorer',
    city: 'New York',
    region: 'Americas',
    location: 'New York, USA',
    image:
      'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=85',
    price: 999,
    duration: '5 Days',
    rating: 4.6,
    category: 'Cultural',
    badge: 'Popular',
    badgeClass: 'badge-popular',
    description: 'Skyscrapers, Broadway shows and the energy of the Big Apple.',
  },
  {
    id: 16,
    name: 'Nile Cruise & Pyramids',
    city: 'Cairo',
    region: 'Africa',
    location: 'Cairo, Egypt',
    image:
      'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=1200&q=85',
    price: 549,
    duration: '7 Days',
    rating: 4.8,
    category: 'Cultural',
    badge: 'Bestseller',
    badgeClass: 'badge-bestseller',
    description: 'Sail the Nile and stand before the ancient pyramids of Giza.',
  },
];

export function getAllTrips(): Trip[] {
  return TRIPS;
}

export function getTripById(id: number): Trip | undefined {
  return TRIPS.find((t) => t.id === id);
}