const express = require('express');
let axios = require('axios');
var app = express();


// Original Version

// app.post('/', function(req, res, next) {
//   try {
//     let results = req.body.developers.map(async d => {
//       return await axios.get(`https://api.github.com/users/${d}`);
//     });
//     let out = results.map(r => ({ name: r.data.name, bio: r.data.bio }));

//     return res.send(JSON.stringify(out));
//   } catch (err) {
//     next(err);
//   }
// });


// // my version
// Middleware to pase JSON in the request body
app.use(express.json());

// Async function to fetch Github UI
async function getGitHubUserInfo(username) {
  const response = await axios.get(`https://api.github.com/users/${username}`);
  return { name: response.data.name, bio: response.data.bio };
}

// Route handler for the POST request
app.post('/', async function (req, res, next) {
   try {
    // Extract github username from the body
    const usernames = req.body.users;

    // Use promise.all to make parallel requests for each username
    const results = await Promise.all(usernames.map(getGitHubUserInfo)); 
     
   res.json(results);
  } catch (err) {
    next(err);
  }
});
    
// Error handling middleware
app.use((err,req,res,next) => {
  console.error(err.stack);
  res.status(500).json({error: 'Internal Server Error'});
});



module.exports = app;