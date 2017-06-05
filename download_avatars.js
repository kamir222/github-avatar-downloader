var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');

var GITHUB_USER = 'kamir222';
var GITHUB_TOKEN = "1b5f5cb0ddeef69b2605fe6f85b877a1458dadc4";

function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://' + GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributers';
  console.log(requestURL);
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log('Errors', err);
  console.log('Result:', result);

});
