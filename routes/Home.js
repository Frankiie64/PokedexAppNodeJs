const express = require('express');
const router =  express.Router();

const homeController = require("../controllers/homeController");

router.get("/",homeController.getIndex);
router.post("/",homeController.findIndexPost);

module.exports = router;