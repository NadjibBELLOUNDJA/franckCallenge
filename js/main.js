angular.module('orderItemsApp', [])
.controller('OrderItemsController', function() {
	this.menus = {};
	var menuKey = '';
	<% orderItems.forEach(function(item, index) { %>
		if (menuKey !== "<%= item.menuName %>")
		{
			menuKey = "<%= item.menuName %>";
			this.menus[menuKey] = [];							
		}
		this.menus[menuKey].push("<%= item.itemName %>");
	<% }); %>
});