var mysql = require("mysql");
require("console.table");
var inquirer = require("inquirer");

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
  connection.query("SELECT item_id, product_name, department_name, price, stock_quantity FROM products", function (err, res) {
    if (err) throw err;
    console.table(res);
    customerInput(res);
  })
}

function customerInput(stock) {
  inquirer.prompt([
    {
      type: "input",
      name: "selectItem",
      message: "Enter the item_id for the item you would like to purchase. Enter X to exit.",
      validate: function(answer) {
        return !isNaN(answer) || answer.toLowerCase() === "x";
      }
    }
  ]).then(function(answer) {
    didUserExit(answer.selectItem);
    var selected = parseInt(answer.selectItem);
    var item = checkStock(selected, stock);
    

    if (item) {
      selectQuantity(item);
    }
    else {
      console.log("\nI'm sorry. That is not a valid item ID. Try again!");
      displayProducts();
    }
  })
}

function checkStock(item, stock) {
  for (var i = 0; i < stock.length; i++) {
    if (stock[i].item_id === item) {
      return stock[i];
    } 
  }
  return null;
}

function selectQuantity(item) {
  inquirer
    .prompt([
      
      { 
        type: "input",
        name: "quantity",
        message: "How many of this item do you wish to purchase? (enter X to exit)",
        validate: function(answer) {
          return answer > 0 || answer.toLowerCase() === "x";
        }
      }
    ])
    .then(function(answer) {
      didUserExit(answer.quantity);
      var quantity = parseInt(answer.quantity);
      // console.log(quantity);
      // console.log(item);
      if (quantity > item.stock_quantity) {
        console.log("\nOh No! We don't have enough of those items in stock. Try again!");
        displayProducts();
      }
      else {
        buyStuff(item, quantity);
      }
    });
}

function buyStuff(item, quantity) {
  connection.query(
    "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
    [quantity, item.item_id],
    function(err, res) {
      // Confirm the sale to the customer
      console.log("\nThank you for shopping with us! You are the proud owner of " + item.product_name + ". All " + quantity + " of them.");
      displayProducts();
    }
  );
}

function didUserExit(entered) {
  if (entered.toLowerCase() === 'x') {
    console.log("Thank you for shopping. Goodbye!");
    process.exit(0);
  }
}