import "../App.css";
import React, { useState, useEffect } from "react";

function Favourites() {
  //Below a state variable is created to store items being displayed in the favourites component.
  const [favourites, setFavourites] = useState([]);

  //When the component mounts, a fetch http request is made to the end point in the express back end to retrieve the data in the favourites array.
  useEffect(() => {
    //Below is an asyncronous function that stores fetched data in the response variable.
    const fetchFavourites = async () => {
      try {
        const response = await fetch("http://localhost:3001/favourites");
        // The response data is parsed into a JSON object.
        const data = await response.json();
        //Favourites is set to the value of the data variable.
        setFavourites(data);
        // If the favourites cannot be fetched for some reason, the catch block handles that error.
      } catch (error) {
        // The console logs the error to the console.
        console.error("Error fetching favourites:", error);
      }
    };

    // fetchFavourites function is called.
    fetchFavourites();
  }, []);

  //   Below is a function to handles a delete request, removing an item from the favourites list.
  //   Its an ayncronous function and it takes an id as an argument.
  const removeFavourite = async (id) => {
    try {
      //below a fetch request to the local server api endpoint is stored in the response variable.
      //   the id argument variable is inserted into the url using a template literal.
      const response = await fetch(`http://localhost:3001/favourites/${id}`, {
        method: "DELETE",
      });

      //If the response was not okay or didnt have 200-299 status response code then an error object and the response status are logged to the console.
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      //   The response is parsed into a json object
      const data = await response.json();
      console.log("Item removed from favourites:", data);
      setFavourites(favourites.filter((item) => item.trackId !== id));
    } catch (error) {
      // Below logs an error to the console along with the error object returned by the server.
      console.error("Error removing item from favourites:", error);
    }
  };

  //   Below is the JSX rendered to the dom.
  return (
    <div>
      <h1 className="favouritesHeading">Favourites</h1>
      {/* The items in the favourite state variable are mapped over and details are rendered particularly for each one. */}
      {favourites.map((favourite, index) => (
        <div key={index} className="favouriteItem">
          {/* The media type is displayed at the top of the item */}
          <p className="mediaType">Media Type: {favourite.mediaType}</p>
          {/* The medias image is rendered. */}
          <img
            className="images"
            src={favourite.artworkUrl100}
            alt={`${favourite.trackName} artwork`}
          />
          {/* The title name of the media item. */}
          <h2>{favourite.trackName}</h2>
          {/* The creator/artist name of the media item. */}
          <h3>{favourite.artistName}</h3>
          {/* And below the url for the media item in the itunes store is shown.*/}
          <p className="itunesUrl">
            <a
              href={favourite.trackViewUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on iTunes
            </a>
          </p>
          {/* Each favourites item has a remove button with the removeFavourite function passed to it with the id number of the item passed as an argument. */}
          <button
            onClick={() => removeFavourite(favourite.trackId)}
            className="removeBtn"
          >
            remove
          </button>
        </div>
      ))}
    </div>
  );
}

export default Favourites;
