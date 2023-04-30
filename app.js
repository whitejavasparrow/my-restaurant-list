//Include express
const express = require("express");
const app = express();
const port = 3000;

//Setting handlebars
const exphbs = require("express-handlebars");
const restaurantList = require("./restaurants.json");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Setting static files
app.use(express.static("public"));

//Setting route and the corresponding response
app.get("/", (req, res) => {
  res.render("index", { restaurants: restaurantList.results });
});

app.get("/search", (req, res) => {
  const keyword = req.query.keyword;
  const restaurants = restaurantList.results.filter((restaurant) => {
    return restaurant.name.toLowerCase().includes(keyword);
  });
  res.render("index", { restaurants: restaurants });
});

app.get("/restaurants/:restaurant_id", (req, res) => {
  const restaurant = restaurantList.results.find(
    (restaurant) => restaurant.id.toString() === req.params.restaurant_id
  );
  res.render("show", { restaurant: restaurant, keyword: keyword });
});

//Listen and start server
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`);
});
