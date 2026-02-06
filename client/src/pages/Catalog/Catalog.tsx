import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { carStore } from '../../store/CarStore';
import CarCard from '../../components/CarCard/CarCard';
import Header from '../../components/Header/Header';
import './Catalog.css';

const Catalog: FC = observer(() => {
  const { 
    filteredCars, 
    isLoading, 
    error, 
    searchQuery, 
    sortOption,
    fetchCars,
    setSearchQuery,
    setSortOption 
  } = carStore;

  useEffect(() => {
    fetchCars();
  }, []);

  if (isLoading) {
    return (
      <div className="catalog-page">
        <Header />
        <main className="catalog-content">
          <div className="catalog-loading">Загрузка автомобилей...</div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="catalog-page">
        <Header />
        <main className="catalog-content">
          <div className="catalog-error">{error}</div>
        </main>
      </div>
    );
  }

  return (
    <div className="catalog-page">
      <Header />
      <main className="catalog-content">
        <div className="catalog-filters">
          <input
            type="text"
            className="catalog-search-input"
            placeholder="Поиск по названию автомобиля..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="catalog-sort-select"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as 'brand' | 'price')}
          >
            <option value="brand">Сортировать по названию</option>
            <option value="price">Сортировать по цене</option>
          </select>
        </div>

        {filteredCars.length === 0 ? (
          <div className="catalog-no-results">Автомобили не найдены</div>
        ) : (
          <div className="catalog-grid">
            {filteredCars.map(car => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
});

export default Catalog;