const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

// Facebook Messenger API setup
const PAGE_ACCESS_TOKEN =process.env.PAGE_ACCESS_TOKEN ; // Replace with your actual Page Access Token
const VERIFY_TOKEN = process.env.VERIFY_TOKEN; // Replace with your custom verification token

app.use(bodyParser.json());

// Webhook verification
app.get('/webhook', (req, res) => {
  if (req.query['hub.verify_token'] === VERIFY_TOKEN) {
    res.status(200).send(req.query['hub.challenge']);
  } else {
    res.sendStatus(403);
  }
});

// Message handling
app.post('/webhook', (req, res) => {
  const data = req.body;
  if (data.object === 'page') {
    data.entry.forEach(entry => {
      entry.messaging.forEach(event => {
        if (event.message) {
          const senderId = event.sender.id;
          const messageText = event.message.text;
          if (messageText && messageText.toLowerCase() === 'hi') {
            sendResponse(senderId, 'Hello');
          }
        }
      });
    });
    res.sendStatus(200);
  }
});

// Function to send a message
function sendResponse(senderId, messageText) {
  request({
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: PAGE_ACCESS_TOKEN },
    method: 'POST',
    json: {
      recipient: { id: senderId },
      message: { text: messageText }
    }
  }, (error, response) => {
    if (!error && response.statusCode === 200) {
      console.log('Message sent successfully');
    } else {
      console.error('Unable to send message.');
    }
  });
}

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
