// Author Jillian Hennessy
// Author Yahel Nachum
// Website http://jh-yn-final-cs4241.herokuapp.com/

var compiled = _.template(
"<li class='miniPage'><a href=\"product?name=<%= el.folderName %>\">" +
"<img class='miniImg' src=\"<%= el.imgSrc %>\" />" +
"<h1 class='miniName'><%= el.fullName %></h1>" +
"<h2 class='miniPrice'><%= el.price %></h2>" +
"</a></li>"
);

var checkoutCompiled = _.template(
"<li id='<%= el.folderName %>' class='checkoutMiniPage'>" +
"<h1 class='checkoutName'><%= el.fullName %></h1>" +
"<button class='checkoutButton' onclick='removeFromCart(\"<%= el.folderName %>\")'>Remove</button>" +
"<h2 class='checkoutPrice'><%= el.price %></h2>" +
"</li>"
);