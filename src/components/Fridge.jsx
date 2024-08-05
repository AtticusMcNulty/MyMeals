import React from "react";
import ShoppingCart from "./ShoppingCart";
import ingredients from "../data/ingredients";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowLeft,
  faX,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";

function Fridge({ handleFridgeToRecipes }) {
  /* IN FRIDGE */
  const [foodsArrAvaliable, setFoodsAvaliable] = React.useState(function () {
    const avaliableFoods = localStorage.getItem("avaliableFoods");
    return avaliableFoods ? JSON.parse(avaliableFoods) : []; // If avaliableFoods stores an array, return that array, else return an empty array
  });

  function addAvaliableFood() {
    const foodItem = document
      .getElementById("fridge--add--input")
      .value.toLowerCase();

    if (foodsArrAvaliable.includes(foodItem)) {
      alert("Please add an item not already in list");
      return;
    } else if (foodItem.length == 0 || !(foodItem in ingredients)) {
      alert("Enter a valid food");
      return;
    }

    console.log(foodsArrAvaliable, ingredients);

    setFoodsAvaliable(function (prevFoodsArr) {
      const updatedFoodsArr = [...prevFoodsArr, foodItem];
      localStorage.setItem("avaliableFoods", JSON.stringify(updatedFoodsArr));
      document.getElementById("fridge--add--input").value = "";
      return updatedFoodsArr;
    });

    setStorageAmounts(function (prevStorageAmount) {
      const updatedStorageAmount = [...prevStorageAmount];
      updatedStorageAmount.push("100%");
      localStorage.setItem(
        "storageAmounts",
        JSON.stringify(updatedStorageAmount)
      );
      return updatedStorageAmount;
    });
  }

  function removeAvaliableFood(index) {
    setFoodsAvaliable(function (prevFoodsArr) {
      const updatedFoodsArr = [...prevFoodsArr];
      updatedFoodsArr.splice(index, 1); // removes one element at the position of index
      localStorage.setItem("avaliableFoods", JSON.stringify(updatedFoodsArr));
      return updatedFoodsArr;
    });
  }

  function switchToAvaliable(index) {
    const foodItem = JSON.parse(localStorage.getItem("unavaliableFoods"))[
      index
    ];

    // Remove the corresponding percentage amount from the array
    setStorageAmounts(function (prevStorageAmount) {
      const updatedStorageAmount = [...prevStorageAmount];
      updatedStorageAmount.splice(index, 0, "100%");
      localStorage.setItem(
        "storageAmounts",
        JSON.stringify(updatedStorageAmount)
      );
      return updatedStorageAmount;
    });

    setFoodsAvaliable(function (prevFoodsArr) {
      const updatedFoodsArr = [...prevFoodsArr, foodItem];
      localStorage.setItem("avaliableFoods", JSON.stringify(updatedFoodsArr));
      return updatedFoodsArr;
    });

    removeUnavaliableFood(index);
  }

  /* IN FRIDGE -- STORAGE AMOUNTS */
  const [storageAmounts, setStorageAmounts] = React.useState(function () {
    const storedStorageAmounts = localStorage.getItem("storageAmounts");

    // Check if the stored storage amounts array exists; if so, then return the parsed array; else, initialize with "100%" for each available food (100% will be stored x amount of times inside storageAmounts array)
    return storedStorageAmounts
      ? JSON.parse(storedStorageAmounts)
      : foodsArrAvaliable.map(function () {
          "100%";
        });
  });

  function adjustStorageAmounts(index, change) {
    setStorageAmounts(function (prevStorageAmounts) {
      const updatedStorageAmounts = [...prevStorageAmounts];
      const currentAmount = updatedStorageAmounts[index];

      if (change === -1) {
        if (currentAmount === "100%") {
          updatedStorageAmounts[index] = "50%";
        } else if (currentAmount === "50%") {
          updatedStorageAmounts[index] = "25%";
        } else if (currentAmount === "25%") {
          switchToUnavaliable(index);
        }
      } else if (change === 1) {
        if (currentAmount === "25%") {
          updatedStorageAmounts[index] = "50%";
        } else if (currentAmount === "50%") {
          updatedStorageAmounts[index] = "100%";
        }
      }

      localStorage.setItem(
        "storageAmounts",
        JSON.stringify(updatedStorageAmounts)
      );

      return updatedStorageAmounts;
    });
  }

  // maps each new inputted food item to a list element in our avaliable foods list
  const avaliableFoodsArr = foodsArrAvaliable.map(function (food, index) {
    const currentAmount = storageAmounts[index];
    let divClassName = "full";

    if (currentAmount === "50%") {
      divClassName = "half-full";
    } else if (currentAmount === "25%") {
      divClassName = "quarter-full";
    } else if (currentAmount === "0%") {
      divClassName = "empty";
    }

    return (
      <div className="fridge--storage--list-item" key={food}>
        <li className="fridge--storage--list-item--header">{food}</li>
        <div className="fridge--storage--list-item--amount">
          <button
            className="default-button--char"
            onClick={() => adjustStorageAmounts(index, -1)}
          >
            <FontAwesomeIcon icon={faMinus} />
          </button>
          <div className={divClassName}>{storageAmounts[index]}</div>
          <button
            className="default-button--char"
            onClick={() => adjustStorageAmounts(index, 1)}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        <div className="fridge--storage--list-item--modify">
          <button
            className="default-button--char"
            onClick={() => removeAvaliableFood(index)}
          >
            <FontAwesomeIcon icon={faX} />
          </button>
          <button
            className="default-button--char"
            onClick={() => switchToUnavaliable(index)}
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>
    );
  });

  /* TO BUY */
  const [foodsArrUnavaliable, setFoodsUnavaliable] = React.useState(
    function () {
      const unavaliableFoods = localStorage.getItem("unavaliableFoods"); // If unavaliableFoods stores an array, return that array, else return an empty array
      return unavaliableFoods ? JSON.parse(unavaliableFoods) : [];
    }
  );

  function addUnavaliableFood(index) {
    const foodItem = JSON.parse(localStorage.getItem("avaliableFoods"))[index];

    setFoodsUnavaliable(function (prevFoodsArr) {
      const updatedFoodsArr = [...prevFoodsArr, foodItem];
      localStorage.setItem("unavaliableFoods", JSON.stringify(updatedFoodsArr));
      return updatedFoodsArr;
    });
  }

  function removeUnavaliableFood(index) {
    setFoodsUnavaliable(function (prevFoodsArr) {
      const updatedFoodsArr = [...prevFoodsArr];
      updatedFoodsArr.splice(index, 1);
      localStorage.setItem("unavaliableFoods", JSON.stringify(updatedFoodsArr));
      return updatedFoodsArr;
    });
  }

  function switchToUnavaliable(index) {
    setStorageAmounts(function (prevStorageAmount) {
      const updatedStorageAmount = [...prevStorageAmount];
      updatedStorageAmount.splice(index, 1);
      localStorage.setItem(
        "storageAmounts",
        JSON.stringify(updatedStorageAmount)
      );
      return updatedStorageAmount;
    });

    addUnavaliableFood(index);
    removeAvaliableFood(index);
  }

  // maps each unavaliable food item to a list element in our unavaliable foods list
  const unavaliableFoodsArr = foodsArrUnavaliable.map(function (food, index) {
    return (
      <div className="fridge--storage--list-item" key={index}>
        <li className="fridge--storage--list-item--header">{food}</li>
        <div className="fridge--storage--list-item--amount">
          <span
            className="default-button"
            onClick={function () {
              addItemToCart(food);
            }}
          >
            Add to Cart
          </span>
        </div>

        <div className="fridge--storage--list-item--modify">
          <button
            className="default-button--char"
            onClick={function () {
              removeUnavaliableFood(index);
            }}
          >
            <FontAwesomeIcon icon={faX} />
          </button>
          <button
            className="default-button--char"
            onClick={function () {
              switchToAvaliable(index);
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
        </div>
      </div>
    );
  });

  /* CART ITEMS -> QUANTITIES */
  const [cartItems, setCartItems] = React.useState(function () {
    const storedCartItems = localStorage.getItem("cartItems");
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  const [quantities, setQuantities] = React.useState(function () {
    const storedQuantities = localStorage.getItem("quantities");
    return storedQuantities
      ? JSON.parse(storedQuantities)
      : cartItems.map(() => 1);
  });

  function addItemToCart(food) {
    if (cartItems.includes(food)) {
      setQuantities(function (prevQuantities) {
        const updatedQuantities = [...prevQuantities];
        updatedQuantities[cartItems.indexOf(food)] += 1;
        localStorage.setItem("quantities", JSON.stringify(updatedQuantities));
        return updatedQuantities;
      });
    } else {
      setCartItems(function (prevCart) {
        const updatedCart = [...prevCart, food];
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
        return updatedCart;
      });
      setQuantities(function (prevQuantities) {
        const updatedQuantities = [...prevQuantities, 1];
        localStorage.setItem("quantities", JSON.stringify(updatedQuantities));
        return updatedQuantities;
      });
    }
  }

  function handleRemoveItem(index) {
    setQuantities(function (prevQuantities) {
      const updatedQuantities = [...prevQuantities];
      updatedQuantities.splice(index, 1);
      localStorage.setItem("quantities", JSON.stringify(updatedQuantities));
      return updatedQuantities;
    });
    setCartItems(function (prevCart) {
      const updatedCart = [...prevCart];
      updatedCart.splice(index, 1);
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      return updatedCart;
    });
  }

  function handleSubtractItem(index) {
    setQuantities(function (prevQuantities) {
      const updatedQuantities = [...prevQuantities];

      if (updatedQuantities[index] - 1 == 0) {
        setCartItems(function (prevCart) {
          const updatedCart = [...prevCart];
          updatedCart.splice(index, 1);
          localStorage.setItem("cartItems", JSON.stringify(updatedCart));
          return updatedCart;
        });

        updatedQuantities.splice(index, 1);
      } else {
        updatedQuantities[index] -= 1;
      }

      localStorage.setItem("quantities", JSON.stringify(updatedQuantities));
      return updatedQuantities;
    });
  }

  return (
    <div id="inventory" className="component active">
      <div className="default-section">
        <div className="search-bar">
          <input
            type="text"
            className="default-input"
            id="fridge--add--input"
          ></input>
          <button className="default-button" onClick={addAvaliableFood}>
            Add Item to Fridge
          </button>
        </div>
        <div className="default-section--content">
          <div className="default-section--item">
            <h3 className="section--header">Fridge</h3>
            <ul className="section--list">{avaliableFoodsArr}</ul>
            <button
              className="default-button"
              id="fridge--storage--add-to-recipes"
              onClick={() => handleFridgeToRecipes(foodsArrAvaliable)}
            >
              Add Fridge to Recipes
            </button>
          </div>
          <div className="default-section--item">
            <h3 className="section--header">Out of Stock</h3>
            <ul className="section--list">{unavaliableFoodsArr}</ul>
          </div>
          <ShoppingCart
            cart={cartItems}
            quantities={quantities}
            onRemoveItem={handleRemoveItem}
            onSubtractItem={handleSubtractItem}
          />
        </div>
      </div>
    </div>
  );
}

export default Fridge;
