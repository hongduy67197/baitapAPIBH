const express = require("express");
const router = express.Router();
const cocktailController = require("../controller/cocktailController");
const cocktailModel = require("../model/cocktailSchema");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
router.use("/api-docs", swaggerUi.serve);
router.get("/api-docs", swaggerUi.setup(swaggerJsDoc));

// Router

router.get("/cocktail", cocktailController.getLists);
router.get("/searchcocktail", cocktailController.searchcocktail);
router.post("/cocktail", cocktailController.createCocktail);
router.put("/cocktail/:idcocktail", cocktailController.updateCocktail);
router.delete("/cocktail/:idcocktail", cocktailController.deleteCocktail);
module.exports = router;
