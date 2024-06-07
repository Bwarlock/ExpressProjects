const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
var fs = require("fs");
let { products } = require("./products");

function base64_encode(file) {
	// read binary data
	var bitmap = fs.readFileSync(file);

	// convert binary data to base64 encoded string
	return Buffer(bitmap).toString("base64");
}

app.use(cors());

app.get("/products", function (req, res) {
	res.json({
		products: products.map((product) => {
			product.images = [
				"data:image/png;base64," + base64_encode(`./images/${product.id}.png`),
			];
			return product;
		}),
		total: 4,
		skip: 0,
		limit: req.query.limit || undefined,
	});
});

const listener = app.listen(process.env.PORT || 3000, () => {
	console.log("Your app is listening on port " + listener.address().port);
});
