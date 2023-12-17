import React from "react";

const apiKey = "e0fb50c6657a4444bebe78ba67ad286f";

function Recipe(props) {
  const [recipeData, setRecipeData] = React.useState(null);
  React.useEffect(() => {
    fetch(
      `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${props.list}&number=${props.numRecipes}&ignorePantry=true&ranking=2`
    )
      .then((response) => response.json())
      .then((data) => {
        setRecipeData(data);
      });
  }, [props.list, props.numRecipes]);

  const recipes = recipeData ? (
    recipeData.map(function (recipe) {
      return (
        <tr key={recipe.id} className="search-recipes--table--row">
          <td className="table-cell recipe--table-cell">{recipe.title}</td>
          <td className="table-cell recipe--table-cell">
            <img className="table-cell--img" src={recipe.image}></img>
          </td>
          <td className="table-cell recipe--table-cell">
            {recipe.usedIngredients.map((ingredient, index) => (
              <span className="table-cell--span" key={index}>
                {ingredient.original}
              </span>
            ))}
          </td>
          <td className="table-cell recipe--table-cell">
            {recipe.missedIngredients.map((ingredient, index) => (
              <span className="table-cell--span" key={index}>
                {ingredient.original}
              </span>
            ))}
          </td>
        </tr>
      );
    })
  ) : (
    <tr>
      <td>Loading....</td>
    </tr>
  );

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th className="table-head recipe--table-head">Name</th>
            <th className="table-head recipe--table-head">Image</th>
            <th className="table-head recipe--table-head">Used Ingredients</th>
            <th className="table-head recipe--table-head">
              Missing Ingredients
            </th>
          </tr>
        </thead>
        <tbody>{recipes}</tbody>
      </table>
    </div>
  );
}

export default Recipe;
