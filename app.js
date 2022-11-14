// PACKAGES
const express = require("express");
const path = require("path");
const {engine} = require("express-handlebars");
const sequelize = require("./util/database");
const region = require("./models/Region");
const pokemonType = require("./models/PokemonType");
const pokemon = require("./models/Pokemon");

// Definitions
const app = express();


// Routes
const rouetHome = require("./routes/Home");
const rouetPokemon = require("./routes/Pokemon");
const rouetPokemonType = require("./routes/PokemonTypes");
const rouetRegion = require("./routes/Region");

const rouetStatusView = require("./routes/Status");

//Helpers
const GetCurrenteYear = require("./helper/hbs/GetCurrentYear");
const GetComparece = require("./helper/hbs/IsEqual");

// Config hbs
app.engine("hbs",engine({
    layoutsDir:'views/layouts/', defaultLayout: 'main-layout', extname:'hbs',
    helpers:{
        getCurrenteYear : GetCurrenteYear.getCurrentYear,  
        isEqual : GetComparece.IsEqual
    }
}));

app.set("view engine","hbs");
app.set("views","views");

app.use(express.static(path.join(__dirname,"public")));

app.use(express.urlencoded({extended: false}));

// Middleware

app.use(rouetHome);
app.use(rouetPokemon);
app.use(rouetPokemonType);
app.use(rouetRegion);

// Error view (404)
app.use(rouetStatusView);

// Relation

pokemon.belongsTo(region,{constraint: true,onDelete:"CASCADE"});
region.hasMany(pokemon);
pokemon.belongsTo(pokemonType,{constraint: true,onDelete:"CASCADE"});
pokemonType.hasMany(pokemon);

//Sincronizacion con la db

sequelize.sync().then((result) =>{
    app.listen(3000);
}).catch(err =>{
    console.log(err);
});
