const express = require('express')
const app = express()
var admin = require("firebase-admin");
const port = process.env.PORT || 3000
const sakLocation = process.env.SAK_LOCATION || '/tmp/serviceacccountkey.json'
const projectName = process.env.PROJECT_NAME


const serviceAccount = require(sakLocation);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${projectName}.firebaseio.com/`
});


app.get('/ping', function (req, res) {
  res.send('pong')
})


app.get('/verify-id', function (req, res) {
  const idToken = req.query.token
  if (!idToken) {
    res.status(400).send('Token not provided')
    return
  }
  
  admin.auth().verifyIdToken(idToken)
  .then(function(decodedToken) {
    res.json(decodedToken)
  }).catch(function(error) {
    res.status(404).send('Token not found or not valid')
  });
})


app.listen(port, function () {
  console.log(`Listening on port: ${port}`)
})
