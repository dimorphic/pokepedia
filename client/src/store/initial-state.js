//
//  APP INITIAL STATE
//
export const LOCATION_STATE = {
  lat: null,
  long: null
};

export const POKEDEX_STATE = {
  data: []
};

// expose INITIAL state
export default {
  location: LOCATION_STATE,
  pokedex: POKEDEX_STATE
};
