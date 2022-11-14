const Pokemon = require("../models/Pokemon");
const PokemonType = require("../models/PokemonType");
const Region = require("../models/Region");

exports.getIndex = (req,res,next) => {
    Region.findAll()
    .then((result) => {
      const region = result.map((result) => result.dataValues);      
          Pokemon.findAll({ include: [{ model: Region }, { model: PokemonType }] })
        .then((result) => {
        const Pokemon = result.map((result) => result.dataValues);
        res.render("Home/Index",{
            pageTitle: "Home",
            module: "Home",
            hasPokemon: Pokemon.length > 0,
            pokemon: Pokemon,
            region: region,
            hasRegion :  region.length > 0
        });
    }).catch((err) => {
      console.log(err);
    });
    })
    .catch((err) => {
      console.log(err);
    });
}

exports.findIndexPost = (req,res,next) => {
    pokemonName = req.body.Name;
    pokemonRegionId = req.body.RegionId;

    console.log(pokemonName);
    console.log(pokemonRegionId);

    Region.findAll()
    .then((result) => {
      const region = result.map((result) => result.dataValues);                        

        if (!(pokemonName == null || pokemonName == undefined || pokemonName == '') &&(pokemonRegionId != 0)){
            Pokemon.findAll({ include: [{ model: Region }, { model: PokemonType }], where: { name: pokemonName, regionId : pokemonRegionId } } )
            .then((result) => {
              const Pokemon = result.map((result) => result.dataValues);
        
              res.render("Home/Index",{
                pageTitle: "Home",
                module: "Home",
                hasPokemon: Pokemon.length > 0,
                pokemon: Pokemon,
                region: region,
                hasRegion :  region.length > 0
              });
            })
            .catch((err) => {
              console.log(err);
            });
            }
            
            if (pokemonRegionId != 0){
                console.log(pokemonRegionId)
                Pokemon.findAll({ include: [{ model: Region }, { model: PokemonType }], where: { regionId : pokemonRegionId } } )
                .then((result) => {
                  const Pokemon = result.map((result) => result.dataValues);
            
                  res.render("Home/Index",{
                    pageTitle: "Home",
                    module: "Home",
                    hasPokemon: Pokemon.length > 0,
                    pokemon: Pokemon,
                    region: region,
                    hasRegion :  region.length > 0
                  });
                })
                .catch((err) => {
                  console.log(err);
                });
            }
        
            if (!(pokemonName == null || pokemonName == undefined || pokemonName == '')){
                Pokemon.findAll({ include: [{ model: Region }, { model: PokemonType }], where: { name: pokemonName } } )
                .then((result) => {
                  const Pokemon = result.map((result) => result.dataValues);
            
                  res.render("Home/Index",{
                    pageTitle: "Home",
                    module: "Home",
                    hasPokemon: Pokemon.length > 0,
                    pokemon: Pokemon,
                    region: region,
                    hasRegion :  region.length > 0
                  });
                })
                .catch((err) => {
                  console.log(err);
                });
            }
        
                Pokemon.findAll({ include: [{ model: Region }, { model: PokemonType }]} )
                .then((result) => {
                  const Pokemon = result.map((result) => result.dataValues);
            
                  res.render("Home/Index",{
                    pageTitle: "Home",
                    module: "Home",
                    hasPokemon: Pokemon.length > 0,
                    pokemon: Pokemon,
                    region: region,
                    hasRegion :  region.length > 0
                  });
                })
                .catch((err) => {
                  console.log(err);
            });    
                
    }).catch((err) => {
      console.log(err);
    });
        
}