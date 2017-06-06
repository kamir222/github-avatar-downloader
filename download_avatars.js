var request = require('request');
var fs = require('fs');
require('dotenv').config();

console.log('Welcome to the GitHub Avatar Downloader!');


var GITHUB_USER = process.env.GITHUB_USER;
var GITHUB_TOKEN = process.env.GITHUB_TOKEN;

var CONFIG = {headers: {
  'User-Agent': 'GitHub Avatar Downloader - Student Project'
 }
};

function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://' + GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  //MAKE A REQUEST
  request(requestURL, CONFIG, function (err, response, body) {
    if (err) throw err;
    var json = JSON.parse(body);
    console.log(json)
    cb(err, response, json);
  });
}

function downloadImageByURL(url, filePath) {
  request.get(url)
  .on('error', function (err) {
    throw err
  })
  .on('response', function (response) {
    console.log('Response Status Code: ', response.statusCode);
  })
  .pipe(fs.createWriteStream(filePath));
}

var repoOwner = process.argv[2];
var repoName = process.argv[3];

//INVOKE WITH CALLBACK FUNCTION
getRepoContributors(repoOwner, repoName, function(err, result, contributors) {
  if (repoOwner && repoName) {
    console.log('Errors', err);
    console.log('Result:', result);
    contributors.forEach(function (contributor) {
      downloadImageByURL(contributor.avatar_url, 'avatars/' + contributor.login + '.jpg');
    });
  } else {
    console.log('please enter repo owner and repo name');
    console.log('format is node download_avatars.js {repo owner} {repo name}');
  }

});
