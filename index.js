const core = require('@actions/core');
const github = require('@actions/github');
const querystring = require('querystring');
const http = require('https');

function sendToBinadox(token, project) {
    
    var post_data = querystring.stringify({
        'project': project
    });

    // post the data
    post_req.write(post_data);
    post_req.end();

    return fetch('https://httpbin.org/post',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization' : 'Bearer ' + token,
        },
        body:post_data
    })
}

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello ${nameToGreet}!`);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);



  const res = await sendToBinadox(nameToGreet, "XXXX");
  
  if(res.ok){
    const result =await res.json()
    console.log('response', result)
  } else{
    console.log('ne ok response',res.status, res.statusText)
  }

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
