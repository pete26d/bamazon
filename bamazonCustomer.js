var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "p8n3l3SS",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  displayProducts();
});

function displayProducts() {
  connection.query("SELECT item_id, product_name, price FROM products", function (err, res) {
    if (err) throw err;

    console.log(res);
  })
}