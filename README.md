<img src="http://domoteco.com/img/spyfy/icon.png" title="Spyfy" height="550" width="550" />

Your Spy for API http and Twitter hashtags (for now)  in real time, all in one callback :)

- - - 
### Basic Usage:

```
var spyfy = require("spyfy");

//See SpyJS version
spyfy.version();

//Http basic
spyfy.watch_http('http://api.woonked.com/wuser/domoteco' | width=100); 

//Twitter API credentials (consumer_key,consumer_secret,access_token_key,access_token_secret)  
tw = spyfy.twitter('YOUR_CONSUMER_KEY','YOUR_CONSUMER_SECRET','YOUR_ACCESS_KEY','YOUR_TOKEN_SECRET')

//TT Twitter
spyfy.hashtalker(tw,'iot')

//Notifications
spyfy.notification(function(payload){
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

**Run on your browser** ``` http://localhost:3000 ``` 

![Spyfy Working](http://domoteco.com/img/spyfy/spyfy_works.png)

### Notes 

[Twitter Apps](http://apps.twitter.com/) | Generate your APIT Twitter credentials.

### Contact

[@Judlup](http://twitter.com/judlup)
[judlup@gmail.com](judlup@gmail.com)
