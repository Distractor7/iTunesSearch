import React from "react";
import "../App.css";

function Nav({ showSearch, showFavourites }) {
  return (
    <div className="navBarDiv">
      <nav className="navDiv">
        <button className="pages" onClick={showSearch}>
          Search
        </button>
        <button className="pages" onClick={showFavourites}>
          Favourites
        </button>
      </nav>
    </div>
  );
}

export default Nav;
