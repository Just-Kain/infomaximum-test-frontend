import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { carStore } from '../../store/CarStore';
import Header from '../../components/Header/Header';
import './Favorites.css';

const Favorites: FC = observer(() => {
  const { favorites, removeFromFavorites } = carStore;
  const navigate = useNavigate();

  return (
    <div className="favorites-page">
      <Header />
      <main className="favorites-content">
        <h1 className="favorites-title">
          Избранные товары - {favorites.length} позиций
        </h1>
        
        {favorites.length === 0 ? (
          <div className="favorites-empty">
            <p>В избранном пока нет автомобилей</p>
            <button 
              className="favorites-back-button"
              onClick={() => navigate('/')}
            >
              Перейти в каталог
            </button>
          </div>
        ) : (
          <div className="favorites-grid">
            {favorites.map(car => (
              <div key={car.id} className="favorites-horizontal-card">
                <div className="favorites-horizontal-card__image-container">
                  <img 
                    className="favorites-horizontal-card__image"
                    src={`http://localhost:4000${car.img_src}`} 
                    alt={`${car.brand} ${car.model}`} 
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Car+Image';
                    }}
                  />
                </div>
                
                <div className="favorites-horizontal-card__content">
                  <div className="favorites-horizontal-card__header">
                    <h3 className="favorites-horizontal-card__title">
                      {car.brand} {car.model}
                    </h3>

                  </div>
                  
                  <div className="favorites-horizontal-card__detail-label">Год выпуска: {car.model_year}</div>
                  <div className="favorites-horizontal-card__detail-label">Цвет: {car.color}</div>
                  
                  {car.description && (
                    <div className="favorites-horizontal-card__description">
                      {car.description}
                    </div>
                  )}

                  <p className="favorites-horizontal-card__price">
                    от {car.price}
                  </p>
                  
                  <div className="favorites-horizontal-card__actions">
                    <button 
                      className="favorites-horizontal-card__button favorites-horizontal-card__button--primary"
                      onClick={() => console.log('Выбрать комплектацию для', car.id)}
                    >
                      <span>Выбрать комплектацию</span>
                    </button>
                    <button 
                      className="favorites-horizontal-card__button favorites-horizontal-card__button--danger"
                      onClick={() => removeFromFavorites(car.id)}
                    >
                      <span>Удалить из избранного</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
});

export default Favorites;