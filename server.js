// Import the express lirbary
const express = require('express')

// Import the axios library, to make HTTP requests
const axios = require('axios')

// This is the client ID and client secret that you obtained while registering
// the application
const clientID = '4058de8a2150057cfa2d';
const clientSecret = '3e14ac4032d202cb3e6889a4ec0e722133bd7a5d';

// Create a new express application and use the express static middleware, to
// serve all files inside the public directory
const app = express()
app.use(express.static(__dirname + '/public'))

app.delete('/gists', (req, res) => {
  console.log(req)

  res.json({message: 'deleted'})
})

app.get('/user/signin/callback', (req, res) => {
  // The req.query object has the query params that were sent to this route. We
  // want the `code` param
  const requestToken = req.query.code

  if (!requestToken) {
    return res.redirect(400,'http://localhost:3000');
  }

  console.log("RT: " ,requestToken);

  axios({
    // make a POST request
    method: 'post',
    // to the Github authentication API, with the client ID, client secret and
    // request token
    url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}&scope=repo,gists`,
    // Set the content type header, so that we get the response in JSOn
    headers: {
      accept: 'application/json'
    }
  }).then((response) => {
    // Once we get the response, extract the access token from the response body
    const accessToken = response.data.access_token
    console.log(response);
    // redirect the user to the welcome page, along with the access token
    res.redirect(`http://localhost:3000/login?access_token=${accessToken}`)
  })
})

// Start the server on port 8080 
// app.listen(9000);


app.listen(9000, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
  }

  console.info('>>> 🌎 Node Server is running at http://localhost:', 9000);
});