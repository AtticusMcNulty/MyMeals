import React from "react";

function MyMeals(props) {
  const [dailyMeals, setDailyMeals] = React.useState(function () {
    const storedDailyMeals = localStorage.getItem("dailyMeals");
    return storedDailyMeals ? JSON.parse(storedDailyMeals) : [];
  });
  const [dailyMealTotals, setDailyMealTotals] = React.useState(function () {
    const dailyMealTotals = localStorage.getItem("dailyMealTotals");
    return dailyMealTotals ? JSON.parse(dailyMealTotals) : [0, 0, 0, 0, 0, 0];
  });

  const [weeklyMeals, setWeeklyMeals] = React.useState(function () {
    const storedweeklyMeals = localStorage.getItem("weeklyMeals");
    return storedweeklyMeals ? JSON.parse(storedweeklyMeals) : [];
  });
  const [weeklyMealTotals, setWeeklyMealTotals] = React.useState(function () {
    const weeklyMealTotals = localStorage.getItem("weeklyMealTotals");
    return weeklyMealTotals ? JSON.parse(weeklyMealTotals) : [0, 0, 0, 0, 0, 0];
  });

  //localStorage.removeItem("dailyMeals");
  //localStorage.removeItem("dailyMealTotals");
  //localStorage.removeItem("weeklyMeals");
  //localStorage.removeItem("weeklyMealTotals");

  // Create Meal
  function decrementMealIngredient(ingredient, index) {
    let updatedAmounts = [];

    if (ingredient.Amount > 1) {
      props.setFoundIngredients(function (prevIngredients) {
        const updatedIngredients = [...prevIngredients];

        Object.keys(updatedIngredients[index]).forEach(function (key) {
          if (key != "Name" && key != "Amount") {
            updatedIngredients[index][`${key}`] =
              Number(updatedIngredients[index][`${key}`]) -
              Number(updatedIngredients[index][`${key}`]) /
                updatedIngredients[index].Amount;

            updatedAmounts.push(
              Number(updatedIngredients[index][`${key}`]) /
                (updatedIngredients[index].Amount - 1)
            );
          }
        });

        updatedIngredients[index].Amount = updatedIngredients[index].Amount - 1;
        localStorage.setItem("dailyMeals", JSON.stringify(updatedIngredients));
        return updatedIngredients;
      });
    } else {
      Object.keys(props.foundIngredients[index]).forEach(function (key) {
        if (key != "Name" && key != "Amount") {
          updatedAmounts.push(Number(props.foundIngredients[index][`${key}`]));
        }
      });
      props.setFoundIngredients(function (prevIngredients) {
        const updatedIngredients = [...prevIngredients];
        updatedIngredients.splice(index, 1);
        return updatedIngredients;
      });
    }

    props.setFoundIngredientTotals(function (prevFoundIngredientTotals) {
      const updatedFoundIngredientTotals = [...prevFoundIngredientTotals];
      updatedFoundIngredientTotals[0] -= Number(updatedAmounts[0]);
      updatedFoundIngredientTotals[1] -= Number(updatedAmounts[1]);
      updatedFoundIngredientTotals[2] -= Number(updatedAmounts[2]);
      updatedFoundIngredientTotals[3] -= Number(updatedAmounts[3]);
      updatedFoundIngredientTotals[4] -= Number(updatedAmounts[4]);
      updatedFoundIngredientTotals[5] -= Number(updatedAmounts[5]);

      if (updatedFoundIngredientTotals[0] == 0) {
        document.getElementById("my-meals--create-meal--table").style.display =
          "none";
        document.getElementById(
          "my-meals--section--create-meal--add-to-meal"
        ).style.display = "none";
      }
      return updatedFoundIngredientTotals;
    });
  }

  function addMealToDailyMeals() {
    let newMeal = {};

    newMeal["Name"] = prompt("Provide a name for the meal:");
    newMeal["Amount"] = 1;
    newMeal["Cost"] = props.foundIngredientTotals[0];
    newMeal["Calories"] = props.foundIngredientTotals[1];
    newMeal["Carbs"] = props.foundIngredientTotals[2];
    newMeal["Fat"] = props.foundIngredientTotals[3];
    newMeal["Protein"] = props.foundIngredientTotals[4];
    newMeal["Sodium"] = props.foundIngredientTotals[5];

    setDailyMeals(function (prevMeals) {
      const updatedMeals = [...prevMeals, newMeal];
      localStorage.setItem("dailyMeals", JSON.stringify(updatedMeals));
      return updatedMeals;
    });

    setDailyMealTotals(function (prevDailyMealTotals) {
      const updatedDailyMealTotals = [...prevDailyMealTotals];
      updatedDailyMealTotals[0] += Number(newMeal.Cost);
      updatedDailyMealTotals[1] += Number(newMeal.Calories);
      updatedDailyMealTotals[2] += Number(newMeal.Carbs);
      updatedDailyMealTotals[3] += Number(newMeal.Fat);
      updatedDailyMealTotals[4] += Number(newMeal.Protein);
      updatedDailyMealTotals[5] += Number(newMeal.Sodium);
      localStorage.setItem(
        "dailyMealTotals",
        JSON.stringify(updatedDailyMealTotals)
      );
      return updatedDailyMealTotals;
    });

    props.setFoundIngredients([]);
    props.setFoundIngredientTotals([0, 0, 0, 0, 0, 0]);
  }

  // Daily Meal Tracker
  function incrementDailyMeal(index) {
    let updatedAmounts = [];

    setDailyMeals(function (prevDailyMeals) {
      const updatedDailyMeals = [...prevDailyMeals];

      Object.keys(updatedDailyMeals[index]).forEach(function (key) {
        if (key != "Name" && key != "Amount") {
          updatedDailyMeals[index][`${key}`] =
            Number(updatedDailyMeals[index][`${key}`]) +
            Number(updatedDailyMeals[index][`${key}`]) /
              updatedDailyMeals[index].Amount;

          updatedAmounts.push(
            Number(updatedDailyMeals[index][`${key}`]) /
              (updatedDailyMeals[index].Amount + 1)
          );
        }
      });

      updatedDailyMeals[index].Amount = updatedDailyMeals[index].Amount + 1;
      localStorage.setItem("dailyMeals", JSON.stringify(updatedDailyMeals));
      return updatedDailyMeals;
    });

    setDailyMealTotals(function (prevDailyMealsTotals) {
      const updatedDailyMealTotals = [...prevDailyMealsTotals];
      updatedDailyMealTotals[0] += Number(updatedAmounts[0]);
      updatedDailyMealTotals[1] += Number(updatedAmounts[1]);
      updatedDailyMealTotals[2] += Number(updatedAmounts[2]);
      updatedDailyMealTotals[3] += Number(updatedAmounts[3]);
      updatedDailyMealTotals[4] += Number(updatedAmounts[4]);
      updatedDailyMealTotals[5] += Number(updatedAmounts[5]);
      localStorage.setItem(
        "dailyMealTotals",
        JSON.stringify(updatedDailyMealTotals)
      );
      return updatedDailyMealTotals;
    });
  }

  function decrementDailyMeal(meal, index) {
    let updatedAmounts = [];

    if (meal.Amount > 1) {
      setDailyMeals(function (prevDailyMeals) {
        const updatedDailyMeals = [...prevDailyMeals];

        Object.keys(updatedDailyMeals[index]).forEach(function (key) {
          if (key != "Name" && key != "Amount") {
            updatedDailyMeals[index][`${key}`] =
              Number(updatedDailyMeals[index][`${key}`]) -
              Number(updatedDailyMeals[index][`${key}`]) /
                updatedDailyMeals[index].Amount;

            updatedAmounts.push(
              Number(updatedDailyMeals[index][`${key}`]) /
                (updatedDailyMeals[index].Amount - 1)
            );
          }
        });

        updatedDailyMeals[index].Amount = updatedDailyMeals[index].Amount - 1;
        localStorage.setItem("dailyMeals", JSON.stringify(updatedDailyMeals));
        return updatedDailyMeals;
      });
    } else {
      Object.keys(dailyMeals[index]).forEach(function (key) {
        if (key != "Name" && key != "Amount") {
          updatedAmounts.push(Number(dailyMeals[index][`${key}`]));
        }
      });
      setDailyMeals(function (prevDailyMeals) {
        const updatedDailyMeals = [...prevDailyMeals];
        updatedDailyMeals.splice(index, 1);
        localStorage.setItem("dailyMeals", JSON.stringify(updatedDailyMeals));
        return updatedDailyMeals;
      });
    }

    setDailyMealTotals(function (prevDailyMealsTotals) {
      const updatedDailyMealTotals = [...prevDailyMealsTotals];
      updatedDailyMealTotals[0] -= Number(updatedAmounts[0]);
      updatedDailyMealTotals[1] -= Number(updatedAmounts[1]);
      updatedDailyMealTotals[2] -= Number(updatedAmounts[2]);
      updatedDailyMealTotals[3] -= Number(updatedAmounts[3]);
      updatedDailyMealTotals[4] -= Number(updatedAmounts[4]);
      updatedDailyMealTotals[5] -= Number(updatedAmounts[5]);
      localStorage.setItem(
        "dailyMealTotals",
        JSON.stringify(updatedDailyMealTotals)
      );
      return updatedDailyMealTotals;
    });
  }

  // Weekly Meal Tracker
  function addWeeklyMeal() {
    let newMeal = {};

    // get current weekday
    const days = [
      "Saturday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Sunday",
    ];
    const date = new Date();
    const dayIndex = date.getDay();

    // convert daily meal to object
    newMeal["Weekday"] = days[dayIndex];
    newMeal["Cost"] = dailyMealTotals[0];
    newMeal["Calories"] = dailyMealTotals[1];
    newMeal["Carbs"] = dailyMealTotals[2];
    newMeal["Fat"] = dailyMealTotals[3];
    newMeal["Protein"] = dailyMealTotals[4];
    newMeal["Sodium"] = dailyMealTotals[5];

    let repeatMeal = false;

    // store it in weekly meals
    setWeeklyMeals(function (prevWeeklyMeals) {
      let updatedWeeklyMeals;

      // check if there would be repeat days, if so start a new week
      weeklyMeals.forEach((meal) => {
        if (meal.Weekday == days[dayIndex]) {
          repeatMeal = true;
        }
      });

      if (days[dayIndex] == "Monday" || repeatMeal) {
        updatedWeeklyMeals = [newMeal];
      } else {
        updatedWeeklyMeals = [...prevWeeklyMeals, newMeal];
      }

      localStorage.setItem("weeklyMeals", JSON.stringify(updatedWeeklyMeals));
      return updatedWeeklyMeals;
    });

    // update totals with daily meal
    setWeeklyMealTotals(function (prevWeeklyMealTotals) {
      let updatedWeeklyMealTotals;

      if (days[dayIndex] == "Monday" || repeatMeal) {
        updatedWeeklyMealTotals = [0, 0, 0, 0, 0, 0];
      } else {
        updatedWeeklyMealTotals = [...prevWeeklyMealTotals];
      }

      updatedWeeklyMealTotals[0] += Number(newMeal.Cost);
      updatedWeeklyMealTotals[1] += Number(newMeal.Calories);
      updatedWeeklyMealTotals[2] += Number(newMeal.Carbs);
      updatedWeeklyMealTotals[3] += Number(newMeal.Fat);
      updatedWeeklyMealTotals[4] += Number(newMeal.Protein);
      updatedWeeklyMealTotals[5] += Number(newMeal.Sodium);

      localStorage.setItem(
        "weeklyMealTotals",
        JSON.stringify(updatedWeeklyMealTotals)
      );

      return updatedWeeklyMealTotals;
    });

    setDailyMeals([]);
    localStorage.setItem("dailyMeals", []);
    setDailyMealTotals([0, 0, 0, 0, 0, 0]);
    localStorage.setItem("dailyMealTotals", []);
  }

  // Change Create Meal Amount
  function updateCreateMealAmount(event, index, ingredient) {
    const amount = event.target.value;

    if (amount > Number(ingredient.Amount)) {
      props.incrementMealIngredient(index);
    } else {
      decrementMealIngredient(ingredient, index);
    }
  }

  function updateDailyMealAmount(event, index, meal) {
    const amount = event.target.value;

    if (amount > Number(meal.Amount)) {
      incrementDailyMeal(index);
    } else {
      decrementDailyMeal(meal, index);
    }
  }

  const foundIngredientsTable = props.foundIngredients.map(function (
    ingredient,
    index
  ) {
    return (
      <tr key={index}>
        <td className="table-cell">{ingredient.Name}</td>
        <td className="table-cell">
          <input
            className="table-counter"
            type="number"
            value={ingredient.Amount ? ingredient.Amount : 0}
            onChange={(event) =>
              updateCreateMealAmount(event, index, ingredient)
            }
          />
        </td>
        <td className="table-cell">
          {parseFloat(parseFloat(ingredient.Cost).toFixed(2))}$
        </td>
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

  const foundIngredientTotalsTable = props.foundIngredientTotals.map(function (
    total,
    index
  ) {
    return (
      <td key={index} className="table-head">
        {parseFloat(total.toFixed(2))}
      </td>
    );
  });

  const dailyMealsTable = dailyMeals.map(function (meal, index) {
    return (
      <tr key={index}>
        <td className="table-cell">{meal.Name}</td>
        <td className="table-cell">
          {
            <input
              className="table-counter"
              type="number"
              value={meal.Amount ? meal.Amount : 0}
              onChange={(event) => updateDailyMealAmount(event, index, meal)}
            />
          }
        </td>
        <td className="table-cell">
          {parseFloat(parseFloat(meal.Cost).toFixed(2))}$
        </td>
        <td className="table-cell">
          {parseFloat(parseFloat(meal.Calories).toFixed(2))}
        </td>
        <td className="table-cell">
          {parseFloat(parseFloat(meal.Carbs).toFixed(2))}g
        </td>
        <td className="table-cell">
          {parseFloat(parseFloat(meal.Fat).toFixed(2))}g
        </td>
        <td className="table-cell">
          {parseFloat(parseFloat(meal.Protein).toFixed(2))}g
        </td>
        <td className="table-cell">
          {parseFloat(parseFloat(meal.Sodium).toFixed(2))}mg
        </td>
      </tr>
    );
  });

  const dailyMealTotalsTable = dailyMealTotals.map(function (total, index) {
    const units = ["$", "kcal", "g", "g", "g", "mg"];

    return (
      <td key={index} className="table-head">
        {parseFloat(total.toFixed(2))}
        {units[index]}
      </td>
    );
  });

  const weeklyMealsTable = weeklyMeals.map(function (dailyMeal, index) {
    return (
      <tr key={index}>
        <td className="table-cell">{dailyMeal.Weekday}</td>
        <td className="table-cell">
          {parseFloat(parseFloat(dailyMeal.Cost).toFixed(2))}$
        </td>
        <td className="table-cell">
          {parseFloat(parseFloat(dailyMeal.Calories).toFixed(2))}
        </td>
        <td className="table-cell">
          {parseFloat(parseFloat(dailyMeal.Carbs).toFixed(2))}g
        </td>
        <td className="table-cell">
          {parseFloat(parseFloat(dailyMeal.Fat).toFixed(2))}g
        </td>
        <td className="table-cell">
          {parseFloat(parseFloat(dailyMeal.Protein).toFixed(2))}g
        </td>
        <td className="table-cell">
          {parseFloat(parseFloat(dailyMeal.Sodium).toFixed(2))}mg
        </td>
      </tr>
    );
  });

  const weeklyMealAveragesTable = weeklyMealTotals.map(function (total, index) {
    const units = ["$", "kcal", "g", "g", "g", "mg"];

    return (
      <td key={index} className="table-head">
        {parseFloat((parseFloat(total) / weeklyMeals.length).toFixed(2))}
        {units[index]}
      </td>
    );
  });

  return (
    <div className="component" id="my-meals">
      <div className="default-section">
        <h3 className="section--header">Create Meal</h3>
        <div className="search-bar">
          <input
            className="default-input"
            id="my-meals--section--search-ingredient--input"
          ></input>
          <button className="default-button" onClick={props.searchIngredient}>
            Search Ing.
          </button>
        </div>
        <div className="table-container">
          <table className="table" id="my-meals--create-meal--table">
            <thead>
              <tr>
                <th className="table-head">Name</th>
                <th className="table-head">Amount</th>
                <th className="table-head">Cost</th>
                <th className="table-head">Calories</th>
                <th className="table-head">Carbs</th>
                <th className="table-head">Fats</th>
                <th className="table-head">Protein</th>
                <th className="table-head">Sodium</th>
              </tr>
            </thead>
            <tbody>
              {foundIngredientsTable}
              <tr>
                <td className="table-head" colSpan={2}>
                  Total
                </td>
                {foundIngredientTotalsTable}
              </tr>
            </tbody>
          </table>
        </div>
        <button
          className="default-button"
          id="my-meals--section--create-meal--add-to-meal"
          onClick={addMealToDailyMeals}
        >
          Add to Daily Meals
        </button>
      </div>
      <div className="default-section">
        <h3 className="section--header">Daily Tracker</h3>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th className="table-head">Name</th>
                <th className="table-head">Amount</th>
                <th className="table-head">Cost</th>
                <th className="table-head">Calories</th>
                <th className="table-head">Carbs</th>
                <th className="table-head">Fats</th>
                <th className="table-head">Protein</th>
                <th className="table-head">Sodium</th>
              </tr>
            </thead>
            <tbody>
              {dailyMealsTable}
              <tr>
                <td className="table-head" colSpan={2}>
                  Total
                </td>
                {dailyMealTotalsTable}
              </tr>
            </tbody>
          </table>
        </div>
        <button
          className="default-button"
          id="my-meals--add-to-weekly-meals-btn"
          onClick={addWeeklyMeal}
        >
          Add to Weekly Meals
        </button>
      </div>
      <div className="default-section">
        <h3 className="section--header">Weekly Tracker</h3>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th className="table-head">Weekday</th>
                <th className="table-head">Cost</th>
                <th className="table-head">Calories</th>
                <th className="table-head">Carbs</th>
                <th className="table-head">Fats</th>
                <th className="table-head">Protein</th>
                <th className="table-head">Sodium</th>
              </tr>
            </thead>
            <tbody>
              {weeklyMealsTable}
              <tr>
                <td className="table-head">Averages</td>
                {weeklyMealAveragesTable}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MyMeals;
