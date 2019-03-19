var Twitter = require('twitter');
var config = require('./twitter_config');

var client = new Twitter({
  consumer_key: config.consumer_key,
  consumer_secret: config.consumer_secret,
  access_token_key: config.access_token_key,
  access_token_secret: config.access_token_secret
});

/**
 * GET STREAM
 */
// var params = { screen_name: 'nodejs' };
// client.get('statuses/user_timeline', params, function (error, tweets, response) {
//   if (!error) {
//     console.log(tweets);
//   } else {
//     console.log(error);
//   }
// });

/**
 * POST TWEET
 */
var stdin = process.openStdin();

stdin.addListener("data", function (d) {
  // note:  d is an object, and when converted to a string it will
  // end with a linefeed.  so we (rather crudely) account for that  
  // with toString() and then trim() 

  client.post('statuses/update', { status: d.toString().trim() })
    .then(() => console.log('Sent!'))
    .catch(function (error) {
      throw error;
    })
});