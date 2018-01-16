var spyfy = require("../index.js");

spyfy.version();

//Http basic
spyfy.watch_http('http://api.woonked.com/wuser/domoteco'); 

//Twitter API credentials (consumer_key,consumer_secret,access_token_key,access_token_secret)  
tw = spyfy.twitter('YOUR_CONSUMER_KEY','YOUR_CONSUMER_SECRET','YOUR_ACCESS_KEY','YOUR_TOKEN_SECRET')


//TT Twitter
spyfy.hashtalker(tw,'iot')

//Search twitter
// spyJS.tsearch(tw,function(error,tweets){
// 	console.log("Tweets",tweets);
// });

// //TL Stalker
// spyJS.tlstalker(tw,'judlup',function(tweets){
// 	//console.log("tlstalker",tweets);
// });

//Notifications
spyfy.notification(function(payload){
	//console.log('NOTIFY',payload)
	var json = JSON.parse(payload);
	if(json.from == "http_basic")	{
		console.log('Received from http_basic');
	}
	else if(json.from == 'hashtalker') {
		console.log('Received from hashtalker')
	}	
})




