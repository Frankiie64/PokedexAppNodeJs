const Pokemon = require("../models/Pokemon");
const PokemonType = require("../models/PokemonType");
const Region = require("../models/Region");

exports.getIndex = (req, res, next) => {
  Pokemon.findAll({ include: [{ model: Region }, { model: PokemonType }] })
    .then((result) => {
      const Pokemon = result.map((result) => result.dataValues);

      res.render("Pokemones/Index", {
        pageTitle: "Pokemones",
        module: "Pokemones",
        hasPokemon: Pokemon.length > 0,
        pokemon: Pokemon,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.createPokemonGet = (req, res, next) => {
  Region.findAll()
    .then((result) => {
      const region = result.map((result) => result.dataValues);
      PokemonType.findAll()
        .then((result) => {
          const pokemonType = result.map((result) => result.dataValues);
          res.render("Pokemones/savePokemon", {
            pageTitle: "Crear pokemon",
            module: "Pokemones",
            region: region,
            pokemonType: pokemonType,
            hasRegion: region.length > 0,
            hasPokemonTypes: pokemonType.length > 0,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.createPokemonPost = (req, res, next) => {
  const PokemonVM = {
    name: req.body.Name,
    ImgaUrl: req.body.ImgaUrl,
    regionId: req.body.RegionId,
    pokemonTypeId: req.body.PokemonTypeId,
  };

  Pokemon.create({
    name: PokemonVM.name,
    ImgaUrl: PokemonVM.ImgaUrl,
    regionId: PokemonVM.regionId,
    pokemonTypeId: PokemonVM.pokemonTypeId,
  })
    .then((result) => {
      res.redirect("/pokemones");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.editPokemonGet = (req, res, next) => {
  const edit = req.query.edit;
  const PokemonId = req.params.idPokemon;

  if (!edit) {
    return res.redirect("/pokemones");
  }

  Region.findAll()
    .then((result) => {
      const region = result.map((result) => result.dataValues);
      PokemonType.findAll()
        .then((result) => {
          const pokemonType = result.map((result) => result.dataValues);
          Pokemon.findOne({ where: { id: PokemonId } })
            .then((result) => {
              const Pokemon = result.dataValues;

              if (!Pokemon) {
                return res.redirect("/pokemones");
              }

              res.render("Pokemones/savePokemon", {
                pageTitle: "Editar tipo de pokemon",
                module: "Pokemones",
                editMode: true,
                pokemon: Pokemon,
                region: region,
                pokemonType: pokemonType,
                hasRegion: region.length > 0,
                hasPokemonTypes: pokemonType.length > 0,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.editPokemonPost = (req, res, next) => {
  const PokemonVM = {
    id: req.body.Id,
    name: req.body.Name,
    ImgaUrl: req.body.ImgaUrl,
    regionId: req.body.RegionId,
    pokemonTypeId: req.body.PokemonTypeId,
  };

  Pokemon.update(
    {
      name: PokemonVM.name,
      ImgaUrl: PokemonVM.ImgaUrl,
      regionId: PokemonVM.regionId,
      pokemonType: PokemonVM.pokemonTypeId,
    },
    { where: { id: PokemonVM.id } }
  )
    .then((result) => {
      return res.redirect("/pokemones");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deletePokemonGet = (req, res, next) => {
  const deleteParams = req.query.delete;
  const PokemonId = req.params.idPokemon;

  if (!deleteParams) {
    return res.redirect("/pokemones");
  }

  Pokemon.findOne({ where: { id: PokemonId } })
    .then((result) => {
      const Pokemon = result.dataValues;

      if (!Pokemon) {
        return res.redirect("/pokemones");
      }

      res.render("Pokemones/deletePokemon", {
        pageTitle: "Eliminar  pokemon",
        module: "Pokemones",
        pokemon: Pokemon,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deletePokemonPost = (req, res, next) => {
  const PokemonId = req.body.Id;

  Pokemon.destroy({ where: { id: PokemonId } })
    .then((result) => {
      return res.redirect("/pokemones");
    })
    .catch((err) => {
      console.log(err);
    });
};
