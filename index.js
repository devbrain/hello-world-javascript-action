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
    
    if (res.ok) {
        core.setOutput("status", "Request sent");
      } else {
        core.setFailed("Request failed: status = " + res.status + ", " + res.statusText);
      }
    
}

try {
  
  const githubEventName =  core.getInput('github-event-name'); 
  const githubEventAction =  core.getInput('github-event-action'); 

  console.log('NAME:', githubEventName, 'ACTION:', githubEventAction)

  const binadoxServerUrl = core.getInput('binadox-server-url');
  const binadoxToken = core.getInput('binadox-secret-token');
  const binadoxProject = core.getInput('binadox-project-name');

  sendToBinadox(binadoxServerUrl, binadoxToken, binadoxProject)  
  
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
