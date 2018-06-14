require("dotenv").config();
var Spotify = require("node-spotify-api");
var keys = require("./keys");
var Twitter = require("twitter");
var request = require("request");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var command = process.argv[2];
var params = {Lirithegreat: 'nodejs'};

switch(command){
    case 'my-tweets':
        getTweets(process.argv[2]);
        break;
    case 'spotify-this-song':
        spotifySong(process.argv[3]);
        break;
    case 'movie-this':
        movieThis(process.argv[3]);
        break;
    case 'do-what-it-says':
        doIt();
        break;
    default:
        console.log('wrong');
        break;
}

function getTweets(tweets){
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
          console.log(tweets);
        }
      });
}

function spotifySong(song){
    spotify.search({ type: 'track', query: song }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       var body = data.tracks.items[0];
      console.log(body); 
      });
}

function movieThis(title){
    request('http://www.omdbapi.com/?apikey=516eb9e9&t=' + title, function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});
}

function doIt(){

}