const express = require("express");
const router = express.Router();
const cocktailController = require("../controller/cocktailController");
const cocktailModel = require("../model/cocktailSchema");

router.get("/cocktail", cocktailController.getLists);
router.get("/searchcocktail", cocktailController.searchcocktail);
router.post("/cocktail", cocktailController.createCocktail);
router.put("/cocktail", cocktailController.updateCocktail);
router.delete("/cocktail", cocktailController.deleteCocktail);
module.exports = router;
