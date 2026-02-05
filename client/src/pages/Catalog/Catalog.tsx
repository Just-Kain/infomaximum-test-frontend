import React, { FC, useEffect } from 'react';
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

const Filters = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  gap: 1rem;
  flex-wrap: wrap;
`;

const SearchInput = styled.input`
  flex: 1;
  min-width: 200px;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #ff6b6b;
  }
`;

const SortSelect = styled.select`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: #ff6b6b;
  }
`;

const CarsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const Loading = styled.div`
  text-align: center;
  padding: 3rem;
  font-size: 1.2rem;
  color: #666;
`;

const Error = styled.div`
  text-align: center;
  padding: 3rem;
  font-size: 1.2rem;
  color: #ff6b6b;
`;

const NoResults = styled.div`
  text-align: center;
  padding: 3rem;
  font-size: 1.2rem;
  color: #666;
`;

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
      <PageContainer>
        <Header />
        <Content>
          <Loading>Загрузка автомобилей...</Loading>
        </Content>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <Header />
        <Content>
          <Error>{error}</Error>
        </Content>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Header />
      <Content>
        <Filters>
          <SearchInput
            type="text"
            placeholder="Поиск по названию автомобиля..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <SortSelect
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as 'brand' | 'price')}
          >
            <option value="brand">Сортировать по названию</option>
            <option value="price">Сортировать по цене</option>
          </SortSelect>
        </Filters>

        {filteredCars.length === 0 ? (
          <NoResults>Автомобили не найдены</NoResults>
        ) : (
          <CarsGrid>
            {filteredCars.map(car => (
              <CarCard key={car.id} car={car} />
            ))}
          </CarsGrid>
        )}
      </Content>
    </PageContainer>
  );
});

export default Catalog;