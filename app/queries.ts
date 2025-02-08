import { gql } from '@apollo/client';

export const GET_CHARACTERS = (page: number) => gql`
  query {
    characters(page: ${page}) {
      info {
        count
      }
      results {
        name
        id
        status
        species
        image
        location {
          name
        }
        origin {
          name
        }
      }
    }
  }
`;
