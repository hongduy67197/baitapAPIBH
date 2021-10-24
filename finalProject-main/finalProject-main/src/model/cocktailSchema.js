const mongoose = require("mongoose");

const cocktailSchema = mongoose.Schema(
  {
    name: String,
    category: String,
    instruction: String,
    image: String,
    ingredients: [{ type: String }],
    createdDate: Date,
    updatedDate: Date,
  },
  { collection: "cocktail" }
);
let cocktailModel = mongoose.model("cocktail", cocktailSchema);
module.exports = cocktailModel;
