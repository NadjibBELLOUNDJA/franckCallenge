# franckCallenge

1. #Database Structure

The database is a mysql type database.
There are 5 different tables
  1. **orders**,
with the following columns:
	id: PRIMARY KEY
	deliveryHour: DATETIME type which indicates the delivery hour of the order
	status: BOOLEAN type, equal to 0 ('pending') or 1 ('delivered')

Each order may contain several menus.

  2. **menus**, 

with the following colums
	id: PRIMARY KEY
	name: each menu has a different name (sushiMenu, soupMenu etc.)

Each menu may contain several items

  3. **items**, 

with the following columns:
	id: PRIMARY KEY
	name: name of the item (fish, tomato, rice etc.)

  4. **order_menu**, 

with the following keys
	id: PRIMARY KEY
	orderId: FOREIGN KEY referencing orders.id
	menuId: FOREIGN KEY referencing menus.id

As each order may have several menus, this table is the joint table between orders and menus

  5. **menu_item**, 

with the following keys
	id: PRIMARY KEY
	menuId: FOREIGN KEY referencing menus.id
	itemId: FOREIGN KEY referencing items.id


2. #Main Js File

The main js file is orders.js.

3. #How to

Create a database named franck_challenge. Or any other name but then change the database name in orders.js.

Import in your database the file franck_challenge.sql. The database is currently populated with 3 orders.

Type node orders.js

Typing "localhost:8080/orderslist" gives you the list of the orders.

If you click on the "View Order Items" link, you will have a display of all the menus contained in this order
as well as all the items of the menu.

Clicking on "Mark as delivered" will change the status of the order to delivered in the database.