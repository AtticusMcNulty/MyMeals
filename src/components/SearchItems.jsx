import React from "react";
import ingredients from "../data/ingredients";
import Ingredient from "./Ingredient";
import Recipe from "./Recipe";

function SearchItems(props) {
  const [ingredientID, setIngredientID] = React.useState(null);
  const [ingredientsList, setIngredientsList] = React.useState([]);
  const [amount, setAmount] = React.useState(null);
  const [numRecipes, setNumRecipes] = React.useState(null);

  React.useEffect(
    function () {
      setIngredientsList(function (prevList) {
        const updatedList = [...prevList, ...props.fridgeIngredients];

        const nonDupes = [];

        // remove potential duplicates
        updatedList.forEach(function (food) {
          if (!nonDupes.includes(food)) {
            nonDupes.push(food);
          }
        });

        return nonDupes;
      });
      setNumRecipes(props.numRecipes);
    },
    [props.fridgeIngredients, props.numRecipes]
  );

  function addIngredient() {
    const ingredient = document
      .querySelector(".ingredient-data--name")
      .textContent.toLowerCase();

    if (
      Object.values(ingredients).includes(ingredients[ingredient]) &&
      !ingredientsList.includes(ingredient)
    ) {
      if (ingredientsList.length == 0) {
        let num = prompt(
          "Enter the number of recipes you would like to search for (0-100):"
        );

        if (num >= 0 && num <= 100) {
          document.getElementById("search-ingredients--input").value = "";

          setNumRecipes(num);
          setIngredientsList(function (prevList) {
            return [...prevList, ingredient];
          });
        } else {
          alert(
            "The number you entered is not a valid number of recipes (0-100)"
          );
        }
      }
    } else if (ingredientsList.includes(ingredient)) {
      alert("That ingredient is already a part of your list");
    } else {
      alert("Ingredient does not exist");
    }

    document.getElementsByClassName(
      "search-items--remove-ingredient"
    )[0].style.display = "flex";
    document.getElementById("search-ingredients--input").value = "";
  }

  function removeIngredient() {
    const ingredient = document
      .getElementById("search-items--remove-ingredient--input")
      .value.toLowerCase();

    if (ingredientsList.includes(ingredient)) {
      const index = ingredientsList.indexOf(ingredient);
      setIngredientsList(function (prevList) {
        const updatedList = [...prevList];
        updatedList.splice(index, 1);

        if (updatedList.length == 0) {
          document.getElementsByClassName(
            "search-items--remove-ingredient"
          )[0].style.display = "none";
        }

        return updatedList;
      });
      document.getElementById("search-items--remove-ingredient--input").value =
        "";
    } else {
      alert("Ingredient could not be found in list of ingredients");
    }
  }

  function getIngredientID() {
    const ingredient = document
      .getElementById("search-ingredients--input")
      .value.toLowerCase();

    if (Object.values(ingredients).includes(ingredients[ingredient])) {
      setAmount(prompt("Enter amount for food item: "));
      setIngredientID(ingredients[ingredient]);
    } else {
      alert("ingredient does not exist");
    }
  }

  return (
    <div id="search" className="component">
      <div className="default-section">
        <div className="search-bar">
          <input
            type="text"
            className="default-input"
            id="search-ingredients--input"
          ></input>
          <button className="default-button" onClick={getIngredientID}>
            Search Ingredient
          </button>
        </div>

        {ingredientID ? (
          <div className="default-section--content">
            <div className="default-section--item">
              <h3 className="section--header">Ingredient Info</h3>
              <Ingredient id={ingredientID} amount={amount} />
              <button
                className="default-button"
                id="search-items--ingredient--add-to-ingredients"
                onClick={addIngredient}
              >
                Add Ing. to Recipe
              </button>
            </div>

            <div
              className="default-section--item nonactive"
              id="recipes-section"
            >
              <h3 className="section--header">Recipes</h3>
              <div className="search-items--recipe-search--ingredients">
                <div className="search-items--recipe-search--ingredients--header">{`Ingredients: ${ingredientsList.join(
                  ", "
                )}`}</div>
              </div>
              {ingredientsList.length > 0 ? (
                <Recipe
                  list={ingredientsList.join(",+")}
                  numRecipes={numRecipes}
                />
              ) : null}
              <div className="search-items--remove-ingredient">
                <input
                  className="default-input"
                  id="search-items--remove-ingredient--input"
                ></input>
                <button className="default-button" onClick={removeIngredient}>
                  Remove Ing.
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default SearchItems;
