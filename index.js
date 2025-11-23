const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true }); // Enable CORS if needed

admin.initializeApp();

// Example of a simple HTTP trigger function
exports.helloWorld = functions.https.onRequest((req, res) => {
  res.send('Hello, Firebase!');
});

// More functions can go here. For example:
exports.addMessage = functions.https.onRequest((req, res) => {
  // Retrieve the message from the query string.
  const original = req.query.text;

  // Push the new message into the Firebase Realtime Database.
  return admin.database().ref('/messages').push({ original: original }).then((snapshot) => {
    return res.redirect(303, snapshot.ref.toString());
  });
});
