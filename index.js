const core = require('@actions/core');
const github = require('@actions/github');
const querystring = require('querystring');


async function sendToBinadox(url, token, data) {
  
    const res = await fetch(url ,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization' : 'Bearer ' + token,
        },
        body: querystring.stringify(data)
    })
    
    if (res.ok) {
        core.setOutput("status", "Request sent");
      } else {
        core.setFailed("Request failed: status = " + res.status + ", " + res.statusText);
      }
    
}

try {
  
  const binadoxServerUrl = core.getInput('binadox-server-url');
  const binadoxToken = core.getInput('binadox-secret-token');
  const binadoxProject = core.getInput('binadox-project-name');

  const data = {
    'project': binadoxProject,
    'github_data': github.context
  }

  sendToBinadox(binadoxServerUrl, binadoxToken, data)  
  
} catch (error) {
  core.setFailed(error.message);
}
