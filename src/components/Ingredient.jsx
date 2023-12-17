import React from "react";

const apiKey = "e0fb50c6657a4444bebe78ba67ad286f";

function Ingredient(props) {
  const [ingredientData, setIngredientData] = React.useState(null);
  const [nutrients, setNutrients] = React.useState([]);

  function checkNutrient(nutrient) {
    nutrient = nutrient.name;

    if (
      nutrient == "Sodium" ||
      nutrient == "Caffeine" ||
      nutrient == "Potassium" ||
      nutrient == "Fiber" ||
      nutrient == "Calories" ||
      nutrient == "Sugar" ||
      nutrient == "Fat" ||
      nutrient == "Carbohydrates" ||
      nutrient == "Protein" ||
      nutrient == "Alcohol" ||
      nutrient == "Calcium"
    ) {
      return nutrient;
    }
  }

  React.useEffect(() => {
    fetch(
      `https://api.spoonacular.com/food/ingredients/${props.id}/information?apiKey=${apiKey}&amount=${props.amount}`
    )
      .then((response) => response.json())
      .then((data) => {
        setIngredientData(data);

        if (data && data.nutrition && data.nutrition.nutrients) {
          setNutrients(
            data.nutrition.nutrients
              .filter(checkNutrient)
              .map(function (nutrient, index) {
                return (
                  <tr key={index}>
                    <td className="ingredient--table-cell">{`${nutrient.name}`}</td>
                    <td className="ingredient--table-cell">{`${nutrient.unit}`}</td>
                    <td className="ingredient--table-cell">{`${nutrient.amount}`}</td>
                    <td className="ingredient--table-cell">{`${nutrient.percentOfDailyNeeds}`}</td>
                  </tr>
                );
              })
          );
        } else {
          setNutrients([]);
        }
      });
  }, [props.id, props.amount]);

  return (
    <div>
      {ingredientData ? (
        <ul id="ingredient-data">
          <li className="ingredient-data--name">{`${ingredientData.name}`}</li>
          <img
            className="ingredient-data--img"
            src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredientData.image}`}
          ></img>
          <li className="ingredient-data--li">{`Estimated Cost: ${(
            ingredientData.estimatedCost.value / 100
          ).toFixed(2)}$`}</li>
          <li className="ingredient-data--li">{`Weight: ${ingredientData.nutrition.weightPerServing.amount}${ingredientData.nutrition.weightPerServing.unit}`}</li>
          <li className="ingredient-data--li">{`Category: ${ingredientData.categoryPath[0]}`}</li>
          <li className="ingredient-data--li">{`Consistency: ${ingredientData.consistency}`}</li>
          <li className="ingredient-data--li">{`Aisle: ${ingredientData.aisle}`}</li>
          <li className="ingredient-data--li">{`Carbs: ${ingredientData.nutrition.caloricBreakdown.percentCarbs}%`}</li>
          <li className="ingredient-data--li">{`Fat: ${ingredientData.nutrition.caloricBreakdown.percentFat}%`}</li>
          <li className="ingredient-data--li">{`Protien: ${ingredientData.nutrition.caloricBreakdown.percentProtein}%`}</li>
          <table className="ingredient--table">
            <thead>
              <tr>
                <th className="ingredient--table-head">Name</th>
                <th className="ingredient--table-head">Unit</th>
                <th className="ingredient--table-head">Amount</th>
                <th className="ingredient--table-head">Daily Percent</th>
              </tr>
            </thead>
            <tbody>{nutrients}</tbody>
          </table>
        </ul>
      ) : (
        <p>Loading....</p>
      )}
    </div>
  );
}

export default Ingredient;
