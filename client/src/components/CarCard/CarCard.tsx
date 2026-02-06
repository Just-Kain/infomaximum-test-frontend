import React, { FC } from 'react';
import { Car } from '../../types/car';
import { carStore } from '../../store/CarStore';
import { observer } from 'mobx-react-lite';
import './CarCard.css'; 

interface CarCardProps {
  car: Car;
  isFavoriteView?: boolean;
}

const CarCard: FC<CarCardProps> = observer(({ car, isFavoriteView = false }) => {
  const favorite = carStore.isFavorite(car.id);
  
  const handleFavoriteClick = () => {
    console.log('Favorite click:', {
      carId: car.id,
      currentFavorite: favorite,
      action: favorite ? 'remove' : 'add'
    });
    
    if (favorite) {
      carStore.removeFromFavorites(car.id);
    } else {
      carStore.addToFavorites(car);
    }
  };

  const getFavoriteButtonClass = () => {
    if (isFavoriteView) {
      return 'car-card__button car-card__button--favorite-active';
    }
    return favorite 
      ? 'car-card__button car-card__button--favorite-active'
      : 'car-card__button car-card__button--favorite';
  };

  return (
    <div className="car-card">
      <img 
        className="car-card__image"
        src={`http://localhost:4000${car.img_src}`} 
        alt={`${car.brand} ${car.model}`} 
        onError={(e) => {
          e.currentTarget.src = 'https://via.placeholder.com/300x200?text=Car+Image';
        }}
      />
      <div className="car-card__content">
        <h3 className="car-card__title">{car.brand} {car.model}</h3>
        <p className="car-card__info">Год: {car.model_year}</p>
        <p className="car-card__info">Цвет: {car.color}</p>
        
        {isFavoriteView && car.description && (
          <p className="car-card__info">{car.description}</p>
        )}
        
        <p className="car-card__price">от {car.price}</p>
        
        <div className="car-card__actions">
          {isFavoriteView ? (
            <>
              <button 
                className="car-card__button car-card__button--buy"
                onClick={() => console.log('Выбрать комплектацию для', car.id)}
              >
                Выбрать комплектацию
              </button>
              <button 
                className="car-card__button car-card__button--favorite-active"
                onClick={() => carStore.removeFromFavorites(car.id)}
              >
                Удалить
              </button>
            </>
          ) : (
            <>
              <button 
                className="car-card__button car-card__button--buy"
                onClick={() => console.log('Купить', car.id)}
              >
                Купить
              </button>
              <button 
                className={getFavoriteButtonClass()}
                onClick={handleFavoriteClick}
              >
                {favorite 
                ? <div className='full-heart-icon'></div>
                : <div className='gg-heart'></div>
                }
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
});

export default CarCard;