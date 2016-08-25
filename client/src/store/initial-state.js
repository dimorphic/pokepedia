//
//  APP INITIAL STATE
//
export const POKEDEX_STATE = {
  pokemons: [],
  items: [],
  levels: []
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
