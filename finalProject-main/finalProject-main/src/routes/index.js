const router = require("express").Router();

const CocktailRouetr = require("./cocktailRouter");

router.use("/", CocktailRouetr);

module.exports = router;
