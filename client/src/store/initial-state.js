//
//  APP INITIAL STATE
//
export const LOCATION_STATE = {
  lat: null,
  long: null
};

export const POKEDEX_STATE = {
  pokemons: []
};

export const FILTERS_STATE = {
  search: {
    query: ''
  }
};

// expose INITIAL state
export default {
  location: LOCATION_STATE,
  pokedex: POKEDEX_STATE
};
