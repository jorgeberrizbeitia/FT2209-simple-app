const router = require("express").Router();
const Pokemon = require("../models/Pokemon.model.js")
const capitalized = require("../utils/capitalized.js")

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

// ruta para renderizar todos los nombres de los pokemon
router.get("/pokemon", (req, res, next) => {

  // modelo???
  Pokemon.find().select("name")
  .then((response) => {
    // then
    
    // antes de enviar la data tenemos que capitalizar cada pokemon
    const responseClone = JSON.parse(JSON.stringify(response)) // hacer deep clone
    responseClone.forEach((eachPokemon) => {
      eachPokemon.name = capitalized(eachPokemon.name)
    })
    console.log(responseClone)
    
    res.render("pokemon/all-pokemon.hbs", {
      pokemonList: responseClone
    })
  })
  .catch((err) => {
    next(err)
  })

})

// ruta para renderizar una pagina donde buscar pokemon
router.get("/pokemon/search", (req, res, next) => {

  console.log(req.query) // informacion que viene de campo de busqueda



  const { pokeName } = req.query
  console.log(pokeName)

  if (pokeName === undefined) {
    res.render("pokemon/poke-search.hbs")
  } else {
    Pokemon.findOne({name: pokeName})
    .then((response) => {
      console.log(response)
      res.render("pokemon/poke-search.hbs", {
        details: response
      })
    })
    .catch((err) => {
      next(err)
    })
  }


})

// ruta para renderizar los detalles de un pokemon
router.get("/pokemon/:pokeId", (req, res, next) => {

  const { pokeId } = req.params

  // Pokemon.findOne({"_id": pokeId})
  Pokemon.findById(pokeId)
  .then((response) => {
    console.log(response)
    res.render("pokemon/pokemon-details.hbs", {
      details: response
    })
  })
  .catch((err) => {
    next(err) // de esto se ocupará nuestro error-handler de tipo 500
  })

})





module.exports = router;
