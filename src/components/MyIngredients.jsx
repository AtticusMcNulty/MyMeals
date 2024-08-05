import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";

function MyIngredients(props) {
  // localStorage.removeItem("dailyMealTotals");
  // localStorage.removeItem("dailyMeals");

  // determine whether to add ingredient to MyMeals or remove it from table
  const [ingredientAction, setIngredientAction] = React.useState("default");
  const [selectedFilter, setSelectedFilter] = React.useState("");
  const [selectedSort, setSelectedSort] = React.useState("Sort By...");
  const [originalIngredients, setOriginalIngredients] = React.useState([
    ...props.ingredients,
  ]);
  const [showModal, setShowModal] = React.useState(false);

  // Modal
  function closeModal() {
    setShowModal(false);
    document.body.style.overflow = "scroll";
  }

  // Create Ingredient
  function createIngredient() {
    setShowModal(true);
    document.body.style.overflow = "hidden";
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
          console.log(component);
          // add meal to newMeal
          newIngredient[component.firstChild.textContent] =
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

      setOriginalIngredients(updatedIngredients);

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
      {showModal ? <div id="overlay"></div> : null}
      {showModal ? (
        <form className="modal" onSubmit={() => addIngredient()}>
          <span className="close" onClick={closeModal}>
            &times;
          </span>
          <div className="my-meals--add-meal--info">
            <div>Name</div>
            <input id="modal-name" type="text" required></input>
          </div>
          <div className="my-meals--add-meal--info">
            <div>Amount</div>
            <input type="number" required></input>
          </div>
          <div className="my-meals--add-meal--info">
            <div>Cost</div>
            <input type="number" step="0.01" required></input>
          </div>
          <div className="my-meals--add-meal--info">
            <div>Category</div>
            <input required></input>
          </div>
          <div className="my-meals--add-meal--info">
            <div>Calories</div>
            <input type="number" required></input>
          </div>
          <div className="my-meals--add-meal--info">
            <div>Carbs</div>
            <input type="number" step="0.1" required></input>
          </div>
          <div className="my-meals--add-meal--info">
            <div>Fat</div>
            <input type="number" step="0.1" required></input>
          </div>
          <div className="my-meals--add-meal--info">
            <div>Protein</div>
            <input type="number" step="0.1" required></input>
          </div>
          <div className="my-meals--add-meal--info">
            <div>Sodium</div>
            <input type="number" required></input>
          </div>
          <button
            className="default-button"
            id="my-meals--add-meal--btn-add"
            style={{ backgroundColor: "#f77064", marginTop: "10px" }}
            type="submit"
          >
            Add Ingredient
          </button>
        </form>
      ) : null}
      <div className="default-section">
        <div className="button-row">
          <button className="default-button" onClick={() => createIngredient()}>
            Create Ingredient
          </button>
          <button
            className="default-button"
            onClick={() => updateAction("add")}
          >
            Add to MyMeals
          </button>
          <button
            className="default-button"
            onClick={() => updateAction("delete")}
          >
            Delete Ingredient
          </button>
        </div>
        <div className="default-section--content">
          <div className="default-section--item">
            <h3 className="section--header">Ingredients</h3>
            <div className="table--modifiers">
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
                  onChange={(event) => setSelectedSort(event.target.value)}
                >
                  <option value="Sort By..." disabled hidden>
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
                {selectedSort !== "No Sort" && selectedSort !== "Sort By..." ? (
                  <div id="sort-button-container">
                    <button
                      className="sort-button"
                      onClick={() => {
                        sortIngredients(selectedSort, true);
                      }}
                    >
                      <FontAwesomeIcon icon={faArrowDown}></FontAwesomeIcon>
                    </button>
                    <button
                      className="sort-button"
                      onClick={() => {
                        sortIngredients(selectedSort, false);
                      }}
                    >
                      <FontAwesomeIcon icon={faArrowUp}></FontAwesomeIcon>
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="table-container" style={{ marginTop: "15px" }}>
              <table className="table">
                <thead>
                  <tr>
                    <th className="table-head">Name</th>
                    <th className="table-head">Amount</th>
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
      </div>
    </div>
  );
}

export default MyIngredients;
