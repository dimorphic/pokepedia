//
//  APP INITIAL STATE
//
export const LOCATION_STATE = {
  lat: null,
  long: null
};

export const POKEDEX_STATE = {
  pokemons: [],
  items: [],
  rewards: []
};

export const FILTERS_STATE = {
  search: {
    query: ''
  }
};

// expose INITIAL state
export default {
  pokedex: POKEDEX_STATE,
  filters: FILTERS_STATE
};
