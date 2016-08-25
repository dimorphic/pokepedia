// deps
import { PropTypes } from 'react';

export default {
  id: PropTypes.number,
  pokemonId: PropTypes.string,

  name: PropTypes.string,
  capture_rate: PropTypes.number,
  flee_rate: PropTypes.number,

  candy_count: PropTypes.number,
  candy_name: PropTypes.string,

  egg: PropTypes.number,
  multipliers: PropTypes.arrayOf(PropTypes.number),

  stats: PropTypes.shape({
    attack: PropTypes.number,
    defense: PropTypes.number,
    stamina: PropTypes.number,
    height: PropTypes.number,
    weight: PropTypes.number
  }),

  type: PropTypes.arrayOf(PropTypes.string),
  weaknesses: PropTypes.arrayOf(PropTypes.string),

  next_evolution: PropTypes.arrayOf(PropTypes.object),
  prev_evolution: PropTypes.arrayOf(PropTypes.object)
};
