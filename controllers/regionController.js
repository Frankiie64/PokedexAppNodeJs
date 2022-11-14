const Region = require("../models/Region");

exports.getIndex = (req,res,next) => {

    Region.findAll()
    .then((result) => {
      const region = result.map((result) => result.dataValues);
      res.render("Regions/Index",{
        pageTitle: "Regiones",
        module: "Regiones",
        hasRegion: region.length > 0,
        region : region
    });
    })
    .catch((err) => {
      console.log(err);
    });    
};

exports.createRegionGet = (req,res,next) => {
    res.render("Regions/saveRegion",{
        pageTitle: "Regiones",
        module: "Regiones",       
    });
}

exports.createRegionPost = (req,res,next)=>{
    const regionVM = {
        name:req.body.Name
    };

    Region.create({
        name: regionVM.name
    }).then((result)=> {
        res.redirect("/regiones");
    })
    .catch((err)=>{
        console.log(err);
    })

    
};

exports.editRegionGet = (req, res, next) => {
    const edit = req.query.edit;
    const regionId = req.params.idRegion;
  
    if (!edit) {
      return res.redirect("/regiones");
    }
  
    Region.findOne({ where: { id: regionId } })
      .then((result) => {
        const region = result.dataValues;
  
        if (!region) {
          return res.redirect("/regiones");
        }

        res.render("Regions/saveRegion", {
            pageTitle: "Editar Regiones",
            module: "Regiones",  
            editMode: true,
            region: region,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
exports.editRegionPost = (req, res, next) => {
    const regionName = req.body.Name;  
    const regionId = req.body.Id;
    console.log(req.body);

    Region.update(
      { name: regionName },
      { where: { id: regionId } }
    )
      .then((result) => {
        return res.redirect("/regiones");
      })
      .catch((err) => {
        console.log(err);
      });
}

exports.deleteRegionGet = (req, res, next) => {
    const deleteParams = req.query.delete;
    const regionId = req.params.idRegion;
  
    if (!deleteParams) {
      return res.redirect("/regiones");
    }
  
    Region.findOne({ where: { id: regionId } })
      .then((result) => {
        const region = result.dataValues;
  
        if (!region) {
          return res.redirect("/regiones");
        }

        res.render("Regions/deleteRegion", {
            pageTitle: "Eliminar Region",
            module: "Regiones",  
            region: region,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

exports.deleteRegionPost = (req, res, next) => {
    const regionId = req.body.Id;
  
    Region.destroy({ where: { id: regionId } })
      .then((result) => {
        return res.redirect("/regiones");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  