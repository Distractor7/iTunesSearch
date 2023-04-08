//Below are the necessary imports, css, hooks and image import.
import React from "react";
import "../App.css";
import { useState, useEffect } from "react";
import "../iTunes.png";

function Search(props) {
  //Below are for state variables and their setFunctions.
  //Term state variable is used to store the users search terms.
  const [term, setTerm] = useState("");
  //media state variable is used to store the media selected in the drop down selector of the search bar.
  const [media, setMedia] = useState("music");
  //The search results are used to store the objects that result in the search the user peforms.
  const [searchResults, setSearchResults] = useState([]);
  //variable below stores the media type that is present in the media variable when the search button is clicked.
  const [submittedMediaType, setSubmittedMediaType] = useState("music");

  //Below is function that fetches search results from the api using the users search term and media type as its parameters.
  //It also sets the search results to be stored in searchResults variable.
  const handleSubmit = async (e) => {
    //line below prevents page from reloading.
    e.preventDefault();
    //the submittedMediaType variable is set with the value that it holds at the time of search being clicked.
    setSubmittedMediaType(media);
    //Below a variable is created to store the response of a fetch request to the url that is created from the base url and the users search term and media type.
    const response = await fetch(
      `http://localhost:3001/search?term=${encodeURIComponent(
        term
      )}&media=${encodeURIComponent(media)}`
    );
    //data stores the parsed json data from the fetch request.
    const data = await response.json();
    //search results array is set to store the response data.
    setSearchResults(data.results);
  };

  //Below an asyncronous function that handles sending a post request to my local server end point.
  //It take a single argument as an argument.
  const addToFavourites = async (item) => {
    //The try part of
    try {
      //This line creates a new object named itemWithMediaType by merging the item object with an additional property, mediaType, which is set to the value of the media variable (not defined in the given code snippet). The spread operator (...) is used to copy all properties from the item object to the new object.
      const itemWithMediaType = { ...item, mediaType: media };

      //below is a fetch request that make a post request to the local server api end point.
      await fetch("http://localhost:3001/favourites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        //This line converts the itemWithMediaType object to a JSON string using the JSON.stringify() method and sets it as the request body.
        body: JSON.stringify(itemWithMediaType),
      });
      //The console logs if the item was succesfully added.
      console.log("Item added to favourites:", item);
      //Below a catch block handles a console log if the item failed to be added for some reason.
    } catch (error) {
      console.error("Error adding item to favourites:", error);
    }
  };

  return (
    <div className="searchBarDiv">
      {/* Below the form for the user to enter search term and media type is defined. The form takes the handleSubmit function as onSubmit.*/}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search term"
          value={term}
          // The onchange attribute takes content of the input field and sets the "term" variable to input value..
          onChange={(e) => setTerm(e.target.value)}
          className="inputForm"
        ></input>
        {/* Little accordion menu allows user to select between media types. */}
        <select
          className="media"
          value={media}
          //The media state variable is set by the e target value using onchange.
          onChange={(e) => setMedia(e.target.value)}
        >
          {/* The options given for media types. */}
          <option value="music">music</option>
          <option value="ebook">ebook</option>
          <option value="podcast">podcast</option>
          <option value="movie">movie</option>
        </select>
        {/* Below is the submit button to make a search. */}
        <button type="submit" className="label">
          Search
        </button>
      </form>

      <div className="resContainer">
        {/* Each item from the searched results is mapped over and rendered to the dom with specific aspects of the item shown. */}
        {searchResults.map((result, index) => (
          <div key={index} className="resultItem">
            {/* Add img element with the artworkUrl100 as the src */}
            {/* The art work of the result item is displayed */}
            <img
              className="images"
              src={result.artworkUrl100}
              alt={`${result.trackName} artwork`}
            />
            {/* Specific details are conditionally rendered for the result items depending on which media type has been selected. */}
            {submittedMediaType === "ebook" && (
              <>
                {/* Below the details for an ebook item are rendered. */}
                <h1 className="Author">Author: {result.artistName}</h1>
                <h1 className="Title">Title: {result.trackName}</h1>
                <h1 className="Description">
                  Description: {result.description}
                </h1>
                {/* Each result item has a button to add the item to the favourites list.
                The button is passed the addToFavorites function as an onClick prop.*/}
                <button
                  onClick={() => addToFavourites(result)}
                  className="addBtn"
                >
                  Add
                </button>
              </>
            )}
            {submittedMediaType === "music" && (
              <>
                {/* Below the details for a music item are rendered. */}
                <div className="musicResult">
                  <h1 className="artist">Artist: {result.artistName}</h1>
                  <h1 className="track">Track: {result.trackName}</h1>
                  <div className="audioAndSave">
                    <audio
                      className="audio"
                      controls
                      src={result.previewUrl}
                    ></audio>
                    {/* Each result item has a button to add the item to the favourites list.
                The button is passed the addToFavorites function as an onClick prop.*/}
                    <button
                      onClick={() => addToFavourites(result)}
                      className="addBtn"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </>
            )}
            {submittedMediaType === "podcast" && (
              <>
                {/* Below the details for a podcast item are rendered. */}
                <h1 className="Author">Host: {result.artistName}</h1>
                <h1 className="Title">Title: {result.trackName}</h1>
                <h1 className="Description">Genre: {result.genres}</h1>
                {/* Each result item has a button to add the item to the favourites list.
                The button is passed the addToFavorites function as an onClick prop.*/}
                <button
                  onClick={() => addToFavourites(result)}
                  className="addBtn"
                >
                  Add
                </button>
              </>
            )}
            {submittedMediaType === "movie" && (
              <>
                {/* Below the details for a movie item are rendered. */}
                <h1 className="Author">Director: {result.artistName}</h1>
                <h1 className="Title">Title: {result.trackName}</h1>
                <h1 className="Description">
                  Description: {result.longDescription}
                </h1>
                {/* Each result item has a button to add the item to the favourites list.
                The button is passed the addToFavorites function as an onClick prop.*/}
                <button
                  onClick={() => addToFavourites(result)}
                  className="addBtn"
                >
                  Add
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
