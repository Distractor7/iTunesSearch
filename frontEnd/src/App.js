import "./App.css";
import logo from "../src/iTunes.png";

import { useState } from "react";

import Search from "./components/search";
import Favourites from "./components/favourites";
import Nav from "./components/nav";

function App() {
  //State to keep track of the component actively being rendered.
  const [activeComponent, setActiveComponent] = useState("search");

  //Function to set active component to favourites.
  const showFavourites = () => {
    setActiveComponent("favourites");
  };

  //Function to set active component to search.
  const showSearch = () => {
    setActiveComponent("search");
  };
  //JSX rendered to the dom.
  return (
    <div className="App">
      <img alt="logo" src={logo}></img>
      <div>
        {/* Below the Nav component it passed two functions down as props.*/}
        <Nav showSearch={showSearch} showFavourites={showFavourites} />
        {/* Below, if the active component is equal to favourites then the condition is true and the favourites component will be rendered. */}
        {activeComponent === "favourites" && <Favourites />}
        {/* Below, if the active component is equal to search then the condition is true and the search component will be rendered. */}
        {activeComponent === "search" && <Search />}
      </div>
    </div>
  );
}

export default App;
