//Importing instance of Express to set up new express app with cors enabled.
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

//Below is the import for helmet.
const helmet = require("helmet");
//The port number is stored in this variable.
const port = process.env.PORT || 3001;

//app variable stores express instance within.
const app = express();
//Below the express app makes use of helmet.
app.use(helmet());
//App also makes use of bodyParser Middle-Ware.
app.use(bodyParser.json());
//App also make use of cross origin resource sharing.
app.use(cors());

//Search results array for the results of the api search.
let searchResults = [];

//Array for the favourites that are selected by the user from the search results.
let favourites = [];

//Get request that displays the contents of searchResults
app.get("/results", (req, res) => {
  res.send(searchResults);
});

//Get request that searches the itunes database for users search terms and updates the searchResults array with the response from the api request.
app.get("/search", async (req, res) => {
  const { term, media } = req.query;

  //Base url that contains the itunes api url.
  const baseURL = "https://itunes.apple.com/search?";
  //Then the complete url is constructed interpolating the users term and selected media type to make it.
  const url = `${baseURL}term=${encodeURIComponent(
    term
  )}&media=${encodeURIComponent(media)}`;

  //Below is a try catch block that makes an axios request to the url that has interpolated the users search terms and media type.
  try {
    const response = await axios.get(url);
    //The responses data is stored in the data variable.
    const data = response.data;
    //Clearing the previous search results.
    searchResults.splice(0, searchResults.length);
    //Pushing new search results to the searchResults array to be stored.
    searchResults.push(data);
    //This line sends the fetched data back to the client as a JSON object. Response is converted to a JSON string.
    res.json(data);
    //The catch block below handles an error, should it occur. The console will log the error along with status code of 500.
  } catch (error) {
    console.error("Error fetching data:", error);
    res
      .status(500)
      .json({ error: "Error fetching data from iTunes Store API" });
  }
});

// HERE is a post api end point that ads a new result item to the favourites array.
app.post("/favourites", (req, res) => {
  const favouriteItem = req.body;
  favourites.push(favouriteItem);
  res.status(201).json({ message: "Item added to favourites", favouriteItem });
});

//Below is a get api that just sends the content of the favourites app
app.get("/favourites", (req, res) => {
  res.send(favourites);
});

//Below is a route handler for making delete requests upon a specific item in the favourites array.
//The ":id" part in the route is a route parameter that captures the ID value from the request URL.
app.delete("/favourites/:id", (req, res) => {
  //The id variable stores the id of the item to be deleted. The id comes from the route parameter.
  const id = parseInt(req.params.id, 10);
  //index searches the favourites array to find an item with a matching id number.
  const index = favourites.findIndex((item) => item.trackId === id);

  //If no item is found with the same index then the response status code is set to 404 (not found.)
  if (index === -1) {
    res.status(404).json({ error: "Item not found" });
    //If the item with the matching id was found then the code removes the code using splice and the index of the item.
  } else {
    favourites.splice(index, 1);
    //Then the response status code is set to 200 (OK).
    res.status(200).json({ message: "Item removed from favourites" });
  }
});

//The express app is listening on port 3001.
app.listen(port, () => {
  console.log(`Express app is running on http://localhost:${port}`);
});
