const mongoose = require("mongoose")

const pokemonSchema = new mongoose.Schema({
  name: String,
  url: String
})

const Pokemon = mongoose.model("Pokemon", pokemonSchema)

module.exports = Pokemon