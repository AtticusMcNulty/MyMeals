import React from "react";

function ShoppingCart(props) {
  const { cart, quantities, onRemoveItem, onSubtractItem } = props;

  let cartItems = cart.map(function (item, index) {
    return (
      <div className="shopping-cart--item" key={index}>
        <p className="shopping-cart--item--name">{item}</p>
        <div className="shopping-cart--item--quantity">{`Quantity: ${quantities[index]}`}</div>
        <button
          className="default-button--char"
          onClick={function () {
            onSubtractItem(index);
          }}
        >
          -
        </button>

        <button
          className="default-button--char"
          onClick={function () {
            onRemoveItem(index);
          }}
        >
          X
        </button>
      </div>
    );
  });

  return (
    <div className="default-section">
      <h3 className="section--header">Shopping Cart</h3>
      <div id="shopping-cart--items">{cartItems}</div>
    </div>
  );
}

export default ShoppingCart;
