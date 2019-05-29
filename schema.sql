DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT(10) NOT NULL,
  primary key(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Snuggie", "As Seen on TV", 39.95, 200),
 ("Instant Pot", "Kitchen", 89.95, 260),
 ("Ghostbusters (1984)", "Video", 9.95, 800),
 ("Faxanadu", "Video Games", 19.95, 50),
 ("FryWall", "Kitchen", 14.25, 325),
 ("Before These Crowded Streets", "Music", 11.99, 100),
 ("MacGuyver Season 3", "Video", 29.49, 88),
 ("FlexTape", "As Seen on TV", 329.99, 1000),
 ("The Legend of Zelda", "Video Games", 49.95, 250),
 ("Universal Health Care", "Dreams", 99.99, 0);