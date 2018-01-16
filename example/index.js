var spyJS = require("../index.js");

spyJS.version();

//Http basic
spyJS.watch_http('http://api.woonked.com/wuser/domoteco'); 

//Twitter API credentials (consumer_key,consumer_secret,access_token_key,access_token_secret)  
tw = spyJS.twitter('YOUR_CONSUMER_KEY','YOUR_CONSUMER_SECRET','YOUR_ACCESS_KEY','YOUR_TOKEN_SECRET')

//TT Twitter
spyJS.hashtalker(tw,'iot')


//Notifications
spyJS.notification(function(payload){
	//console.log('NOTIFY',payload)
	var json = JSON.parse(payload);
	if(json.from == "http_basic")	{
		console.log('Received from http_basic');
	}
	else if(json.from == 'hashtalker') {
		console.log('Received from hashtalker')
	}	
})




