import React from "react";
import Navbar from "./components/Navbar";
import SearchItems from "./components/SearchItems";
import Fridge from "./components/Fridge";
import MyFood from "./components/MyFood";

function App() {
  const [tab, setTab] = React.useState(null);
  const [navKey, setNavKey] = React.useState(0);

  const [fridgeIngredients, setFridgeIngredients] = React.useState([]);
  const [numRecipes, setNumRecipes] = React.useState(1);

  function handleFridgeToRecipes(updatedIngredients) {
    setFridgeIngredients(updatedIngredients);
    setNumRecipes(prompt("Enter your desired number of recipes"));
    setTab(2);
    setNavKey(navKey + 1);
  }

  return (
    <div>
      <div id="overlay"></div>
      <Navbar key={navKey} tab={tab} />
      <Fridge handleFridgeToRecipes={handleFridgeToRecipes} />
      <SearchItems
        fridgeIngredients={fridgeIngredients}
        numRecipes={numRecipes}
      />
      <MyFood />
    </div>
  );
}

export default App;
