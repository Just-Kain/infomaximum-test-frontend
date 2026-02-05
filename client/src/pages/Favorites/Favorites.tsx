import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { carStore } from '../../store/CarStore';
import CarCard from '../../components/CarCard/CarCard';
import Header from '../../components/Header/Header';
import styled from '@emotion/styled';

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #f5f5f5;
`;

const Content = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const CarsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 3rem;
  font-size: 1.2rem;
  color: #666;
  
  p {
    margin: 1rem 0;
  }
`;

const BackButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #ff5252;
  }
`;

const Favorites: FC = observer(() => {
  const { favorites } = carStore;

  return (
    <PageContainer>
      <Header />
      <Content>
        {favorites.length === 0 ? (
          <EmptyMessage>
            <p>В избранном пока нет автомобилей</p>
            <BackButton onClick={() => window.location.href = '/'}>
              Перейти в каталог
            </BackButton>
          </EmptyMessage>
        ) : (
          <CarsGrid>
            {favorites.map(car => (
              <CarCard key={car.id} car={car} isFavoriteView={true} />
            ))}
          </CarsGrid>
        )}
      </Content>
    </PageContainer>
  );
});

export default Favorites;