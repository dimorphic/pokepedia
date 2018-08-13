# Pokepedia
Poke all the way!

![](/client/src/assets/social-card-01.png?raw=true)

### Requirements
Node `v6.3.1`

Npm `v3.10`

### Getting started
`$ npm i` (both in /client and /server)

`$ npm start`

#### Features:
- [x] Pokemons card listing
- [x] Pokemons search by name, type or id

![](/client/src/assets/social-card-02.png?raw=true)

#### TODO:
- [ ] Better docs!
- [ ] Switch API to Mongo storage
- [ ] Add Egg chart
- [ ] Add Level rewards chart
- [ ] Add Evolution Calculator
- [ ] Add Battle Calculator (X vs Y weaknesses)
- [ ] Add Players ladder system (based on number of caught Pokemons, pokeballs, etc ?)
- [ ] Add Map to report catched Pokemons
- [ ] Add 'live scan' support to Map to show nearby spawns of Pokemons

#### References:
Code (only worthy ones):
- https://github.com/cyraxx/pogobuf
- https://github.com/Armax/Pokemon-GO-node-api
- https://github.com/brentschooley/pokespotter
- https://github.com/Daplie/node-pokemap
- Map mining: https://github.com/TBTerra/spawnScan + https://github.com/TBTerra/spawnTracker

RAW data / formulas:
- [ ] Pokemon stats (extract stats patch?): https://github.com/justinleewells/pogo-optimizer/blob/master/data/game/pokemon.json
- [ ] Level rewards (extract item images & level rewards data?): http://pgopokedex.com/Leveling-rewards.html
- IV calculator : https://thesilphroad.com/research
- CP calculator: https://www.reddit.com/r/pokemongodev/comments/4t7xb4/exact_cp_formula_from_stats_and_cpm_and_an_update
- Poke details from protobuf: https://gist.github.com/anonymous/540700108cf0f051e11f70273e9e2590

Other collections / chat:
- https://github.com/tobiasbueschel/awesome-pokemon
- https://www.reddit.com/r/pokemongodev/
