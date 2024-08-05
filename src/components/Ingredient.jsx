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
                    <td className="table-cell">{`${nutrient.name}`}</td>
                    <td className="table-cell">{`${nutrient.amount}${nutrient.unit}`}</td>
                    <td className="table-cell">{`${nutrient.percentOfDailyNeeds}%`}</td>
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
        <div id="ingredient-data">
          <div className="ingredient-data--header">
            <img
              className="ingredient-data--img"
              src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredientData.image}`}
              alt={ingredientData.name}
            />
            <div className="ingredient-data--name">{ingredientData.name}</div>
          </div>

          <div className="ingredient-data--info">
            <div className="ingredient-data--item">
              <div className="item-label">Amount</div>
              <div className="item-value">{props.amount}</div>
            </div>
            <div className="ingredient-data--item">
              <div className="item-label">Estimated Cost</div>
              <div className="item-value">
                {(ingredientData.estimatedCost.value / 100).toFixed(2)}
              </div>
            </div>
            <div className="ingredient-data--item">
              <div className="item-label">Weight</div>
              <div className="item-value">
                {ingredientData.nutrition.weightPerServing.amount}
                {ingredientData.nutrition.weightPerServing.unit}
              </div>
            </div>
            <div className="ingredient-data--item">
              <div className="item-label">Category</div>
              <div className="item-value">{ingredientData.categoryPath[0]}</div>
            </div>
            <div className="ingredient-data--item">
              <div className="item-label">Consistency</div>
              <div className="item-value">{ingredientData.consistency}</div>
            </div>
            <div className="ingredient-data--item">
              <div className="item-label">Aisle</div>
              <div className="item-value">{ingredientData.aisle}</div>
            </div>
            <div className="ingredient-data--item">
              <div className="item-label">Carbs</div>
              <div className="item-value">
                {ingredientData.nutrition.caloricBreakdown.percentCarbs}%
              </div>
            </div>
            <div className="ingredient-data--item">
              <div className="item-label">Fat</div>
              <div className="item-value">
                {ingredientData.nutrition.caloricBreakdown.percentFat}%
              </div>
            </div>
            <div className="ingredient-data--item">
              <div className="item-label">Protein</div>
              <div className="item-value">
                {ingredientData.nutrition.caloricBreakdown.percentProtein}%
              </div>
            </div>
            <div className="ingredient-data--item">
              <div className="item-label">Nutrition Score</div>
              <div className="item-value">
                {ingredientData.nutrition.properties[3].amount.toFixed(2)}%
              </div>
            </div>
            <div className="ingredient-data--item">
              <div className="item-label">Inflam. Score</div>
              <div className="item-value">
                {ingredientData.nutrition.properties[2].amount}
              </div>
            </div>
            <div className="ingredient-data--item">
              <div className="item-label">Glycemic Index</div>
              <div className="item-value">
                {ingredientData.nutrition.properties[1].amount.toFixed(2)}
              </div>
            </div>
          </div>

          <div className="table-container">
            <table className="table" id="ingredient-table">
              <thead>
                <tr>
                  <th className="table-head">Name</th>
                  <th className="table-head">Amount</th>
                  <th className="table-head">Daily Percent</th>
                </tr>
              </thead>
              <tbody>{nutrients}</tbody>
            </table>
          </div>
        </div>
      ) : (
        <p>Loading....</p>
      )}
    </div>
  );
}

export default Ingredient;
