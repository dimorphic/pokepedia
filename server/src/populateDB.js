import fs from 'fs';
import mongoose from 'mongoose';

import Pokemon from './models/pokemon';
import dbUrl from './config/database';
import pokemonJSON from '../../shared/data/pokemon/pokedex.en.build.json';

const mongoOptions = { db: { safe: true } };

mongoose.connect(dbUrl, mongoOptions, function (err, res) {
  if (err) {
    console.log('ERROR connecting to: ' + dbUrl + '. ' + err);
  } else {
    console.log('Successfully connected to: ' + dbUrl);
    pokemonJSON.forEach((pokemon)=> {
      const PokemonModel = new Pokemon(pokemon);
      PokemonModel.save();
    });
  }
});
