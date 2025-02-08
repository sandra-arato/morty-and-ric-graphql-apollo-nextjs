// These types would be coming from the api sdk
// which i couldn't find for this api
export type Place = {
  name: string;
  url: string;
};

export type Character = {
  id: number;
  name: string;
  status: string;
  species: string; // will be an enum later
  type: string;
  gender: string; // will be an enum later
  origin: Place;
  location: Place;
  image: string;
  episode: string[];
};

export type CharacterData = {
  info: {
    count: number;
  };
  characters: {
    results: Character[];
  };
};
