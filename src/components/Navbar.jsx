import React from "react";

function Navbar(props) {
  function switchTab(num) {
    // remove active class from all tabs
    document.querySelectorAll(".component").forEach(function (component) {
      if (component.classList.contains("active")) {
        component.classList.remove("active");
      }
    });

    // add active class to appropriate tab
    if (num == 1) document.getElementById("inventory").classList.add("active");
    else if (num == 2)
      document.getElementById("search").classList.add("active");
    else if (num == 3)
      document.getElementById("my-ingredients").classList.add("active");
    else if (num == 4)
      document.getElementById("my-meals").classList.add("active");
  }

  React.useEffect(
    function () {
      if (props.tab != null) switchTab(2);
    },
    [props.tab, props.navKey]
  );

  return (
    <div className="navbar">
      <ul className="navbar--headers">
        <li
          onClick={function () {
            switchTab(1);
          }}
        >
          Inventory
        </li>
        <li
          onClick={function () {
            switchTab(2);
          }}
        >
          Search Items
        </li>
        <li
          onClick={function () {
            switchTab(3);
          }}
        >
          My Ingredients
        </li>
        <li
          onClick={function () {
            switchTab(4);
          }}
        >
          My Meals
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
