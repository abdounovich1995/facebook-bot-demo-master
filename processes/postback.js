const request = require('request');
const senderAction = require('../templates/senderAction');
const sendMessage = require('../templates/sendMessage');

module.exports = function processPostback(event) {
    const senderID = event.sender.id;
    const payload = event.postback.payload;

    if (payload === 'GET_STARTED_PAYLOAD') {
        request({
            url: "https://graph.facebook.com/v2.6/" + senderID,
            qs: {
                access_token: process.env.PAGE_ACCESS_TOKEN,
                fields: "first_name"
            },
            method: "GET"
        }, function (error, response, body) {
            let greeting = '';
            if (error) {
                console.error("Error getting user name: " + error);
            } else {
                let bodyObject = JSON.parse(body);
                username = bodyObject.first_name;
                greeting = "Hello " + username + ". ";
            }

            // Check if the user sent "Hello" and respond with "Hi"
            if (payload.toLowerCase() === "hello") {
                sendMessage(senderID, "Hi");
            } else {
                // If it's not "Hello," continue with the original messages
                let message = greeting + "Welcome to Healthbot. Hope you are doing good today";
                let message2 = "I am your nutrition tracker :-)"
                let message3 = "please type in what you ate like: I ate chicken biryani and 2 chapatis with dal.";
                senderAction(senderID);
                sendMessage(senderID, { text: message }).then(() => {
                    sendMessage(senderID, { text: message2 }).then(() => {
                        sendMessage(senderID, { text: message3 });
                    });
                });
            }
        });
    }
}
