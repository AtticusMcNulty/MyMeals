import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faMinus } from "@fortawesome/free-solid-svg-icons";

function ShoppingCart(props) {
  const { cart, quantities, onRemoveItem, onSubtractItem } = props;

  let cartItems = cart.map(function (item, index) {
    return (
      <div className="shopping-cart--item" key={index}>
        <li className="shopping-cart--item--name">{item}</li>
        <div className="shopping-cart--item--quantity">{`Quantity: ${quantities[index]}`}</div>
        <div className="fridge--storage--list-item--modify">
          <button
            className="default-button--char"
            onClick={function () {
              onSubtractItem(index);
            }}
          >
            <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>
          </button>
          <button
            className="default-button--char"
            onClick={function () {
              onRemoveItem(index);
            }}
          >
            <FontAwesomeIcon icon={faX}></FontAwesomeIcon>
          </button>
        </div>
      </div>
    );
  });

  return (
    <div className="default-section--item">
      <h3 className="section--header">Shopping Cart</h3>
      <div>{cartItems}</div>
    </div>
  );
}

export default ShoppingCart;
