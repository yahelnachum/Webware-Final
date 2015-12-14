  var compiled = _.template(
    "<li class='miniPage'><a href=\"http://jh-yn-final-cs4241.herokuapp.com/product?name=<%= el.folderName %>\">" +
      "<img class='miniImg' src=\"<%= el.imgSrc %>\" />" +
      "<h1 class='miniName'><%= el.fullName %></h1>" +
      "<h2 class='miniPrice'><%= el.price %></h2>" +
    "</a></li>"
  );