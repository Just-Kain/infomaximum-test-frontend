export interface Car {
  id: number;
  brand: string;
  model: string;
  color: string;
  model_year: number;
  img_src: string;
  price: string;
  description: string;
  availability: boolean;
}

export interface CarsData {
  cars: Car[];
}

export type SortOption = 'brand' | 'price';