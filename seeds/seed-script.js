// este archivo lo ejecutamos 1 vez, y agregará todos los pokemon a la DB


// 1. buscar la data a agregar
const pokemonArr = require("./pokemon.seed.json")

// 2. contectar a la base de datos
require("../db")

// 2.5 ... ???
const Pokemon = require("../models/Pokemon.model.js")

// 3. agregar la data a la base de datos
Pokemon
.insertMany(pokemonArr)
.then(() => {
  console.log("todo bien, pokemons agregados")
})
.catch((err) => {
  console.log(err)
})