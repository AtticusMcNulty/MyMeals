import React from "react";

function MyIngredients(props) {
  // localStorage.removeItem("dailyMealTotals");
  // localStorage.removeItem("dailyMeals");

  // determine whether to add ingredient to MyMeals or remove it from table
  const [ingredientAction, setIngredientAction] = React.useState("default");

  // Modal
  function closeModal() {
    // close create ingredient modal; unblur background; allow scrolling; add new ingredient btn; remove add-ingredient btn
    document
      .getElementById("create-ingredient--modal")
      .classList.remove("active");
    document.getElementById("overlay").style.display = "none";
    document.body.style.overflow = "scroll";
    document.getElementById("my-meals--add-meal--btn-add").style.display =
      "none";
  }

  // Create Ingredient
  function createIngredient() {
    // open create ingredient modal; blur background; prevent scrolling; remove new ingredient btn; add "add-ingredient btn"
    document.getElementById("create-ingredient--modal").classList.add("active");
    document.getElementById("overlay").style.display = "block";
    document.body.style.overflow = "hidden";
    document.getElementById("my-meals--add-meal--btn-add").style.display =
      "block";
  }

  function addIngredient() {
    console.log(document.getElementById("modal-name"));
    // get name of ingredient to be added
    const name = document.getElementById("modal-name").value.toLowerCase();

    let newIngredient = true;

    // if ingredient is not new, set newIngredient to false
    for (let i = 0; i < props.ingredients.length; i++) {
      if (props.ingredients[i].Name.toLowerCase() == name) {
        newIngredient = false;
      }
    }

    // if ingredient is new
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

  // set action to "add" or "delete" and add "clickable" class to all table rows
  function updateAction(action) {
    if (ingredientAction === "default") {
      setIngredientAction(action);
    } else {
      setIngredientAction("default");
    }

    // toggle clickable class to all table rows
    document.querySelectorAll(".table-row").forEach(function (row) {
      row.classList.toggle("clickable");
    });
  }

  // choose whether to add ingredient to MyMeals or remove it from the table
  function toggleIngredient(ingredient, index) {
    // if "add to mymeals" or "delete ingredient" button has been clicked
    if (ingredientAction !== "default") {
      // if "add" button was clicked
      if (ingredientAction === "add") {
        addIngredientToMeal(ingredient);
      }
      // if "remove" button was clicked
      else {
        removeIngredient(index);
      }
    }

    // reset state
    setIngredientAction("default");

    // remove clickable class from all table rows
    document.querySelectorAll(".table-row").forEach(function (row) {
      if (row.classList.contains("clickable"))
        row.classList.remove("clickable");
    });
  }

  const ingredientsAsTable = props.ingredients.map(function (
    ingredient,
    index
  ) {
    return (
      <tr
        className="table-row"
        key={index}
        onClick={function () {
          toggleIngredient(ingredient, index);
        }}
      >
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
          <input id="modal-name"></input>
        </div>
        <div className="my-meals--add-meal--info">
          <p>Cost:</p>
          <input type="number"></input>
        </div>
        <div className="my-meals--add-meal--info">
          <p>Category:</p>
          <input></input>
        </div>
        <div className="my-meals--add-meal--info">
          <p>Calories:</p>
          <input type="number"></input>
        </div>
        <div className="my-meals--add-meal--info">
          <p>Carbs:</p>
          <input type="number"></input>
        </div>
        <div className="my-meals--add-meal--info">
          <p>Fat:</p>
          <input type="number"></input>
        </div>
        <div className="my-meals--add-meal--info">
          <p>Protein:</p>
          <input type="number"></input>
        </div>
        <div className="my-meals--add-meal--info">
          <p>Sodium:</p>
          <input type="number"></input>
        </div>
        <button
          className="modal-button"
          id="my-meals--add-meal--btn-add"
          onClick={addIngredient}
        >
          Add Ingredient
        </button>
      </div>
      <div className="transparent-section">
        <div className="button-row">
          <button className="default-button" onClick={createIngredient}>
            Create Ingredient
          </button>
          <button
            className="default-button"
            onClick={function () {
              updateAction("add");
            }}
          >
            Add to MyMeals
          </button>
          <button
            className="default-button"
            onClick={function () {
              updateAction("delete");
            }}
          >
            Delete Ingredient
          </button>
        </div>
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
