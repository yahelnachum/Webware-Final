// Author Yahel Nachum
// Website http://yn-cs4241-main-a5.herokuapp.com/

var express = require('express');
var path = require('path');
var app = express();
var port = process.env.PORT || 3000;
var bodyParser = require("body-parser");
var pg = require('pg');
var fs = require('fs');
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', function(req, res) {
  res.send(fs.readFileSync(path.join(__dirname, '/public/party_hats/basic/cone_data.txt')));

});

app.get('/product', function(req, res) {
  var query = req.query;
  var nameQuery = query.name;

  var html = createProductPage(nameQuery); 
  res.send(html);
});

function createProductPage(name){
  var data = fs.readFileSync(path.join(__dirname, '/public/party_hats/', name, '/cone_data.txt')).toString();
  var fullName = ((data.split('name='))[1].split('\n'))[0];
  var price = ((data.split('price='))[1].split('\n'))[0];
  var description = ((data.split('description:\n'))[1].split('END'))[0];
  var features = ((data.split('features:\n'))[1].split('END'))[0];
  return fullName + price + description + features;
}

app.get('/list', function(req, res) {
  var query = req.query;
  var searchQuery = query.search;
  var coneNameList = listOfCones();
  
  var filtered = coneNameList .filter(function(el) {
    if(el.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1){
      return el;
    }
  });

  res.send(filtered);
});

function listOfCones(){
  var folderList = fs.readdirSync(path.join(__dirname, '/public/party_hats/'));
  var coneNameList = [];
  folderList.forEach(function (folder, i){
    var data = fs.readFileSync(path.join(__dirname, '/public/party_hats/', folder, '/cone_data.txt')).toString();
    coneNameList[i] = ((data.split('name='))[1].split('\n'))[0];
  });
  return coneNameList;
}

app.listen(port, function() {
  console.log('App is listening on port ' + port);
});

app.use(function(req, res, next){ 
  res.status(404); 
  res.send('404 Page not found'); 
});

