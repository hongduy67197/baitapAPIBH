async function randomCOcktail() {
  let promise = await fetch(
    "https://www.thecocktaildb.com/api/json/v1/1/random.php"
  );
  let data = await promise.json();
  let result = {};
  let Ingredient = [];
  data.drinks.forEach((item) => {
    const keyList = Object.keys(item);

    for (let key of keyList) {
      if (key.includes("strIngredient")) {
        Ingredient.push(item[key]);
      }
    }
    console.log(14, Ingredient);
    $(".container").append(`
        <div class="namecocktail">${item.strDrink}</div>
        <div class="catacocktail">${item.strCategory}</div>
        <div class="instrcocktail">${item.strInstructions}</div>
        <div class="imgcocktail">${item.strDrinkThumb}</div>
        <div class="datecocktail">${item.dateModified}</div>
        `);
  });
  console.log(21, data.drinks[0].strDrink);
  console.log(22, Ingredient);
  result.name = data.drinks[0].strDrink;
  result.category = data.drinks[0].strCategory;
  result.instruction = data.drinks[0].strInstructions;
  result.image = data.drinks[0].strDrinkThumb;
  result.createdDate = data.drinks[0].dateModified;
  result.ingredients = Ingredient;
  return result;
}

randomCOcktail();
$("#new").click(async function () {
  try {
    let Ingredient = await randomCOcktail();
    console.log(40, Ingredient.ingredients);
    await $.ajax({
      url: `/cocktail`,
      type: "POST",
      data: {
        name: Ingredient.name,
        category: Ingredient.category,
        instruction: Ingredient.instruction,
        image: Ingredient.image,
        ingredients: Ingredient.ingredients,
      },
    });
  } catch (error) {
    console.log(error);
  }
});
$("#search").click(function () {
  try {
    let textinput = $(".inputtxt").val();
    let typesearch = $("#typesearch").val();
    console.log(60, textinput);
    console.log(61, typesearch);
    if (typesearch == "name") {
      console.log(123123);
      console.log(64, textinput);
      $.ajax({
        url: `/searchcocktail?name=${textinput}`,
        type: "GET",
      })
        .then((data) => {
          window.location.href = `/searchcocktail?name=${textinput}`;
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (typesearch == "ingredients") {
      console.log(456456);
      $.ajax({
        url: `/searchcocktail?ingredients=${textinput}`,
        type: "GET",
      })
        .then((data) => {
          window.location.href = `/searchcocktail?ingredients=${textinput}`;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  } catch (error) {
    console.log(error);
  }
});
