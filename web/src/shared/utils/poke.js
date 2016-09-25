// deps
import POKEMON_TYPES from 'shared/constants/pokemon-types';

export function getPokemonTypeColors(types = []) {
  const pokemonColors = types.map((pokemonType) => {
    return POKEMON_TYPES[pokemonType].avatarColor;
  });

  return pokemonColors;
}

export function getPokemonTypeBackground(types = []) {
  const pokemonColors = this.getPokemonTypeColors(types);

  let backgroundColor = pokemonColors[0];

  // generate gradient if more colors
  if (pokemonColors.length > 1) {
    const [fromColor, toColor] = pokemonColors;
    backgroundColor = `-webkit-linear-gradient(top, ${toColor} 0%, ${fromColor} 100%)`;
  }

  return {
    background: backgroundColor
  };
}
