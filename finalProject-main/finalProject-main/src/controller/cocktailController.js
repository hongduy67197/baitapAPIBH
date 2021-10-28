const cocktailModel = require("../model/cocktailSchema");

exports.getLists = async function (req, res) {
  try {
    let cocktail = await cocktailModel.find();
    let listdatas = {
      listallcocktail: cocktail,
    };
    // res.render("cocktail.ejs", listdatas);
    res.json(listdatas);
  } catch (error) {
    console.log(error);
  }
};

exports.createCocktail = async function (req, res) {
  try {
    let { name, category, instruction, image, ingredients } = req.body;
    console.log(18, req.body.ingredients);

    let newCocktail = await cocktailModel.create({
      name: name,
      category: category,
      instruction: instruction,
      image: image,
      ingredients: ingredients,
    });

    res.status(201).json(newCocktail);
  } catch (error) {
    res.json({ status: 500 }, error);
  }
};

exports.searchcocktail = async function (req, res) {
  try {
    let searchlist;
    if (req.query.name) {
      searchlist = await cocktailModel.find({
        name: { $regex: `.*${req.query.name}.*` },
      });
    } else if (req.query.ingredients) {
      console.log(42, req.query.ingredients);
      searchlist = await cocktailModel.find({
        ingredients: { $in: req.query.ingredients },
      });
    }
    // res.render("searchcocktail.ejs", { cocktailList: searchlist });
    res.json({ cocktailList: searchlist });
  } catch (error) {
    res.json({ status: 500 }, error);
  }
};

exports.updateCocktail = async function (req, res) {
  try {
    let id = req.params.idcocktail;
    let { name, category, instruction, image, ingredients } = req.body;
    let upCocktail = await cocktailModel.updateOne(
      { _id: id },
      {
        name: name,
        category: category,
        instruction: instruction,
        image: image,
        ingredients: ingredients,
      }
    );
    res.status(200).json(upCocktail);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deleteCocktail = async function (req, res) {
  try {
    const deletecocktails = await cocktailModel.deleteOne({
      _id: req.params.idcocktail,
    });
    res.status(200).json("Delete Cocktail");
  } catch (error) {
    res.status(500).json(error);
  }
};
