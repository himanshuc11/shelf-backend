const admin = require("firebase-admin");
const serviceAccount = require("./server-keys.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

function sendNotification(registrationToken) {
const message = {
  data: {
    score: '850',
    time: '2:45'
  },
  token: registrationToken
};

// Send a message to the device corresponding to the provided
// registration token.
admin.messaging().send(message)
  .then((response) => {
    // Response is a message ID string.
    console.log('Successfully sent message:', response);
  })
  .catch((error) => {
    console.log('Error sending message:', error);
  });
}


const express = require('express')
const app = express()
const port = 3000

app.post('/', (req, res) => {
  sendNotification("dULpAoVIR_q77q8gPKtuxV:APA91bES42msZqUkYQ00fwsh_rKNmYor2D-iv1Tm5QbCbyLGywKilapexV0YSQpOP_1-CxDpO5h8lbcE9VLejjZOTivA5NK5IhD5NU_7aDFu1gixp1Xe7Jj-ncUU0BMZkselT597EI5A")
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Firebase backend app listening on port ${port}`)
})