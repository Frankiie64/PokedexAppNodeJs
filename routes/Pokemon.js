const express = require('express');
const router =  express.Router();

const pokemonController = require("../controllers/pokemonController");

router.get("/pokemones",pokemonController.getIndex);

router.get("/pokemones/crearPokemon",pokemonController.createPokemonGet);
router.post("/pokemones/crearPokemon",pokemonController.createPokemonPost);

router.get("/pokemones/editarPokemon/:idPokemon",pokemonController.editPokemonGet);
router.post("/pokemones/editarPokemon",pokemonController.editPokemonPost);

router.get("/pokemones/eliminarPokemon/:idPokemon",pokemonController.deletePokemonGet);
router.post("/pokemones/eliminarPokemon",pokemonController.deletePokemonPost);

module.exports = router;