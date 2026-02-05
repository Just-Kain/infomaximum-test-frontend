import { makeAutoObservable, runInAction } from 'mobx';
import { Car, SortOption } from '../types/car';
import { graphQLClient } from '../graphql/client';
import { GET_CARS } from '../graphql/queries';

class CarStore {
  cars: Car[] = [];
  favorites: Car[] = [];
  isLoading : Boolean = false;
  error: string | null = null;
  searchQuery = '';
  sortOption: SortOption = 'brand';
  selectedCity = '';
  phoneNumber = '';

  constructor() {
    makeAutoObservable(this);
  }

  fetchCars = async () => {
    runInAction(() => {
      this.isLoading = true;
      this.error = null;
    });
    
    try {
      const data: { cars: Car[] } = await graphQLClient.request(GET_CARS);
      runInAction(() => {
        this.cars = data.cars;
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = 'Ошибка при загрузке данных';
        this.isLoading = false;
      });
    }
  }

  addToFavorites = (car: Car) => {
    if (!this.favorites.some(fav => fav.id === car.id)) {
      this.favorites.push(car);
      console.log('car add to favorite', car)
    }
  }

  removeFromFavorites = (carId: number) => {
    this.favorites = this.favorites.filter(car => car.id !== carId);
  }

  setSearchQuery = (query: string) => {
    this.searchQuery = query;
  }

  setSortOption = (option: SortOption) => {
    this.sortOption = option;
  }

  setSelectedCity = (city: string) => {
    this.selectedCity = city;
  }

  setPhoneNumber = (phone: string) => {
    this.phoneNumber = phone;
  }

  get filteredCars(): Car[] {
    let filtered = [...this.cars];
    
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(car => 
        car.brand.toLowerCase().includes(query) || 
        car.model.toLowerCase().includes(query)
      );
    }
    
    filtered.sort((a, b) => {
      if (this.sortOption === 'brand') {
        return a.brand.localeCompare(b.brand);
      } else {
        const priceA = parseFloat(a.price.replace('$', ''));
        const priceB = parseFloat(b.price.replace('$', ''));
        return priceA - priceB;
      }
    });
    
    return filtered;
  }

  isFavorite = (carId: number): boolean => {
    return this.favorites.some(car => car.id === carId);
  }
}

export const carStore = new CarStore();