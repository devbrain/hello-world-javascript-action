const core = require('@actions/core');
const github = require('@actions/github');
// We need this to build our post string
var querystring = require('querystring');
var http = require('https');

function sendToBinadox(token, project) {
    // Build the post string from an object
    var post_data = querystring.stringify({
        'project': project
    });

    // An object of options to indicate where to post to
    var post_options = {
        host: 'httpbin.org',
        port: '443',
        path: '/post',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization' : 'Bearer ' + token,
            'Content-Length': Buffer.byteLength(post_data)
        }
    };
    var post_req = http.request(post_options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('Response: ' + chunk);
        });
        res.on("error", function (error) {
            console.error('ERROR :' + error.status);
        });
    });

    // post the data
    post_req.write(post_data);
    post_req.end();
}

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello ${nameToGreet}!`);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);

  sendToBinadox(nameToGreet, "XXXX");  

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
