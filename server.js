// Author Yahel Nachum
// Website http://yn-cs4241-main-a5.herokuapp.com/

var express = require('express');
var path = require('path');
var app = express();
var port = process.env.PORT || 3000;
var bodyParser = require("body-parser");
var pg = require('pg');
var fs = require('fs');
var bcrypt = require('bcryptjs');
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', function(req, res) {
  res.send(fs.readFileSync(path.join(__dirname, '/public/party_hats/basic/party_hat_data.txt')));

});

app.get('/product', function(req, res) {
  var query = req.query;
  var nameQuery = query.name;

  var html = createProductPage(nameQuery); 
  res.send(html);
});

function createProductPage(name){
  var data = fs.readFileSync(path.join(__dirname, '/public/party_hats/', name, '/party_hat_data.txt')).toString();
  var fullName = ((data.split('name='))[1].split('\n'))[0];
  var price = ((data.split('price='))[1].split('\n'))[0];
  var description = (((data.split('description:'))[1]).split('END'))[0];
  var features = (((data.split('features:'))[1]).split('END'))[0];
  return fullName + price + description + features;
}

app.get('/list', function(req, res) {
  var query = req.query;
  var searchQuery = query.search;
  var coneNameList = listOfPartyHats();
  
  var filtered = coneNameList .filter(function(el) {
    if(el.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1){
      return el;
    }
  });

  res.send(filtered);
});

function listOfPartyHats(){
  var folderList = fs.readdirSync(path.join(__dirname, '/public/party_hats/'));
  var coneNameList = [];
  folderList.forEach(function (folder, i){
    var data = fs.readFileSync(path.join(__dirname, '/public/party_hats/', folder, '/party_hat_data.txt')).toString();
    coneNameList[i] = ((data.split('name='))[1].split('\n'))[0];
  });
  return coneNameList;
}

app.get('/login', function(req, res) {
  var query = req.query;
  var usernameQuery = query.username;
  var passwordQuery = query.password;

  //res.write(bcrypt.hashSync(passwordQuery));

  var usernameFileList = fs.readdirSync(path.join(__dirname, '/user_information/'));
  
  if(usernameFileList.indexOf(usernameQuery + '.txt') === -1){
    res.write('Username not found in system!');
  }
  else{
    var data = fs.readFileSync(path.join(__dirname, '/user_information/', usernameQuery + '.txt')).toString();
    var hashedPassword = (((data.split('password='))[1]).split("END"))[0];
    
    if(bcrypt.compareSync(passwordQuery, hashedPassword)){
      res.write('Password Accepted');
    }
    else{
      res.write('Password Denied');
    }
  }
  
  res.end();
});

app.get('/register', function(req, res) {
  var query = req.query;
  var usernameQuery = query.username;
  var passwordQuery = query.password;

  var usernameFileList = fs.readdirSync(path.join(__dirname, '/user_information/'));
  
  if(usernameFileList.indexOf(usernameQuery + '.txt') === -1){
    var fileContents = 'password=' + bcrypt.hashSync(passwordQuery) + 'END\n\nwishlist:\nEND';
    fs.writeFileSync(path.join(__dirname, '/user_information/', usernameQuery + '.txt'), fileContents);
    res.write('Username and Password submitted');
  }
  else{
    res.write('Username not available!');
  }
  
  res.end();
});



app.listen(port, function() {
  console.log('App is listening on port ' + port);
});

app.use(function(req, res, next){ 
  res.status(404); 
  res.send('404 Page not found'); 
});

