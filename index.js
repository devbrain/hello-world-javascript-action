const core = require('@actions/core');
const github = require('@actions/github');
const querystring = require('querystring');


async function sendToBinadox(url, token, project) {
  
    const res = await fetch(url ,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization' : 'Bearer ' + token,
        },
        body: querystring.stringify({
            'project': project
        })
    })
    return res
}

try {
  // `who-to-greet` input defined in action metadata file
  const binadoxServerUrl = core.getInput('binadox-server-url');
  const binadoxToken = core.getInput('binadox-secret-token');
  const binadoxProject = core.getInput('binadox-project-name');

  const res = sendToBinadox(binadoxServerUrl, binadoxToken, binadoxProject)  
  if (res.ok) {
    core.setOutput("status", "Request sent");
  } else {
    core.setFailed("Request failed: status = " + res.status + ", " + res.statusText);
  }

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
