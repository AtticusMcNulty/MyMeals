import React from "react";

function MyIngredients(props) {
  // localStorage.removeItem("dailyMealTotals");
  // localStorage.removeItem("dailyMeals");

  // determine whether to add ingredient to MyMeals or remove it from table
  const [ingredientAction, setIngredientAction] = React.useState("default");
  const [selectedFilter, setSelectedFilter] = React.useState("");
  const [selectedSort, setSelectedSort] = React.useState("");
  const [originalIngredients, setOriginalIngredients] = React.useState([
    ...props.ingredients,
  ]);

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

  function changeAmount(event, index) {
    if (event.target.value >= 0) {
      const updatedIngredients = [...props.ingredients];
      updatedIngredients[index].Amount = event.target.value;
      localStorage.setItem("ingredients", JSON.stringify(updatedIngredients));
      props.setIngredients(updatedIngredients);
    } else {
      alert("Amount cannot be less than 0");
    }
  }

  function changeFilter(option) {
    let filterName = option.value;
    setSelectedFilter(filterName);

    if (filterName != "No Filter") {
      document
        .getElementById("myIngredients-filterRange")
        .classList.add("active");
      document
        .getElementById("myIngredients-filterButton")
        .classList.add("active");
    } else {
      document
        .getElementById("myIngredients-filterRange")
        .classList.remove("active");
      document
        .getElementById("myIngredients-filterButton")
        .classList.remove("active");
      filterIngredients(false);
    }
  }

  function filterIngredients(filter) {
    if (selectedFilter != "No Filter" && filter) {
      let filteredArr = [];

      const min = document.querySelectorAll(".myIngredients-filterInput")[0]
        .value;
      const max = document.querySelectorAll(".myIngredients-filterInput")[1]
        .value;

      // loop through original ingredients list
      for (let i = 0; i < originalIngredients.length; i++) {
        const curIngredientVal = Number(originalIngredients[i][selectedFilter]);
        // if ingredient fits between bounds of filter, append to filtered array
        if (curIngredientVal >= min && curIngredientVal <= max) {
          filteredArr.push(originalIngredients[i]);
        }
      }
      props.setIngredients(filteredArr);
    } else {
      props.setIngredients(originalIngredients);
    }
  }

  function changeSort(option) {
    const category = option.value;
    setSelectedSort(category);
    console.log(1);

    document.getElementById("sort-button-container").style.display = "flex";
  }

  function sortIngredients(category, order) {
    let newIngredientArr = [...props.ingredients];

    // insertion sort
    if (category === "Name" || category === "Category") {
      // repeat for each ingredient
      for (let i = 1; i < newIngredientArr.length; i++) {
        // get category of current ingredient
        let curCategory = newIngredientArr[i][category];
        let j = i - 1;

        // while start not reached and current category less than previous categories
        while (
          order
            ? j >= 0 &&
              curCategory.localeCompare(newIngredientArr[j][category]) == -1
            : j >= 0 &&
              curCategory.localeCompare(newIngredientArr[j][category]) == 1
        ) {
          // swap elements
          let temp = newIngredientArr[j + 1];
          newIngredientArr[j + 1] = newIngredientArr[j];
          newIngredientArr[j] = temp;

          // get next previous category
          j = j - 1;
        }
      }
    }
    // else if sorting by number
    else {
      for (let i = 1; i < newIngredientArr.length; i++) {
        let curCategory = newIngredientArr[i][category];
        let j = i - 1;

        while (
          order
            ? j >= 0 &&
              Number(curCategory) > Number(newIngredientArr[j][category])
            : j >= 0 &&
              Number(curCategory) < Number(newIngredientArr[j][category])
        ) {
          let temp = newIngredientArr[j + 1];
          newIngredientArr[j + 1] = newIngredientArr[j];
          newIngredientArr[j] = temp;

          j = j - 1;
        }
      }
    }

    props.setIngredients(newIngredientArr);
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
          <input
            className="table-counter"
            type="number"
            value={ingredient.Amount ? ingredient.Amount : 0}
            onChange={(event) => changeAmount(event, index)}
          />
        </td>
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
          <p>Amount:</p>
          <input type="number"></input>
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
        <div className="filter-container">
          <select
            className="default-filter"
            value={selectedFilter}
            onChange={(event) => {
              changeFilter(event.target);
            }}
          >
            <option value="" disabled hidden>
              Filter by...
            </option>
            <option value="No Filter">No Filter</option>
            <option value="Amount">Amount</option>
            <option value="Cost">Cost</option>
            <option value="Calories">Calories</option>
            <option value="Carbs">Carbs</option>
            <option value="Fats">Fats</option>
            <option value="Protein">Protein</option>
            <option value="Sodium">Sodium</option>
          </select>
          <div id="myIngredients-filterRange">
            <input
              className="myIngredients-filterInput"
              type="number"
              placeholder="min"
              style={{ marginRight: "5px" }}
            ></input>
            <input
              className="myIngredients-filterInput"
              type="number"
              placeholder="max"
            ></input>
          </div>
          <button
            className="default-button"
            id="myIngredients-filterButton"
            onClick={() => {
              filterIngredients(true);
            }}
          >
            Filter
          </button>
        </div>
        <div className="sort-container">
          <select
            className="default-filter"
            value={selectedSort}
            onChange={(event) => {
              changeSort(event.target);
            }}
          >
            <option value="" disabled hidden>
              Sort by...
            </option>
            <option>No Sort</option>
            <option value="Amount">Amount</option>
            <option value="Cost">Cost</option>
            <option value="Calories">Calories</option>
            <option value="Carbs">Carbs</option>
            <option value="Fats">Fats</option>
            <option value="Protein">Protein</option>
            <option value="Sodium">Sodium</option>
          </select>
          <div id="sort-button-container">
            <button
              className="sort-button"
              onClick={() => {
                sortIngredients(selectedSort, true);
              }}
            >
              ⬇️
            </button>
            <button
              className="sort-button"
              onClick={() => {
                sortIngredients(selectedSort, false);
              }}
            >
              ⬆️
            </button>
          </div>
        </div>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th className="table-head">
                  <span>Name</span>
                </th>
                <th className="table-head">
                  <span>Amount</span>
                </th>
                <th className="table-head">
                  <span>Cost</span>
                </th>
                <th className="table-head">
                  <span>Category</span>
                </th>
                <th className="table-head">
                  <span>Calories</span>
                </th>
                <th className="table-head">
                  <span>Carbs</span>
                </th>
                <th className="table-head">
                  <span>Fats</span>
                </th>
                <th className="table-head">
                  <span>Protein</span>
                </th>
                <th className="table-head">
                  <span>Sodium</span>
                </th>
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
