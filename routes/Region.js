const express = require('express');
const router =  express.Router();

const regionController = require("../controllers/regionController");

router.get("/regiones",regionController.getIndex);

router.get("/regiones/crearRegion",regionController.createRegionGet);
router.post("/regiones/crearRegion",regionController.createRegionPost);

router.get("/regiones/editarRegion/:idRegion",regionController.editRegionGet);
router.post("/regiones/editarRegion",regionController.editRegionPost);

router.get("/regiones/eliminarRegion/:idRegion",regionController.deleteRegionGet);
router.post("/regiones/eliminarRegion",regionController.deleteRegionPost);


module.exports = router;