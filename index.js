'use strict';

var request = require('request');


//Server Socket.io
var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.use('/resources', express.static(__dirname + '/resources'));

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('notification', function(payload){
    //console.log('notification: ' + payload);
    io.sockets.emit('notification',payload);
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

//Client Socket.io
var socket = require('socket.io-client')('http://localhost:3000');
socket.on('connect', function(){});
socket.on('event', function(data){});
socket.on('disconnect', function(){});

//Twitter API
var Twitter = require('twitter');

//var params = {screen_name: 'kibitech_pr'};

//process.env.foo = 'bar';
//console.log(process.env.foo);

/*client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});

client.get('favorites/list', function(error, tweets, response) {
  if(error) throw error;
  console.log(tweets);  // The favorites. 
  console.log(response);  // Raw response object. 
});

client.post('statuses/update', {status: 'Spyfy :] by JudLup'},  function(error, tweet, response) {
  if(error) throw error;
  console.log(tweet);  // Tweet body. 
  console.log(response);  // Raw response object. 
});*/

/*client.get('search/tweets', {q: 'domoteco'}, function(error, tweets, response) {
   console.log(tweets);
});*/
/*
client.stream('statuses/filter', {track: 'iot'}, function(stream) {
  stream.on('data', function(event) {
    console.log(event && event.text);
  });
 
  stream.on('error', function(error) {
    throw error;
  });
});
*/

var version = "0.1.0";

module.exports =
{
	//Spyfy Version
  version : function() {
    console.log(version)
    return version;
  },
  notification : function(callback) {
  	socket.on('notification',callback);
  	return callback;
  },
  notify : function(payload) {
  	socket.emit('notification',payload);
  },
  //*****************************//
  //				     TWITTER   			 //
  //*****************************//
  //Set credentials
  twitter : function(consumer_key,consumer_secret,access_token_key,access_token_secret) {
  	
  	//
  	var client 	= new Twitter({ 
		  consumer_key: consumer_key,
			consumer_secret: consumer_secret,
			access_token_key: access_token_key,
			access_token_secret: access_token_secret
		});
		return client;
  	//
  },
  //Tweets search
  // tsearch : function(client,key,callback) {
  // 	client.get('search/tweets', {q: key}, callback);
  // 	return callback;		
  // },
  //Follow the hashtag
  hashtalker : function(client,key, callback) {
  	client.stream('statuses/filter', {track: key}, function(stream) {		  		  		  
			stream.on('data', function(event) {
		    //console.log(event && event.text);
		    //module.exports.notify("{'message':'New values','from':'hashtalker','payload':'"+event && event.text+"'}");
		    module.exports.notify(JSON.stringify({"message":"New values","from":"hashtalker","payload":event && event.text}));
		  });
		 
		  stream.on('error', function(error) {
		    throw error;
		  });			
		});		
  },
  //Stalker TL 
  // tlstalker : function(client,user,callback) {
  // 	var params = {screen_name: user};
  // 	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		//   if (!error) {
		//     //console.log(tweets);
		//     callback(tweets);
		//   }
		// });
  // },
  //*****************************//
  //							HTTP 					 //
  //*****************************//
  //Spyfy http
  watch_http : function(url,callback) {    	
		var req = setInterval(watch_http_fn.bind(null, url,callback), 1000);	
  },

}

//Spyfy http function 
var last_message = [];
function watch_http_fn(url,callback) {
	request(url, function(err,response,body){				
		var timestamp 	 = Math.floor(Date.now() / 1000);				
		if(last_message.length == 0) {			
			last_message.push({"timestamp":timestamp,"body":body})
			module.exports.notify(JSON.stringify({"message":"New values","from":"http_basic","payload":body}));
		}
		else {					
			var json = JSON.parse(JSON.stringify(last_message[0]));			
			if(timestamp > json.timestamp)
			{			
				var oldVal = JSON.stringify(json.body);
				var newVal = JSON.stringify(body);					
				if(oldVal == newVal) {
					//console.log("Old values");						
				}
				else {
					//console.log("New values");									
					module.exports.notify(JSON.stringify({"message":"New values","from":"http_basic","payload":body}));
					last_message = [];
					last_message.push({"timestamp":timestamp,"body":body})
				}				
			}
		}
		//callback(body,err,last_message)
	})	
}
//Spyfy http function 

