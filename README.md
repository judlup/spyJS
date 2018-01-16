<img src="http://domoteco.com/img/spyjs/icon.png" title="SpyJS" height="550" width="550" />

Your Spy for API http and Twitter hashtags (for now)  in real time, all in one callback :)

- - - 
Basic Usage:

```
var spyJS = require("spyjs");

//See SpyJS version
spyJS.version();

//Http basic
spyJS.watch_http('http://api.woonked.com/wuser/domoteco' | width=100); 

//Twitter API credentials (consumer_key,consumer_secret,access_token_key,access_token_secret)  
tw = spyJS.twitter('YOUR_CONSUMER_KEY','YOUR_CONSUMER_SECRET','YOUR_ACCESS_KEY','YOUR_TOKEN_SECRET')

//TT Twitter
spyJS.hashtalker(tw,'iot')

//Notifications
spyJS.notification(function(payload){
    //console.log('Notification',payload)
    var json = JSON.parse(payload);
    if(json.from == "http_basic")   {
        console.log('Received from http_basic');
        //console.log(payload);
    }
    else if(json.from == 'hashtalker') {
        console.log('Received from hashtalker')
        //console.log(payload);
    }   
})

```

### Notes 

[Twitter Apps](http://apps.twitter.com/) | Generate your APIT Twitter credentials.

### Contact

[@Judlup](http://twitter.com/judlup)
[judlup@gmail.com](judlup@gmail.com)
