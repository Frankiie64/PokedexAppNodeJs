const PokemonType = require("../models/PokemonType");

exports.getIndex = (req,res,next) => {

    PokemonType.findAll()
    .then((result) => {
        const pokemonType = result.map((result) => result.dataValues);

        res.render("PokemonTypes/Index",{
        pageTitle: "Tipos de Pokemones",
        module: "Tipos de Pokemones",
        hasPokemonType: pokemonType.length > 0,
        pokemonType : pokemonType
        });          
    })
    .catch((err) => {
      console.log(err);
    });       
};

exports.createTypePokemonGet = (req,res,next) => {
    res.render("PokemonTypes/savePokemonType",{
        pageTitle: "Tipos de Pokemones",
        module: "Tipos de Pokemones",       
    });
}

exports.createTypePokemonPost = (req,res,next)=>{
    const pokemonTypeVM = {
        name:req.body.Name
    };

    PokemonType.create({
        name: pokemonTypeVM.name
    }).then((result)=> {
        res.redirect("/tipo/pokemones");
    })
    .catch((err)=>{
        console.log(err);
    })

    
};

exports.editTypePokemonGet = (req, res, next) => {
    const edit = req.query.edit;
    const pokemonTypeId = req.params.idTipoPokemon;
  
    if (!edit) {
      return res.redirect("/tipo/pokemones");
    }
  
    PokemonType.findOne({ where: { id: pokemonTypeId } })
      .then((result) => {
        const pokemonType = result.dataValues;
  
        if (!pokemonType) {
          return res.redirect("/tipo/pokemones");
        }

        res.render("PokemonTypes/savePokemonType", {
            pageTitle: "Editar tipo de pokemon",
            module: "Tipos de Pokemones",       
            editMode: true,
            pokemonType: pokemonType,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
exports.editTypePokemonPost = (req, res, next) => {
    const pokemonTypeName = req.body.Name;  
    const pokemonTypeId = req.body.Id;
    console.log(req.body);

    PokemonType.update(
      { name: pokemonTypeName },
      { where: { id: pokemonTypeId } }
    )
      .then((result) => {
        return res.redirect("/tipo/pokemones");
      })
      .catch((err) => {
        console.log(err);
      });
}

exports.deleteTypePokemonGet = (req, res, next) => {
    const deleteParams = req.query.delete;
    const pokemonTypeId = req.params.idTipoPokemon;
  
    if (!deleteParams) {
      return res.redirect("/tipo/pokemones");
    }
  
    PokemonType.findOne({ where: { id: pokemonTypeId } })
      .then((result) => {
        const pokemonType = result.dataValues;
  
        if (!pokemonType) {
          return res.redirect("tipo/pokemones");
        }

        res.render("PokemonTypes/deletePokemonType", {
            pageTitle: "Eliminar Tipo de pokemon",
            module: "Tipos de Pokemones",       
            pokemonType: pokemonType,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

exports.deleteTypePokemonPost = (req, res, next) => {
    const pokemonTypeId = req.body.Id;
  
    PokemonType.destroy({ where: { id: pokemonTypeId } })
      .then((result) => {
        return res.redirect("/tipo/pokemones");
      })
      .catch((err) => {
        console.log(err);
      });
  };