import { gql } from 'graphql-request';

export const GET_CARS = gql`
  query {
    cars {
      id
      brand
      model
      color
      model_year
      img_src
      price
      description
      availability
    }
  }
`;