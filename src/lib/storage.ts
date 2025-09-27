export type Vehicle = {
  id: number;
  name: string;
  price: string;
  year: string;
  km: string;
  fuel: string;
  location: string;
  images: string[]; // data URLs or external URLs
  description?: string;
  featured?: boolean;
};

const KEY = 'crimson:vehicles';

export function loadVehicles(): Vehicle[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultVehicles();
    return JSON.parse(raw) as Vehicle[];
  } catch (e) {
    console.error('Failed to load vehicles from storage', e);
    return defaultVehicles();
  }
}

export function saveVehicles(vehicles: Vehicle[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(vehicles));
  } catch (e) {
    console.error('Failed to save vehicles to storage', e);
  }
}

function defaultVehicles(): Vehicle[] {
  return [
    {
      id: 1,
      name: 'Honda Civic 2023',
      price: 'R$ 125.000',
      year: '2023',
      km: '15.000 km',
      fuel: 'Flex',
      location: 'São Paulo, SP',
  images: ['https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&h=800&fit=crop&crop=center'],
      description: 'Civic 2023 impecável, único dono, revisões em dia e baixa quilometragem.',
      featured: true,
    },
    {
      id: 2,
      name: 'Toyota Corolla 2022',
      price: 'R$ 110.000',
      year: '2022',
      km: '28.000 km',
      fuel: 'Flex',
      location: 'São Paulo, SP',
  images: ['https://images.unsplash.com/photo-1549399137-99c61b4df73b?w=1200&h=800&fit=crop&crop=center'],
      description: 'Corolla bem conservado, equipado e econômico.',
      featured: false,
    },
  ];
}
