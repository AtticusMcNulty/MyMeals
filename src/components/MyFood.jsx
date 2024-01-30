import React from "react";
import MyIngredients from "./MyIngredients";
import MyMeals from "./MyMeals";

function MyFood() {
  const [ingredients, setIngredients] = React.useState(function () {
    const storedIngredients = localStorage.getItem("ingredients");
    return storedIngredients ? JSON.parse(storedIngredients) : [];
  });

  const [foundIngredients, setFoundIngredients] = React.useState([]);
  const [foundIngredientTotals, setFoundIngredientTotals] = React.useState([
    0, 0, 0, 0, 0, 0,
  ]);

  function searchIngredient() {
    const ingredient = document.getElementById(
      "my-meals--section--search-ingredient--input"
    ).value;
    let invalid = true;

    /* check if ingredient exists in list of ingredients */
    // for each ingredient in list of ingredients
    for (let i = 0; i < ingredients.length; i++) {
      let ingredientExists = false;

      // get name of current ingredient
      let curIngredient = ingredients[i].Name;

      // if current ingreident includes desired ingredient, desired ingredient exists
      if (curIngredient.toLowerCase().includes(ingredient.toLowerCase()))
        ingredientExists = true;

      // if ingredient matches current ingredient
      if (ingredientExists) {
        let found = false;
        let index = 0;
        invalid = false;

        // check if ingredient already exists in create meal table
        for (let j = 0; j < foundIngredients.length; j++) {
          if (
            foundIngredients[j].Name.toLowerCase() == ingredient.toLowerCase()
          ) {
            found = true;
            index = j;
          }
        }

        // if it already exists in create meal table, increment its count, otherwise, define it as a new ingredient inside the table
        if (found) {
          incrementMealIngredient(index);
        } else {
          // insert amount key-value pair in correct position
          let updatedIngredients = {};
          for (const key in ingredients[i]) {
            if (key == "Cost") {
              updatedIngredients["Amount"] = 1;
            }
            updatedIngredients[key] = ingredients[i][key];
          }

          delete updatedIngredients.Category;

          setFoundIngredients(function (prevFoundIngredients) {
            return [...prevFoundIngredients, updatedIngredients];
          });

          setFoundIngredientTotals(function (prevFoundIngredientTotals) {
            const updatedFoundIngredientTotals = [...prevFoundIngredientTotals];
            updatedFoundIngredientTotals[0] += Number(updatedIngredients.Cost);
            updatedFoundIngredientTotals[1] += Number(
              updatedIngredients.Calories
            );
            updatedFoundIngredientTotals[2] += Number(updatedIngredients.Carbs);
            updatedFoundIngredientTotals[3] += Number(updatedIngredients.Fat);
            updatedFoundIngredientTotals[4] += Number(
              updatedIngredients.Protein
            );
            updatedFoundIngredientTotals[5] += Number(
              updatedIngredients.Sodium
            );

            return updatedFoundIngredientTotals;
          });
        }

        document.getElementById("my-meals--create-meal--table").style.display =
          "table";
        document.getElementById(
          "my-meals--section--create-meal--add-to-meal"
        ).style.display = "block";
      }
    }

    if (invalid) {
      alert(
        "No corresponding ingredient from your ingredients list could be found."
      );
    }
  }

  function incrementMealIngredient(index) {
    let updatedAmounts = [];

    setFoundIngredients(function (prevIngredients) {
      const updatedIngredients = [...prevIngredients];

      console.log(index, updatedIngredients);

      Object.keys(updatedIngredients[index]).forEach(function (key) {
        if (key != "Name" && key != "Amount") {
          updatedIngredients[index][`${key}`] =
            Number(updatedIngredients[index][`${key}`]) +
            Number(updatedIngredients[index][`${key}`]) /
              Number(updatedIngredients[index].Amount);

          updatedAmounts.push(
            Number(updatedIngredients[index][`${key}`]) /
              (Number(updatedIngredients[index].Amount) + 1)
          );
        }
      });

      updatedIngredients[index].Amount =
        Number(updatedIngredients[index].Amount) + 1;
      return updatedIngredients;
    });

    setFoundIngredientTotals(function (prevFoundIngredientTotals) {
      const updatedFoundIngredientTotals = [...prevFoundIngredientTotals];
      updatedFoundIngredientTotals[0] += Number(updatedAmounts[0]);
      updatedFoundIngredientTotals[1] += Number(updatedAmounts[1]);
      updatedFoundIngredientTotals[2] += Number(updatedAmounts[2]);
      updatedFoundIngredientTotals[3] += Number(updatedAmounts[3]);
      updatedFoundIngredientTotals[4] += Number(updatedAmounts[4]);
      updatedFoundIngredientTotals[5] += Number(updatedAmounts[5]);

      return updatedFoundIngredientTotals;
    });
  }

  return (
    <div>
      <MyIngredients
        ingredients={ingredients}
        setIngredients={setIngredients}
        foundIngredients={foundIngredients}
        setFoundIngredients={setFoundIngredients}
        setFoundIngredientTotals={setFoundIngredientTotals}
        searchIngredient={searchIngredient}
      />
      <MyMeals
        ingredients={ingredients}
        foundIngredients={foundIngredients}
        setFoundIngredients={setFoundIngredients}
        foundIngredientTotals={foundIngredientTotals}
        setFoundIngredientTotals={setFoundIngredientTotals}
        searchIngredient={searchIngredient}
        incrementMealIngredient={incrementMealIngredient}
      />
    </div>
  );
}

export default MyFood;
