const twit = require('twit');
const http = require('http');
const fs = require('fs');
const dotenv = require('dotenv');
const express = require('express');
const moment = require ('moment')

const router = express.Router();
const config = require('./config.js');

const db = require('../dbs/index');


dotenv.config();

const PORT = process.env.PORT || 8080;

var Twitter = new twit(config);

let response1 = '';
// find latest tweet according the query 'q' in params
    // for more parameters, see: https://dev.twitter.com/rest/reference/get/search/tweets

/*http.createServer(function(req,res){
    res.writeHead(200,{
        'content-type': 'text/html'
    });
  
    res.write('working');
    res.write("<input type='text'></input>");
    res.write(response1);    
    res.write(`<a href="https://twitter.com/intent/tweet?button_hashtag=LoveTwitter&ref_src=twsrc%5Etfw" class="twitter-hashtag-button" data-show-count="false">Tweet #LoveTwitter</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>`);
    */
    /*     
    var retweet = function() {
        var params = {
            q: '#nodejs, #Nodejs',  // REQUIRED
            result_type: 'recent',
            lang: 'en'
        }
    
    Twitter.get('search/tweets', params, function(err, data) {
        // if there no errors
          if (!err) {
            // grab ID of tweet to retweet
              var retweetId = data.statuses[0].id_str;
          
		  // Tell TWITTER to retweet
              Twitter.post('statuses/retweet/:id', {
                  id: retweetId
              }, function(err, response) {
                  if (response) {
                      console.log('Retweeted!!!');
                  res.write('retweeted')
                  }
                  // if there was an error while tweeting
                  if (err) {
                      console.log('Something went wrong while RETWEETING... Duplication maybe...');
                      res.write('error')
                  }
              });
          }
          // if unable to Search a tweet
          else {
            console.log('Something went wrong while SEARCHING...');
            res.write(' some error')
  
          }
      });
  }
*/

  //  id_str
//    Twitter.post('statuses/update',{status: 'hello'});
 
//"res.write(err)
// res.write(data.id)
//176022051
//925751535283392512
//1203996521089376256
     // Twitter.get('followers/ids', { screen_name: 'nerjib' },  function (err, data, response) {
        //console.log(data)
      // })
/* working

     Twitter.post('statuses/update', {
           in_reply_to_status_id: '1205237063177646098',
        status: '@Nerjib !' }, function(err, data, response) {
        console.log(data)
      })
 
  Twitter.post('statuses/retweet/:id', { id: '1203996521089376256' }, function (err, data, response) {
    console.log(data)
  })
  
 var stream = Twitter.stream('statuses/sample')
 
 stream.on('tweet', function (tweet) {
   console.log(tweet)
 })
 */

 //Straming twit
 /*
var stream = Twitter.stream('statuses/filter', { track: 'Dattijo', language: 'en', count:3 })
 res.write('<hr/>')
stream.on('tweet', function (tweet) {
  console.log(tweet)
  res.write('<div>'+tweet.user.screen_name+':'+tweet.text+'</div>');
  res.write('<div>'+tweet.created_at+'</div><hr/>')
  
})


/* images working

var b64content = fs.readFileSync('./btn.gif', { encoding: 'base64' })
 
// first we must post the media to Twitter
Twitter.post('media/upload', { media_data: b64content }, function (err, data, response) {
  // now we can assign alt text to the media, for use by screen readers and
  // other text-based presentations and interpreters
  var mediaIdStr = data.media_id_string
  var altText = "Small flowers in a planter on a sunny balcony, blossoming."
  var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }
 
  Twitter.post('media/metadata/create', meta_params, function (err, data, response) {
    if (!err) {
      // now we can reference the media and post a tweet (media will attach to the tweet)
      var params = { status: '...', media_ids: [mediaIdStr] }
 
      Twitter.post('statuses/update', params, function (err, data, response) {
        console.log(data)
      })
    }
  })
})
*/
/*}).listen(PORT)
    console.log('listening on '+PORT)
*/



router.get('/', async (req, res) => {

    Twitter.get('search/tweets', { q:  '#DattijoForGovernor+dattijo2023', count:1}, function(err, data, response) {
        //res.end(response);     
            // console.log(response)
              // console.log(err)
              return res.status(201).send(data);

            console.log(data.statuses[0].user.name)
              res.write('string id :'+data.statuses[0].id)
              res.write('string id :'+data.statuses[0].id_str)
        var tt = data.statuses;
        for (var i =0; i<tt.length; i++) {
        
          res.write('<div> statusid: ');res.write('id string: '+tt[i].id_str+'status');res.write(tt[i].user.id_str);res.write(':');res.write(tt[i].user.name);res.write(tt[i].id_str);
            res.write(tt[i].text); res.write('</div><hr><br/>')
        }
              //res.write(data.statuses[0].text)
    })        

});


module.exports = router;
