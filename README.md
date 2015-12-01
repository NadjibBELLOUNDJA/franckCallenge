# franckCallenge

1. **Database Structure**__
The database is a mysql type database.
There are 5 different tables
  1. **orders**, with the following columns:
    1. id: PRIMARY KEY
	2. deliveryHour: DATETIME type which indicates the delivery hour of the order
	3. status: BOOLEAN type, equal to 0 ('pending') or 1 ('delivered')
 Each order may contain several menus.

  2. **menus**, with the following colums
	1. id: PRIMARY KEY
	2. name: each menu has a different name (sushiMenu, soupMenu etc.)
 Each menu may contain several items

  3. **items**, with the following columns:
	1. id: PRIMARY KEY
	2. name: name of the item (fish, tomato, rice etc.)

  4. **order_menu**, with the following keys
	1. id: PRIMARY KEY
	2. orderId: FOREIGN KEY referencing orders.id
	3. menuId: FOREIGN KEY referencing menus.id
 As each order may have several menus, this table is the joint table between orders and menus

  5. **menu_item**, with the following keys
	1. id: PRIMARY KEY
	2. menuId: FOREIGN KEY referencing menus.id
	3. itemId: FOREIGN KEY referencing items.id

2. **Main Js File**
The main js file is orders.js.

3. **How to**

  1. Create a database named franck_challenge. Or any other name but then change the database name in orders.js.

  2. Import in your database the file franck_challenge.sql. The database is currently populated with 3 orders.

  3. Type node orders.js

  4. Typing "localhost:8080/orderslist" gives you the list of the orders.

  5. If you click on the "View Order Items" link, you will have a display of all the menus contained in this order
as well as all the items of the menu.

  6. Clicking on "Mark as delivered" will change the status of the order to delivered in the database.