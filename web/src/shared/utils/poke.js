// deps
import POKEMON_COLORS from 'shared/constants/pokemon-type-colors';

// helper to map pokemon types to colors
function getPokemonTypeColors(types = []) {
  const pokemonColors = types.map((pokemonType) => {
    return POKEMON_COLORS[pokemonType].avatarColor;
  });

  return pokemonColors;
}

export function getPokemonStyles(types = []) {
  const pokemonColors = getPokemonTypeColors(types);

  const textColor = pokemonColors[0]; // first type color always
  let textShadow = null;
  let backgroundColor = pokemonColors[0];

  // generate gradient if more colors
  if (pokemonColors.length > 1) {
    const [fromColor, toColor] = pokemonColors;
    backgroundColor = `-webkit-linear-gradient(top, ${toColor} 0%, ${fromColor} 100%)`;
    textShadow = `1px 2px 0px ${toColor}`;
  }

  return {
    background: backgroundColor,
    textColor,
    textShadow
  };
}

// @TODO
// fast extract of pokemon types colors for use in SCSS
// export function getCSSColors() {
//   const cssColors = Object.keys(POKEMON_COLORS).map((type) => {
//     return `${type}: ${POKEMON_COLORS[type].avatarColor}`;
//   });
//
//   console.log('css colors @ ', cssColors);
// }
