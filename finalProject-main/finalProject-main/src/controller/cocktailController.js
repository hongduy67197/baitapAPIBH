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

    res.json({ status: 200, mess: "New cocktail" }, newCocktail);
  } catch (error) {
    res.json({ status: 500 }, error);
  }
};

exports.searchcocktail = async function (req, res) {
  try {
    let searchlist;
    console.log(37, req.query);
    if (req.query.name) {
      searchlist = await cocktailModel.find({
        name: { $regex: `.*${req.query.name}.*` },
      });
    } else if (req.query.ingredients) {
      searchlist = await cocktailModel.find({
        ingredients: req.query.ingredients,
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
    const id = req.param.idcocktail;
    const { name, category, instruction, image, ingredients } = req.body;
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
    res.json({ status: 200, mess: "update thanh cong" }, upCocktail);
  } catch (error) {
    res.json({ status: 500, mess: "false update" }, error);
  }
};

exports.deleteCocktail = async function (req, res) {
  try {
    const deletecocktails = await cocktailModel.deleteOne({
      _id: req.param.idcocktail,
    });
    res.json({ status: 200, mess: "Delete Cocktail" });
  } catch (error) {
    res.json({ status: 500, mess: "false delete" }, error);
  }
};
