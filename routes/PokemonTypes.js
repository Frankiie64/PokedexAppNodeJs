const express = require('express');
const router =  express.Router();

const typePokemonController = require("../controllers/pokemonTypeController");

router.get("/tipo/pokemones",typePokemonController.getIndex);

router.get("/tipo/pokemones/crearTipoPokemon",typePokemonController.createTypePokemonGet);
router.post("/tipo/pokemones/crearTipoPokemon",typePokemonController.createTypePokemonPost);

router.get("/tipo/pokemones/editarTipoPokemon/:idTipoPokemon",typePokemonController.editTypePokemonGet);
router.post("/tipo/pokemones/editarTipoPokemon",typePokemonController.editTypePokemonPost);

router.get("/tipo/pokemones/eliminarTipoPokemon/:idTipoPokemon",typePokemonController.deleteTypePokemonGet);
router.post("/tipo/pokemones/eliminarTipoPokemon",typePokemonController.deleteTypePokemonPost);



module.exports = router;