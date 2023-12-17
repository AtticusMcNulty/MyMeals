import React from "react";

function MyIngredients(props) {
  // localStorage.removeItem("dailyMealTotals");
  // localStorage.removeItem("dailyMeals");

  // Modal
  function closeModal() {
    // close create ingredient modal; unblur background; allow scrolling; add new ingredient btn; remove add-ingredient btn
    document
      .getElementById("create-ingredient--modal")
      .classList.remove("active");
    document.getElementById("overlay").style.display = "none";
    document.body.style.overflow = "scroll";
    document.getElementById("my-meals--new-ingredient-btn").style.display =
      "block";
    document.getElementById("my-meals--add-meal--btn-add").style.display =
      "none";
  }

  // Create Ingredient
  function createIngredient() {
    // open create ingredient modal; blur background; prevent scrolling; remove new ingredient btn; add "add-ingredient btn"
    document.getElementById("create-ingredient--modal").classList.add("active");
    document.getElementById("overlay").style.display = "block";
    document.body.style.overflow = "hidden";
    document.getElementById("my-meals--new-ingredient-btn").style.display =
      "none";
    document.getElementById("my-meals--add-meal--btn-add").style.display =
      "block";
  }

  function addIngredient() {
    const name = document.getElementById("my-meals--add-meal--info--name")
      .lastChild.value;

    let newIngredient = true;

    for (let i = 0; i < props.ingredients.length; i++) {
      if (props.ingredients[i].Name.toLowerCase() == name.toLowerCase()) {
        newIngredient = false;
      }
    }

    if (newIngredient) {
      const newIngredient = {};

      document
        .querySelectorAll(".my-meals--add-meal--info")
        .forEach(function (component) {
          // add meal to newMeal
          newIngredient[component.firstChild.textContent.replace(":", "")] =
            component.lastChild.value;
        });

      props.setIngredients(function (prevIngredients) {
        const updatedIngredients = [...prevIngredients, newIngredient];
        localStorage.setItem("ingredients", JSON.stringify(updatedIngredients));
        return updatedIngredients;
      });

      closeModal();

      const ingredientInfo = document.querySelectorAll(
        ".my-meals--add-meal--info"
      );

      for (let i = 0; i < ingredientInfo.length; i++) {
        ingredientInfo[i].getElementsByTagName("input")[0].value = "";
      }
    } else {
      alert("Please enter a new ingredient.");
    }
  }

  // Ingredients
  function addIngredientToMeal(ingredient) {
    document.getElementById(
      "my-meals--section--search-ingredient--input"
    ).value = ingredient.Name;

    props.searchIngredient();

    document.getElementById(
      "my-meals--section--search-ingredient--input"
    ).value = "";
  }

  function removeIngredient(index) {
    props.setIngredients(function (prevIngredients) {
      const updatedIngredients = [...prevIngredients];
      updatedIngredients.splice(index, 1);
      localStorage.setItem("ingredients", JSON.stringify(updatedIngredients));
      return updatedIngredients;
    });
  }

  const ingredientsAsTable = props.ingredients.map(function (
    ingredient,
    index
  ) {
    return (
      <tr key={index}>
        <td className="table-cell">{ingredient.Name}</td>
        <td className="table-cell">
          {parseFloat(parseFloat(ingredient.Cost).toFixed(2))}$
        </td>
        <td className="table-cell">{ingredient.Category}</td>
        <td className="table-cell">
          {parseFloat(parseFloat(ingredient.Calories).toFixed(2))}
        </td>
        <td className="table-cell">
          {parseFloat(parseFloat(ingredient.Carbs).toFixed(2))}g
        </td>
        <td className="table-cell">
          {parseFloat(parseFloat(ingredient.Fat).toFixed(2))}g
        </td>
        <td className="table-cell">
          {parseFloat(parseFloat(ingredient.Protein).toFixed(2))}g
        </td>
        <td className="table-cell">
          {parseFloat(parseFloat(ingredient.Sodium).toFixed(2))}mg
        </td>
        <td
          className="table-cell--btn"
          onClick={function () {
            addIngredientToMeal(ingredient);
          }}
        ></td>
        <td
          className="table-cell--btn"
          onClick={function () {
            removeIngredient(index);
          }}
        ></td>
      </tr>
    );
  });

  return (
    <div className="component" id="my-ingredients">
      <div className="modal" id="create-ingredient--modal">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <div className="my-meals--add-meal--info">
          <p>Name:</p>
          <input></input>
        </div>
        <div className="my-meals--add-meal--info">
          <p>Cost:</p>
          <input></input>
        </div>
        <div className="my-meals--add-meal--info">
          <p>Category:</p>
          <input></input>
        </div>
        <div className="my-meals--add-meal--info">
          <p>Calories:</p>
          <input></input>
        </div>
        <div className="my-meals--add-meal--info">
          <p>Carbs:</p>
          <input></input>
        </div>
        <div className="my-meals--add-meal--info">
          <p>Fat:</p>
          <input></input>
        </div>
        <div className="my-meals--add-meal--info">
          <p>Protein:</p>
          <input></input>
        </div>
        <div className="my-meals--add-meal--info">
          <p>Sodium:</p>
          <input></input>
        </div>
        <button
          className="modal-button"
          id="my-meals--add-meal--btn-add"
          onClick={addIngredient}
        >
          Add Ingredient
        </button>
      </div>
      <div className="default-section">
        <h3>Ingredients</h3>
        <button className="default-button" onClick={createIngredient}>
          Create Ingredient
        </button>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th className="table-head">Name</th>
                <th className="table-head">Cost</th>
                <th className="table-head">Category</th>
                <th className="table-head">Calories</th>
                <th className="table-head">Carbs</th>
                <th className="table-head">Fats</th>
                <th className="table-head">Protein</th>
                <th className="table-head">Sodium</th>
                <th className="table-head">MyMeals</th>
                <th className="table-head">Del</th>
              </tr>
            </thead>
            <tbody>{ingredientsAsTable}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MyIngredients;
