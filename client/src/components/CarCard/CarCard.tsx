import React, { FC } from 'react';
import { Car } from '../../types/car';
import { carStore } from '../../store/CarStore';
import { observer } from 'mobx-react-lite';
import styled from '@emotion/styled';

const Card = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 16px rgba(0,0,0,0.15);
  }
`;

const CarImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 1rem;
`;

const CarTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  color: #333;
`;

const CarInfo = styled.p`
  margin: 0.25rem 0;
  color: #666;
  font-size: 0.9rem;
`;

const Price = styled.p`
  margin: 1rem 0;
  font-size: 1.3rem;
  font-weight: bold;
  color: #ff6b6b;
`;

const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const Button = styled.button`
  flex: 1;
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
`;

const BuyButton = styled(Button)`
  background-color: #4CAF50;
  color: white;
  
  &:hover {
    background-color: #45a049;
  }
`;

const FavoriteButton = styled(Button)<{ isFavorite: boolean }>`
  background-color: ${props => props.isFavorite ? '#ff6b6b' : '#f0f0f0'};
  color: ${props => props.isFavorite ? 'white' : '#333'};
  
  &:hover {
    background-color: ${props => props.isFavorite ? '#ff5252' : '#e0e0e0'};
  }
`;

interface CarCardProps {
  car: Car;
  isFavoriteView?: boolean;
}

const CarCard: FC<CarCardProps> = observer(({ car, isFavoriteView = false }) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = carStore;

  const handleFavoriteClick = () => {
    if (isFavorite(car.id)) {
      removeFromFavorites(car.id);
    } else {
      addToFavorites(car);
    }
  };

  return (
    <Card>
      <CarImage src={`http://localhost:4000${car.img_src}`} alt={`${car.brand} ${car.model}`} />
      <CardContent>
        <CarTitle>{car.brand} {car.model}</CarTitle>
        <CarInfo>Год: {car.model_year}</CarInfo>
        <CarInfo>Цвет: {car.color}</CarInfo>
        
        {isFavoriteView && (
          <CarInfo>{car.description}</CarInfo>
        )}
        
        <Price>от {car.price}</Price>
        
        <Actions>
          {isFavoriteView ? (
            <>
              <BuyButton>Выбрать комплектацию</BuyButton>
              <FavoriteButton 
                isFavorite={true}
                onClick={() => removeFromFavorites(car.id)}
              >
                Удалить
              </FavoriteButton>
            </>
          ) : (
            <>
              <BuyButton>Купить</BuyButton>
              <FavoriteButton 
                isFavorite={isFavorite(car.id)}
                onClick={handleFavoriteClick}
              >
                {isFavorite(car.id) ? 'В избранном' : 'В избранное'}
              </FavoriteButton>
            </>
          )}
        </Actions>
      </CardContent>
    </Card>
  );
});

export default CarCard;