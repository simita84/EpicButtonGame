//#---------------Initial Configurations start-----------------------
// require express
var express = require("express");

// path module -- try to figure out where and why we use this
var path = require("path");

// create the express app
var app = express();

// #-----------For handling post--------------
// # 1. var bodyParser = require('body-parser');
//app.use(bodyParser.urlencoded());

// app.post('/result',function(request, response){
// 	console.log(response);
// });
// #-----------For handling get requests--------------------
// # 2. 
//app.get('/', function(req, res) {
//  res.render("index");
// })

// static content 
app.use(express.static(path.join(__dirname, "./static")));
// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views')); 
app.set('view engine', 'ejs');
// tell the express app to listen on port 8000
var server = app.listen(6789, function() {
 console.log("listening on port 6789");
})
// this gets the socket.io module  
var io = require('socket.io').listen(server);  
  
//#---------------Initial Configurations end-----------------------

// http://localhost:8000/ home page rendering
app.get('/', function(request, response) {
  response.render("index");
});


// Whenever a connection event happens (the connection event is built in)
// run the following code
 var count = 0;

 function  emit_new_count(){
 	 io.emit('display_count',{new_count :count});
 }

io.sockets.on('connection', function (socket) {
	
	//-----Listening to client event  
	socket.on('increase_count',function(data){
	 count++;         
	 emit_new_count();
	});

	socket.on('reset_count',function(){
	 count = 0;
	 emit_new_count();
	});

   //#  when somebody leaves the room. 
	socket.on('disconnect', function () {
	});

}); 
   
//Server-side emit syntax

// 1. Emit: sends data from the server to the specific client who initiated contact.
//socket.emit('server_response', {response: "sockets are the best!"});

// 2. Broadcast: sends data from the server to everyone BUT the client that initiated the contact.
//socket.broadcast.emit('server_response', {response: "sockets are the best!"});

// 3. Full Broadcast: sends data to all connected clients.
//io.emit('server_response', {response: "sockets are the best!"});
 


 
