var request = require('request');
var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');

var GITHUB_USER = 'kamir222';
var GITHUB_TOKEN = "1b5f5cb0ddeef69b2605fe6f85b877a1458dadc4";
var CONFIG = {headers: {
  'User-Agent': 'GitHub Avatar Downloader - Student Project'
 }
};



function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://' + GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

  request(requestURL, CONFIG, function (err, response, body) {
    if (err) throw err;
    var json = JSON.parse(body);
    //console.log(json[1].avatar_url);
    cb(err, response, json);
  });

}

getRepoContributors("jquery", "jquery", function(err, result, contributors) {
  console.log('Errors', err);
  console.log('Result:', result);
  contributors.forEach(function (contributor) {
    console.log(contributor.avatar_url);
  });
});
