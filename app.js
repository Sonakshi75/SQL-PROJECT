const faker = require('faker');
const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use("/public",express.static(__dirname + "/public"));

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password:"12345",
  database: "joinUs",
  insecureAuth : true
});

connection.connect(function(err) {
  if(err){
    console.log(err);
  }
  else{
    console.log("Connected!");
  }
});


app.get('/',function(req,res){
  res.render('home')
});


app.post("/register",function(req,res){
  res.render("register");
  console.log("Post requested send to register " + req.body.userEmail);
  var person = {userEmail: req.body.userEmail};
  connection.query('INSERT INTO users SET ?', person, function(err, results){
    if(err){
      console.log(err);
    }else{
      console.log(results);
    }
  });
});



app.get('/index',function(req,res){
  var q = 'SELECT count(*) AS count from users'
  connection.query(q,function(err,results){
  if(err){
    console.log(err);
  }else{
    var count = results[0].count;
    res.render("index",{count:count});
    console.log(count);
  };
});
})



app.listen(3000,function(){
  console.log("Port is running on server 3000");
});




//FIRST WAY OF INSERTING
// var insert = 'insert into users(userEmail) values("shailja@rediffmail.com")'
//
// connection.query(insert, function(error, results, fields){
//   if(error){
//     console.log(error);
//   }else{
//     console.log(results);
//   }
// });

//---------------SECOND WAY OF INSERTING--------------------
//this method is used as we can enter user dynamically unlike the above method

// var user = {userEmail: faker.internet.email() , created_at : faker.date.past()};
//
// connection.query("Insert into users set ?", user, function(err,results){
//   if(err){
//     console.log(err);
//   }else{
//     console.log(results);
//   }
// });

//-----------INSERTING MULTIPLE DATA AT A TIME--------------

// var data = [];
// for(var i =0; i<9 ;i++){
//   data.push([faker.internet.email(), faker.date.past()]);
// }
//
// console.log(data);
//
// var q = 'insert into users(userEmail, created_at) values ?';
// connection.query(q , [data] , function(err,results){
//   if(err){
//     console.log(err);
//   }else{
//     console.log(results);
//   }
// })
