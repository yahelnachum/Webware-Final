var compiled = _.template(
"<li class='miniPage'><a href=\"product?name=<%= el.folderName %>\">" +
"<img class='miniImg' src=\"<%= el.imgSrc %>\" />" +
"<h1 class='miniName'><%= el.fullName %></h1>" +
"<h2 class='miniPrice'><%= el.price %></h2>" +
"</a></li>"
);

var checkoutCompiled = _.template(
"<li class='checkoutMiniPage'>" +
"<h1 class='checkoutName'><%= el.fullName %></h1>" +
"<h2 class='heckoutPrice'><%= el.price %></h2>" +
"</li>"
);