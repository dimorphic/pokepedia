//
//  APP INITIAL STATE
//
export const GLOBAL_STATE = {
  requestsInProgress: 0
};

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
  global: GLOBAL_STATE,
  pokedex: POKEDEX_STATE,
  filters: FILTERS_STATE
};